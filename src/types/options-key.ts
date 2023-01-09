export enum AssetHasherOptionsKey {
  // Glob pattern of the assets to hash
  from = 'from',
  // The path to the directory where the hashed assets will be written
  to = 'to',
  // Partial path to remove from the hashed asset enum/const/variables paths
  removePath = 'removePath',
  // Whether to watch the assets directory for changes
  watch = 'watch',
  // The path to create the TypeScript enum containing the paths of the hashed assets. If not specified, the enum will not be created
  tsEnumPath = 'tsEnumPath',
  // The path to create the JavaScript const containing the paths of the hashed assets. If not specified, the const will not be created
  jsConstPath = 'jsConstPath',
  // The path to create the SASS variables containing the paths of the hashed assets. If not specified, the variables will not be created
  sassVariablesPath = 'sassVariablesPath',
  // The path to create the CSS variables containing the paths of the hashed assets. If not specified, the variables will not be created
  cssVariablesPath = 'cssVariablesPath',
  // Whether to suppress logging
  silent = 'silent',
}
