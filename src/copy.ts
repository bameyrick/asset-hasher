import { copyFileSync, mkdirSync } from 'fs';

export function copy(from: string, to: string): void {
  mkdirSync(to.split('/').slice(0, -1).join('/'), { recursive: true });

  copyFileSync(from, to);
}
