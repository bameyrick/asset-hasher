import { AssetHasherOptionsKey } from './options-key';

export interface AssetHasherOptions {
  // Glob pattern of the assets to hash
  [AssetHasherOptionsKey.from]: string;
  // The path to the directory where the hashed assets will be written
  [AssetHasherOptionsKey.to]: string;
  // Partial path to remove from the hashed asset enum/const/variables paths
  [AssetHasherOptionsKey.removePath]?: string;
  // Whether to watch the assets directory for changes
  [AssetHasherOptionsKey.watch]?: boolean;
  // Ignores the files that already exists when starting with watch enabled
  [AssetHasherOptionsKey.ignoreInitial]?: boolean;
  // The path to create the TypeScript enum containing the paths of the hashed assets. If not specified, the enum will not be created
  [AssetHasherOptionsKey.tsEnumPath]?: string;
  // The path to create the JavaScript const containing the paths of the hashed assets. If not specified, the const will not be created
  [AssetHasherOptionsKey.jsConstPath]?: string;
  // The path to create the SASS variables containing the paths of the hashed assets. If not specified, the variables will not be created
  [AssetHasherOptionsKey.sassVariablesPath]?: string;
  // The path to create the CSS variables containing the paths of the hashed assets. If not specified, the variables will not be created
  [AssetHasherOptionsKey.cssVariablesPath]?: string;
  // Whether to suppress logging
  [AssetHasherOptionsKey.silent]?: boolean;
}
