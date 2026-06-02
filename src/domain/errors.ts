export type PortfolioError =
  | { readonly _tag: "ContentDecodeError"; readonly message: string }
  | { readonly _tag: "MissingContentError"; readonly message: string }
  | { readonly _tag: "ContactValidationError"; readonly message: string }
  | { readonly _tag: "SpamProtectionError"; readonly message: string }
  | { readonly _tag: "ContactDeliveryError"; readonly message: string };

export type ContactValidationError = Extract<
  PortfolioError,
  { readonly _tag: "ContactValidationError" }
>;

export type SpamProtectionError = Extract<PortfolioError, { readonly _tag: "SpamProtectionError" }>;

export type ContactDeliveryError = Extract<
  PortfolioError,
  { readonly _tag: "ContactDeliveryError" }
>;
