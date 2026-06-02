export type SystemMap = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly fallbackLabel: string;
  readonly nodes: readonly {
    readonly id: string;
    readonly label: string;
    readonly group: string;
    readonly description: string;
  }[];
  readonly groups: readonly {
    readonly id: string;
    readonly label: string;
  }[];
  readonly edges: readonly {
    readonly from: string;
    readonly to: string;
    readonly label: string;
  }[];
  readonly riskMarkers: readonly {
    readonly nodeId: string;
    readonly label: string;
  }[];
  readonly decisionMarkers: readonly {
    readonly nodeId: string;
    readonly label: string;
  }[];
  readonly states: {
    readonly messy: string;
    readonly explicit: string;
  };
};
