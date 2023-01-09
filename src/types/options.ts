import { AssetHasherOptionsKey } from './options-key';

export interface AssetHasherOptions {
  [AssetHasherOptionsKey.fromPath]: string;
  [AssetHasherOptionsKey.toPath]: string;
  [AssetHasherOptionsKey.removePath]?: string;
  [AssetHasherOptionsKey.watch]?: boolean;
  [AssetHasherOptionsKey.tsEnumPath]?: string;
  [AssetHasherOptionsKey.jsConstPath]?: string;
  [AssetHasherOptionsKey.sassVariablesPath]?: string;
  [AssetHasherOptionsKey.cssVariablesPath]?: string;
  [AssetHasherOptionsKey.silent]?: boolean;
}
