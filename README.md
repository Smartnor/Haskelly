# Haskelly

`Haskelly` is a [Visual Studio Code](https://code.visualstudio.com/) extension that supports Haskell development.

## Features

* __Integrated REPL, Build, Test and Run commands__
  - repl with `GHCi`
  - build with `stack`
  - run with `runHaskell`
  - test current file `prop_*` properties with `QuickCheck`
  - run full test suite with `Stack test`

## Installation

  * Install the [Haskelly](https://marketplace.visualstudio.com/items?itemName=UCL.haskelly) VS Code extension.

  * Install [Stack](https://www.haskellstack.org) and add it to your PATH. Note that Stack folder naming conventions must be followed for it to work correctly, i.e. capitalizing folder names.

    ```shell
    curl -sSL https://get.haskellstack.org/ | sh
    ```

### Note

If you failed to install `stack-run`, please refer https://github.com/yamadapc/stack-run/issues/17#issuecomment-427545735

## Configuration

Haskelly is customizable
(see `Code` > `Preferences` > `Workspace Settings`).

| Parameter                     | Description                                     | Default  |
|----------------------------   |-------------------------------------------------|----------|
| `haskelly.buttons.ghci`       | `GHCi` button shows in the bottom bar           | `true`   |
| `haskelly.buttons.runfile`    | `Run file` button shows in the bottom bar       | `true`   |
| `haskelly.buttons.quickcheck` | `QuickCheck` button shows in the bottom bar     | `true`   |
| `haskelly.buttons.stackBuild` | `Stack build` button shows in the bottom bar    | `true`   |
| `haskelly.buttons.stackBuildParams` | Parameters passed to `stack build` command| `--fast` |
| `haskelly.buttons.stackRun`   | `Stack run` button shows in the bottom bar      | `true`   |
| `haskelly.buttons.stackRunParams` | Parameters passed to `stack run` command    | `null`   |
| `haskelly.buttons.stackTest`  | `Stack test` button shows in the bottom bar     | `true`   |
| `haskelly.buttons.stackTestParams` | Parameters passed to `stack test` command  | `null`   |
| `haskelly.exec.reuseTerminal` | Reuse the currently opened terminal to run Stack commands | false |

## Contributing

If you'd like to contribute to Haskelly, this is what you can do:

* __Bugs__: This extension is in alpha, so some bugs might be present. We would really appreciate if you
could post any issue on the Github repository [issues section](https://github.com/haskelly-dev/Haskelly/issues) or contact us at: [zcabmse@ucl.ac.uk](mailto:zcabmse@ucl.ac.uk?Subject=Haskelly%20feedback).
* __Ideas and feature requests__: We want to get everyone's opinion on what we're building so feel free to use the two mentioned channels for any comment or suggestion.
* __Documentation__: Found a typo or strangely worded sentences? Submit a PR!
* __Code__: Contribute bug fixes, features or design changes.


## License: [GNU 3](https://github.com/haskelly-dev/Haskelly/blob/master/License.txt)
