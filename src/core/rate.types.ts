import { Address } from "./address.types";
import { Package } from "./package.types";

export interface RateRequest {
  origin: Address;
  destination: Address;
  packages: Package[];
  serviceLevel?: string;
}

export interface RateQuote {
  carrier: string;
  serviceLevel: string;
  amount: number;
  currency: string;
  estimatedDeliveryDays?: number;
}