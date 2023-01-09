import chalk from 'chalk';
import { copy } from './copy';
import { sanitisePath } from './sanitise-path';
import { saveFile } from './save-file';
import { AssetHasherOptions, CopyPath } from './types';

const AUTO_GENERATED_MESSAGE = `/**\n * AUTO GENERATED FILE. DO NOT EDIT AS YOUR CHANGES WILL BE LOST.\n */\n\n`;

export function processAssets(
  copyPaths: CopyPath[],
  { removePath, tsEnumPath, jsConstPath, sassVariablesPath, cssVariablesPath, silent }: AssetHasherOptions
): void {
  let tsFileContents = `${AUTO_GENERATED_MESSAGE}export enum AssetPath {`;
  let jsFileContents = `${AUTO_GENERATED_MESSAGE}export const AssetPath = {`;
  let scssFileContents = AUTO_GENERATED_MESSAGE;
  let cssFileContents = `${AUTO_GENERATED_MESSAGE}:root {\n`;

  // [tsEnumPath, jsConstPath, sassVariablesPath, cssVariablesPath].some(path => !isEmpty(path));

  const cwd = process.cwd();

  copyPaths.forEach(([from, to]) => {
    copy(from, to);

    const fromKey = sanitisePath(cwd, from, removePath);

    const toKey = sanitisePath(cwd, to, removePath);

    const jsValue = `\n  '${fromKey}' = '${toKey}',`;

    tsFileContents += jsValue;
    jsFileContents += jsValue;

    const cssVariableKey = fromKey.replace(/\//g, '-').replace(/\./g, '-').toLowerCase();

    scssFileContents += `$${cssVariableKey}: '/${toKey}';\n`;
    cssFileContents += `  --${cssVariableKey}: '/${toKey}';\n`;
  });

  tsFileContents += `\n}\n`;
  jsFileContents += `\n};\n`;
  cssFileContents += `}\n`;

  saveFile(tsFileContents, tsEnumPath, silent);
  saveFile(jsFileContents, jsConstPath, silent);
  saveFile(scssFileContents, sassVariablesPath, silent);
  saveFile(cssFileContents, cssVariablesPath, silent);

  if (!silent) {
    console.log(chalk.green(`[ASSET HASHER] - HASHING COMPLETED`));
  }
}
