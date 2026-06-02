export type AssetBudgetInput = {
  readonly clientAssets: readonly {
    readonly route: string;
    readonly bytes: number;
  }[];
  readonly ogAssets: readonly {
    readonly path: string;
    readonly bytes: number;
  }[];
};

export type AssetBudgetLimits = {
  readonly maxClientBytesPerRoute: number;
  readonly maxOgBytesTotal: number;
  readonly maxSingleAssetBytes: number;
};

export const defaultAssetBudgetLimits: AssetBudgetLimits = {
  maxClientBytesPerRoute: 45 * 1024,
  maxOgBytesTotal: 150 * 1024,
  maxSingleAssetBytes: 100 * 1024
};

export const findAssetBudgetIssues = (
  input: AssetBudgetInput,
  limits: AssetBudgetLimits = defaultAssetBudgetLimits
): readonly string[] => {
  const issues: string[] = [];
  const clientByRoute = new Map<string, number>();

  for (const asset of input.clientAssets) {
    clientByRoute.set(asset.route, (clientByRoute.get(asset.route) ?? 0) + asset.bytes);

    if (asset.bytes > limits.maxSingleAssetBytes) {
      issues.push(`${asset.route}: client asset exceeds ${limits.maxSingleAssetBytes} bytes`);
    }
  }

  for (const [route, bytes] of clientByRoute) {
    if (bytes > limits.maxClientBytesPerRoute) {
      issues.push(`${route}: client JS ${bytes} > ${limits.maxClientBytesPerRoute}`);
    }
  }

  const ogTotal = input.ogAssets.reduce((total, asset) => total + asset.bytes, 0);
  if (ogTotal > limits.maxOgBytesTotal) {
    issues.push(`OG assets ${ogTotal} > ${limits.maxOgBytesTotal}`);
  }

  for (const asset of input.ogAssets) {
    if (asset.bytes > limits.maxSingleAssetBytes) {
      issues.push(`${asset.path}: asset exceeds ${limits.maxSingleAssetBytes} bytes`);
    }
  }

  return issues;
};
