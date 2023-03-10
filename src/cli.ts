#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { hashAssets } from './hash-assets';
import { AssetHasherOptions, AssetHasherOptionsKey } from './types';

const options: Record<AssetHasherOptionsKey, yargs.Options> = {
  [AssetHasherOptionsKey.from]: {
    alias: 'f',
    describe: 'Glob pattern of the assets to hash',
    type: 'string',
    requiresArg: true,
  },
  [AssetHasherOptionsKey.to]: {
    alias: 't',
    describe: 'The path to the directory where the hashed assets will be written',
    type: 'string',
    requiresArg: true,
  },
  [AssetHasherOptionsKey.removePaths]: {
    alias: 'r',
    describe: 'Comma separated partial paths to remove from the hashed asset enum/const/variables ',
    type: 'array',
    requiresArg: false,
  },
  [AssetHasherOptionsKey.watch]: {
    alias: 'w',
    describe: 'Whether to watch the assets directory for changes',
    type: 'boolean',
    default: false,
  },
  [AssetHasherOptionsKey.ignoreInitial]: {
    alias: 'i',
    describe: 'Ignores the files that already exists when starting with watch enabled',
    type: 'boolean',
    requiresArg: false,
  },
  [AssetHasherOptionsKey.tsEnumPath]: {
    alias: 'ts',
    describe:
      'The path to create the TypeScript enum containing the paths of the hashed assets. If not specified, the enum will not be created',
    type: 'string',
    requiresArg: false,
  },
  [AssetHasherOptionsKey.jsConstPath]: {
    alias: 'js',
    describe:
      'The path to create the JavaScript const containing the paths of the hashed assets. If not specified, the const will not be created',
    type: 'string',
    requiresArg: false,
  },
  [AssetHasherOptionsKey.sassVariablesPath]: {
    alias: 'sass',
    describe:
      'The path to create the SASS variables containing the paths of the hashed assets. If not specified, the variables will not be created',
    type: 'string',
    requiresArg: false,
  },
  [AssetHasherOptionsKey.cssVariablesPath]: {
    alias: 'css',
    describe:
      'The path to create the CSS variables containing the paths of the hashed assets. If not specified, the variables will not be created',
    type: 'string',
    requiresArg: false,
  },
  [AssetHasherOptionsKey.silent]: {
    alias: 's',
    describe: 'Whether to suppress logging',
    type: 'boolean',
    requiresArg: false,
  },
};

const cli = yargs(hideBin(process.argv))
  .scriptName('asset-hasher')
  .usage('$0 [options] <command ...>')
  .help()
  .alias('h', 'help')
  .alias('v', 'V')
  .alias('v', 'version')
  .options(options);

async function run(): Promise<void> {
  const args = await cli.parse(process.argv.slice(2));

  await hashAssets(args as AssetHasherOptions);
}

void run();

export default cli;
