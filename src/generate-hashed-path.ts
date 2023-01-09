import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { extname } from 'path';

export function generateHashedPath(path: string, fromPath: string, toPath: string): string {
  const fileContent = readFileSync(path);
  const hash = createHash('md5');
  const fileExtention = extname(path);

  hash.update(fileContent);

  return path
    .replace(`${fromPath.split('/*')[0]}`, `${toPath}`)
    .replace(new RegExp(`${fileExtention}$`), `.${hash.digest('hex')}${fileExtention}`);
}
