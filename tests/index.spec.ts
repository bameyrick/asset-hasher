import { jest } from '@jest/globals';
import { existsSync } from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import { runCommand } from './run-command';

describe(`asset-hasher`, () => {
  const resultPath = 'tests/fixtures/results';
  const resultPathAssetsHashed = `${resultPath}/assets-hashed`;

  beforeEach(() => jest.resetModules());

  afterEach(async () => {
    await Promise.all([resultPath].map(directory => new Promise(resolve => rimraf(path.join(process.cwd(), directory), resolve))));
  });

  it(`Should hash assets`, async () => {
    await runCommand(`hash-assets --fromPath=tests/fixtures/assets --toPath=${resultPathAssetsHashed} --silent`);

    expect(existsSync(resultPathAssetsHashed)).toBe(true);
    expect(existsSync(`${resultPathAssetsHashed}/nested`)).toBe(true);
  });

  it(`Should create path files`, async () => {
    const tsEnumPath = `${resultPath}/assets.ts`;
    const jsConstPath = `${resultPath}/assets.js`;
    const sassVariablesPath = `${resultPath}/assets.scss`;
    const cssVariablesPath = `${resultPath}/assets.css`;

    await runCommand(
      `hash-assets --fromPath=tests/fixtures/assets --toPath=${resultPathAssetsHashed} --tsEnumPath=${tsEnumPath} --jsConstPath=${jsConstPath} --sassVariablesPath=${sassVariablesPath} --cssVariablesPath=${cssVariablesPath} --silent`
    );

    expect(existsSync(tsEnumPath)).toBe(true);
    expect(existsSync(jsConstPath)).toBe(true);
    expect(existsSync(sassVariablesPath)).toBe(true);
    expect(existsSync(cssVariablesPath)).toBe(true);
  });

  it(`Should log if no --silent added`, async () => {
    const originalLog = console.log;

    const logSpy = jest.fn();

    console.log = logSpy;

    await runCommand(`hash-assets --fromPath=tests/fixtures/assets --toPath=${resultPathAssetsHashed}`);

    expect(logSpy).toHaveBeenCalled();

    console.log = originalLog;
  });
});
