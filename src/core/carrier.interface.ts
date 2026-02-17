import { RateRequest, RateQuote } from "./rate.types";

export interface Carrier {
  getRates(request: RateRequest): Promise<RateQuote[]>;
}
