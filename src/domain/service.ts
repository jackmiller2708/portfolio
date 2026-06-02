export type ServiceOffer = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly clientPain: string;
  readonly outputs: readonly string[];
  readonly bestFit: readonly string[];
  readonly notFit: readonly string[];
  readonly cta: {
    readonly label: string;
    readonly href: string;
  };
};
