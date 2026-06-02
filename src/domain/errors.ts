export type PortfolioError =
  | { readonly _tag: "ContentDecodeError"; readonly message: string }
  | { readonly _tag: "MissingContentError"; readonly message: string }
  | { readonly _tag: "ContactValidationError"; readonly message: string }
  | { readonly _tag: "ContactDeliveryError"; readonly message: string };
