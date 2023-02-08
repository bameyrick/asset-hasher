import { jest } from '@jest/globals';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import { hashAssets } from '../src/hash-assets';
import { runCommand } from './run-command';

describe(`asset-hasher`, () => {
  const resultPath = 'tests/fixtures/results';
  const resultPathAssetsHashed = `${resultPath}/assets-hashed`;

  beforeEach(() => jest.resetModules());

  afterEach(async () => {
    await Promise.all([resultPath].map(directory => new Promise(resolve => rimraf(path.join(process.cwd(), directory), resolve))));
  });

  describe(`CLI`, () => {
    it(`Should hash assets`, async () => {
      await runCommand(`hash-assets --from=tests/fixtures/assets --to=${resultPathAssetsHashed} --silent`);

      expect(existsSync(resultPathAssetsHashed)).toBe(true);
      expect(existsSync(`${resultPathAssetsHashed}/nested`)).toBe(true);
    });

    it(`Should create path files`, async () => {
      const tsEnumPath = `${resultPath}/assets.ts`;
      const jsConstPath = `${resultPath}/assets.js`;
      const sassVariablesPath = `${resultPath}/assets.scss`;
      const cssVariablesPath = `${resultPath}/assets.css`;

      await runCommand(
        `hash-assets --from=tests/fixtures/assets --to=${resultPathAssetsHashed} --tsEnumPath=${tsEnumPath} --jsConstPath=${jsConstPath} --sassVariablesPath=${sassVariablesPath} --cssVariablesPath=${cssVariablesPath} --silent`
      );

      expect(existsSync(tsEnumPath)).toBe(true);
      expect(existsSync(jsConstPath)).toBe(true);
      expect(existsSync(sassVariablesPath)).toBe(true);
      expect(existsSync(cssVariablesPath)).toBe(true);
    });

    it(`Should create path files and remove parts from the generated file paths `, async () => {
      const tsEnumPath = `${resultPath}/assets.ts`;
      const removePaths = ['tests/fixtures/assets/', 'tests/fixtures/results/assets-hashed/'];

      await runCommand(
        `hash-assets --from=tests/fixtures/assets --to=${resultPathAssetsHashed} --tsEnumPath=${tsEnumPath} --removePaths=${removePaths.join(
          ' '
        )} --silent`
      );

      expect(existsSync(tsEnumPath)).toBe(true);

      const tsEnumContent = readFileSync(tsEnumPath, 'utf8');

      removePaths.forEach(removePath => expect(tsEnumContent).not.toContain(removePath));
    });

    it(`Should log if no --silent added`, async () => {
      const originalLog = console.log;

      const logSpy = jest.fn();

      console.log = logSpy;

      await runCommand(`hash-assets --from=tests/fixtures/assets --to=${resultPathAssetsHashed}`);

      expect(logSpy).toHaveBeenCalled();

      console.log = originalLog;
    });
  });

  describe(`API`, () => {
    it(`Should hash assets`, async () => {
      await hashAssets({
        from: `tests/fixtures/assets`,
        to: resultPathAssetsHashed,
        silent: true,
      });

      expect(existsSync(resultPathAssetsHashed)).toBe(true);
      expect(existsSync(`${resultPathAssetsHashed}/nested`)).toBe(true);
    });

    it(`Should create path files`, async () => {
      const tsEnumPath = `${resultPath}/assets.ts`;
      const jsConstPath = `${resultPath}/assets.js`;
      const sassVariablesPath = `${resultPath}/assets.scss`;
      const cssVariablesPath = `${resultPath}/assets.css`;

      await hashAssets({
        from: `tests/fixtures/assets`,
        to: resultPathAssetsHashed,
        tsEnumPath,
        jsConstPath,
        sassVariablesPath,
        cssVariablesPath,
        silent: true,
      });

      expect(existsSync(tsEnumPath)).toBe(true);
      expect(existsSync(jsConstPath)).toBe(true);
      expect(existsSync(sassVariablesPath)).toBe(true);
      expect(existsSync(cssVariablesPath)).toBe(true);
    });

    it(`Should create path files and remove parts from the generated file paths `, async () => {
      const tsEnumPath = `${resultPath}/assets.ts`;
      const removePaths = ['tests/fixtures/assets/', 'tests/fixtures/results/assets-hashed/'];

      await hashAssets({
        from: `tests/fixtures/assets`,
        to: resultPathAssetsHashed,
        tsEnumPath,
        removePaths,
        silent: true,
      });

      expect(existsSync(tsEnumPath)).toBe(true);

      const tsEnumContent = readFileSync(tsEnumPath, 'utf8');

      removePaths.forEach(removePath => expect(tsEnumContent).not.toContain(removePath));
    });

    it(`Should log if no --silent added`, async () => {
      const originalLog = console.log;

      const logSpy = jest.fn();

      console.log = logSpy;

      await hashAssets({
        from: `tests/fixtures/assets`,
        to: resultPathAssetsHashed,
      });

      expect(logSpy).toHaveBeenCalled();

      console.log = originalLog;
    });
  });
});
