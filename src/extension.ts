'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const fs = require('fs');
const path = require('path');
import { guid } from './helpers/utils';
import { testHaskellFile } from './helpers/testCode';
import CompletionProvider from './helpers/completionProvider';
import runCode from './helpers/runCode';

function loadGHCi(extPath, src) {
    const term = vscode.window.createTerminal('Haskell GHCi');
    term.show();
    term.sendText(`node ${__dirname}/helpers/runCode.js ghci ${src}`);
}

function runHaskell(extPath, src) {
    const term = vscode.window.createTerminal('Haskell Run');
    term.show();
    term.sendText(`stack runhaskell ${src}`);
}

function showTestOutput(passed, failed) {
    if (failed.length > 0) {
        if (failed.length === 1) {
            vscode.window.showErrorMessage(`${failed[0].name} test failed!`);
        } else {                
            vscode.window.showErrorMessage(`${failed.length} tests failed!`);
        }
    } else if (passed.length > 0) {
        vscode.window.showInformationMessage('All tests passed!');
    } else {
        vscode.window.showErrorMessage('No tests were found!');
    }
}

function showTestError(error, extPath) {
    vscode.window.showErrorMessage('VS Code can\'t execute this file. Check the terminal.');

    const errorFilePath = `${extPath}/${guid()}.txt`;
    fs.writeFile(errorFilePath, error, 'utf-8', err => {
        const term = vscode.window.createTerminal('Haskell Tests');
        term.sendText(`cat ${errorFilePath}`);
        term.show();
        setTimeout(() => fs.unlinkSync(errorFilePath), 1000);
    });
}

function stackBuild(extPath, src) {
    const term = vscode.window.createTerminal('Haskell Run');
    term.show();
    term.sendText(`stack build ${src}`);
}

function testHaskell(extPath, src) {
    let counter = -1;
    let doneTesting = false;
    const loader = () => {
        counter = (counter + 1) % 4;
        const sign = ['|', '/', '-', '\\'][counter];

        if (!doneTesting) setTimeout(loader, 200);
        vscode.window.setStatusBarMessage(`${sign}  Running QuickCheck`, 200);
    }

    loader();

    testHaskellFile(src).then(testResults => {
        doneTesting = true;
        showTestOutput(testResults['passedTests'], testResults['failedTests']);
    }).catch(error => {
        doneTesting = true;
        showTestError(error, extPath);
    });
}

function createButtons(context, buttons) {
    for (let i = 0; i < buttons.length; i++) {
        const button = vscode.window.createStatusBarItem(1, 0);
        button.text = buttons[i][0];
        button.command = buttons[i][1];
        button.show();
    }
}

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('haskelly');
    const buttonsConfig = config['buttons'];

    if (buttonsConfig) {
        const buttons = [];
        if (buttonsConfig['ghci'] === true ||  buttonsConfig['ghci'] === undefined || buttonsConfig === undefined) {
            buttons.push(['Load GHCi', 'editor.ghci']);
        }

        if (buttonsConfig['runfile'] === true ||  buttonsConfig['runfile'] === undefined || buttonsConfig === undefined) {
            buttons.push(['Run file', 'editor.runHaskell']);
        }

        if (buttonsConfig['quickcheck'] === true ||  buttonsConfig['quickcheck'] === undefined || buttonsConfig === undefined) {
            buttons.push(['QuickCheck', 'editor.runQuickCheck']);
        }

        createButtons(context, buttons);
    } else {
        createButtons(context, [['Load GHCi', 'editor.ghci'], ['Run file', 'editor.runHaskell'], ['QuickCheck', 'editor.runQuickCheck']]);
    } 

    context.subscriptions.push(vscode.commands.registerTextEditorCommand('editor.ghci', editor => {
        vscode.window.setStatusBarMessage('Loading module in GHCi...', 1000);
        loadGHCi(context.extensionPath, editor.document.uri.fsPath);
    }));

    context.subscriptions.push(vscode.commands.registerTextEditorCommand('editor.runHaskell', editor => {
        vscode.window.setStatusBarMessage('Running your code...', 1000);
        runHaskell(context.extensionPath, editor.document.uri.fsPath);
    }));

    context.subscriptions.push(vscode.commands.registerTextEditorCommand('editor.stackBuild', editor => {
        stackBuild(context.extensionPath, editor.document.uri.fsPath);
    }));

    context.subscriptions.push(vscode.commands.registerTextEditorCommand('editor.runQuickCheck', editor => {
        testHaskell(context.extensionPath, editor.document.uri.fsPath);
    }));

    if (config['codeCompletion'] === false) {
        console.log('Disabled code completion')
    } else {
        const sel:vscode.DocumentSelector = 'haskell';
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider(sel, new CompletionProvider(), '.', '\"'));
    }
}

export function deactivate() {
}