export class CarrierError extends Error {
  constructor(
    public code: string,
    public carrier: string,
    public operation: string,
    message: string
  ) {
    super(message);
  }
}

export class AuthError extends CarrierError {}
export class RateLimitError extends CarrierError {}
export class ExternalApiError extends CarrierError {}
export class TimeoutError extends CarrierError {}
export class ValidationError extends CarrierError {}