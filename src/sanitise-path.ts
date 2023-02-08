import { isEmpty } from '@qntm-code/utils';

export function sanitisePath(cwd: string, path: string, removePaths?: string[]): string {
  let result = path.replace(cwd, '');

  if (removePaths) {
    removePaths.forEach(removePath => (result = result.replace(removePath.trim(), '')));
  }

  return result
    .split('/')
    .filter(part => !isEmpty(part))
    .join('/');
}
