/**
 * Programmatically set arguments and execute the CLI script
 */
export async function runCommand(args: string): Promise<unknown> {
  // return exec(`node dist/index.js ${args}`);
  process.argv = [
    'node', // Not used but a value is required at this index in the array
    'cli.js', // Not used but a value is required at this index in the array
    ...args.split(' '),
  ];

  // Require the yargs CLI script
  return import('../src/cli');
}
