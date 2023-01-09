import { clone, isEmpty, isEqual } from '@qntm-code/utils';
import chalk from 'chalk';
import chokidar from 'chokidar';
import { unlinkSync } from 'fs';
import glob from 'glob';
import { extname, join } from 'path';
import { BehaviorSubject, debounceTime, distinctUntilChanged, firstValueFrom, pairwise, startWith } from 'rxjs';
import { cleanToDirectory } from './clean-to-directory';

import { generateHashedPath } from './generate-hashed-path';
import { processAssets } from './process-assets';
import { AssetHasherOptions, CopyPath, HashMap } from './types';

export async function hashAssets(options: AssetHasherOptions): Promise<void> {
  if (!options.fromPath) {
    throw new Error('The fromPath option is required');
  }

  if (!options.toPath) {
    throw new Error('The toPath option is required');
  }

  if (!options.silent) {
    console.log(chalk.green('[ASSET HASHER] - HASHING ASSETS'));
  }

  const toPath = join(process.cwd(), options.toPath);

  await cleanToDirectory(toPath, options.silent);

  const fromPath = join(process.cwd(), options.fromPath, `**/*`);

  if (options.watch) {
    const hashes$ = new BehaviorSubject<HashMap>({});

    hashes$
      .pipe(
        debounceTime(10),
        startWith({}),
        pairwise(),
        distinctUntilChanged((a, b) => isEqual(a, b))
      )
      .subscribe(([oldHashes, newHashes]) => {
        const oldHashPaths = Object.values(oldHashes);
        const newHashPaths = Object.values(newHashes);

        // Remove old hashes
        Object.values(oldHashes)
          .filter(hash => !newHashPaths.includes(hash))
          .forEach(path => unlinkSync(path));

        // Copy new hashes
        processAssets(
          Object.entries(newHashes).filter(([_, hash]) => !oldHashPaths.includes(hash)),
          options
        );
      });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    chokidar.watch(fromPath).on(`all`, async (event, path) => {
      if (!options.silent && ['addDir', 'add'].includes(event)) {
        console.log(chalk.cyan(`[ASSET HASHER] - Watching ${path.replace(`${join(process.cwd(), options.fromPath)}/`, ``)}`));
      }

      const hashes = clone(await firstValueFrom(hashes$));

      if (['add', 'change'].includes(event)) {
        hashes[path] = generateHashedPath(path, fromPath, toPath);
      }

      if (event === 'unlink') {
        delete hashes[path];
      }

      hashes$.next(hashes);
    });
  } else {
    const paths = glob
      .sync(fromPath)
      .filter(path => !isEmpty(extname(path)))
      .map(path => [path, generateHashedPath(path, fromPath, toPath)] as CopyPath);

    if (!options.silent) {
      const processingPaths = paths.map(([from]) => from.replace(`${join(process.cwd(), options.fromPath)}/`, ``));

      console.log(chalk.blue(`[ASSET HASHER] - Processing ${processingPaths.length} files`));
      console.log(chalk.cyan(`  - ${processingPaths.join(`\n  - `)}`));
    }

    processAssets(paths, options);
  }
}
