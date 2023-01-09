# @qntm-code/asset-hasher

CLI and library for adding hashes to file names and creating TypeScript enum, sass variables, JavaScript const, and CSS variables with hashed asset paths.

[![GitHub release](https://img.shields.io/github/release/bameyrick/asset-hasher.svg)](https://github.com/bameyrick/asset-hasher/releases)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_asset-hasher&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bameyrick_asset-hasher)
[![codecov](https://codecov.io/gh/bameyrick/asset-hasher/branch/main/graph/badge.svg)](https://codecov.io/gh/bameyrick/asset-hasher)

- [@qntm-code/asset-hasher](#qntm-codeasset-hasher)
  - [Installation](#installation)
    - [npm](#npm)
    - [yarn](#yarn)
  - [CLI Usage](#cli-usage)
    - [Help](#help)
    - [CLI Example](#cli-example)
    - [Options](#options)
  - [Library Usage](#library-usage)
    - [Library Example](#library-example)

## Installation

You can install via npm or yarn.

### npm

```bash
npm install --save @qntm-code/asset-hasher
```

### yarn

```bash
yarn add @qntm-code/asset-hasher
```

## CLI Usage

### Help

Run the following command to see the available options.

```bash
asset-hasher --help
```

The CLI can be used to generate a TypeScript enum, sass variables, JavaScript const, or CSS variables with hashed asset paths.

### CLI Example

```bash
asset-hasher --from src/assets --output src/assets-hashed --tsEnum src/enums/assets.ts
```

### Options

| Option         | Alias   | Description                                                                                                                          | Type      | Required |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------- | -------- |
| `--from`       | `-f`    | Glob pattern of the assets to hashGlob pattern of the assets to hash                                                                 | `string`  | `true`   |
| `--to`         | `-t`    | The path to the directory where the hashed assets will be written                                                                    | `string`  | `true`   |
| `--removePath` | `-r`    | Partial path to remove from the hashed asset enum/const/variables paths                                                              | `string`  | `false`  |
| `--watch`      | `-w`    | Whether to watch the assets directory for changes                                                                                    | `boolean` | `false`  |
| `--tsEnum`     | `-ts`   | The path to create the TypeScript enum containing the paths of the hashed assets. If not specified, the enum will not be created     | `string`  | `false`  |
| `--jsConst`    | `-js`   | The path to create the JavaScript const containing the paths of the hashed assets. If not specified, the const will not be created   | `string`  | `false`  |
| `--sassVars`   | `-sass` | The path to create the sass variables containing the paths of the hashed assets. If not specified, the variables will not be created | `string`  | `false`  |
| `--cssVars`    | `-css`  | The path to create the CSS variables containing the paths of the hashed assets. If not specified, the variables will not be created  | `string`  | `false`  |
| `--silent`     | `-s`    | Whether to suppress all logging                                                                                                      | `boolean` | `false`  |
| `--help`       | `-h`    | Show help                                                                                                                            | `boolean` | `false`  |

## Library Usage

The library can be used to generate a TypeScript enum, sass variables, JavaScript const, or CSS variables with hashed asset paths.

### Library Example

```typescript
import { AssetHasher } from '@qntm-code/asset-hasher';

await hashAssets({
  from: 'src/assets',
  to: 'src/assets-hashed',
  tsEnum: 'src/enums/assets.ts',
  jsConst: 'src/constants/assets.js',
  sassVars: 'src/styles/assets.scss',
  cssVars: 'src/styles/assets.css',
  removePath: 'src/assets',
  watch: false,
  silent: false,
});
```
