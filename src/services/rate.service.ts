import { Carrier } from "../core/carrier.interface";
import { RateRequestSchema } from "../core/schemas";
import { ValidationError } from "../erorrs/carrier.errors";

export class RateService {
  constructor(private carrier: Carrier) {}

  async getRates(request: unknown) {
    const parsed = RateRequestSchema.safeParse(request);

    if (!parsed.success) {
      throw new ValidationError(
        "INVALID_INPUT",
        "SYSTEM",
        "RATE",
        parsed.error.message,
      );
    }

    return this.carrier.getRates(parsed.data);
  }
}
