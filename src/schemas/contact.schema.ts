import { Schema } from "effect";

export const ContactInquirySchema = Schema.Struct({
  name: Schema.NonEmptyTrimmedString,
  email: Schema.String.pipe(Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
  productContext: Schema.NonEmptyTrimmedString,
  angularVersion: Schema.NonEmptyTrimmedString,
  teamSize: Schema.NonEmptyTrimmedString,
  pain: Schema.String.pipe(Schema.minLength(12)),
  engagementType: Schema.Literal("diagnosis", "implementation", "advisory", "unsure"),
  timeline: Schema.NonEmptyTrimmedString,
  budgetComfort: Schema.optionalWith(Schema.String, { default: () => "" }),
  consent: Schema.Literal(true)
});

export type ContactInquiryInput = Schema.Schema.Encoded<typeof ContactInquirySchema>;
