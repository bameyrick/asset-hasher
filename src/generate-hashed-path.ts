import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { extname } from 'path';

export function generateHashedPath(path: string, from: string, to: string): string {
  const fileContent = readFileSync(path);
  const hash = createHash('md5');
  const fileExtention = extname(path);

  hash.update(fileContent);

  return path.replace(`${from.split('/*')[0]}`, `${to}`).replace(new RegExp(`${fileExtention}$`), `.${hash.digest('hex')}${fileExtention}`);
}
