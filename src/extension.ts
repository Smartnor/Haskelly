'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const fs = require('fs');

import initCommands from './Basic/commands';
import initButtons from './Basic/buttons';

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('haskelly');
    const documentPath = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document.uri.fsPath
                        : vscode.workspace.textDocuments[0].uri.fsPath;

    /* Init commands */
    initCommands(context);

    /* Init bottom buttons */
    initButtons(context);

    const sel:vscode.DocumentSelector = [
        { language: 'haskell', scheme: 'file' },
        { language: 'haskell', scheme: 'untitled' }
    ];

}

export function deactivate() {}
