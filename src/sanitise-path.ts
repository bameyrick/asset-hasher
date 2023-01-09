import { isEmpty } from '@qntm-code/utils';

export function sanitisePath(cwd: string, path: string, removePath?: string): string {
  let result = path.replace(cwd, '');

  if (removePath) {
    result = result.replace(removePath, '');
  }

  return result
    .split('/')
    .filter(part => !isEmpty(part))
    .join('/');
}
