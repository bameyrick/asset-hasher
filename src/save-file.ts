import { isEmpty } from '@qntm-code/utils';
import chalk from 'chalk';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { basename } from 'path';

export function saveFile(fileContent: string, path?: string, silent?: boolean): void {
  if (isEmpty(path)) {
    return;
  }

  const dir = path.replace(basename(path), '');

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  writeFileSync(path, fileContent, 'utf-8');

  if (!silent) {
    console.log(chalk.blue(`[ASSET HASHER] - ${path} updated`));
  }
}
