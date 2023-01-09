import chalk from 'chalk';
import { existsSync, readdirSync } from 'fs';
import rimraf from 'rimraf';

export async function cleanToDirectory(toPath: string, silent?: boolean): Promise<void> {
  if (!existsSync(toPath) || !readdirSync(toPath).length) {
    return;
  }

  if (!silent) {
    console.log(chalk.yellow(`[ASSET HASHER] - ${toPath.replace(process.cwd(), '')} not empty, cleaning...`));

    return new Promise(resolve => rimraf(toPath, () => resolve()));
  }
}
