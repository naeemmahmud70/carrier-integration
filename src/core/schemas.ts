import { z } from "zod";

export const AddressSchema = z.object({
  addressLine1: z.string().min(1),
  addressLine2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().optional(),
  postalCode: z.string().min(1),
  countryCode: z.string().length(2),
});

export const PackageSchema = z.object({
  weight: z.number().positive(),
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  unitOfMeasurement: z.enum(["IN", "CM"]),
  weightUnit: z.enum(["LBS", "KGS"]),
});

export const RateRequestSchema = z.object({
  origin: AddressSchema,
  destination: AddressSchema,
  packages: z.array(PackageSchema).min(1),
  serviceLevel: z.string().optional(),
});
