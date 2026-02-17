# Project Overview
### Project Name: Carrier Integration Service
**Description:** A production-oriented carrier integration module built with Node.js and TypeScript.
This implementation wraps the UPS Rating API and is intentionally designed to be extensible, testable, and maintainable as additional carriers and operations are introduced.

This project demonstrates:
- Clean separation of concerns
- Extensible carrier architecture
- Strong TypeScript domain modeling
- Runtime validation of inputs and external responses
- OAuth 2.0 client-credentials lifecycle management
- Structured error handling
- End-to-end integration testing with stubbed HTTP

## Architecture
This solution follows a lightweight Hexagonal Architecture (Ports & Adapters) approach.
```bash
Application Layer (RateService)
        ↓
Carrier Interface (Port)
        ↓
UPS Carrier Adapter
        ↓
HTTP Client (Transport Layer)
 ```


## 1.Core Design Decisions

```bash
interface Carrier {
  getRates(request: RateRequest): Promise<RateQuote[]>;
}
 ```
Adding FedEx, USPS, or DHL requires:
1. Implementing the Carrier interface
2. Registering the carrier in the factory

No changes to UPS code or domain models are required.

## 2.Domain Modeling

Internal domain models include:
- RateRequest
- RateQuote
- Address
- Package

These models are strictly independent of carrier-specific representations.
All external payloads are translated via a dedicated mapping layer.

## 3. OAuth 2.0 Lifecycle Management

The UPSTokenManager:
- Implements client-credentials flow
- Caches tokens in memory

## 4. HTTP Abstraction Layer

A dedicated HttpClient wraps axios to:
- Centralize timeout handling
- Decouple carriers from transport implementation
- Enable future retry/backoff logic
- Improve testability

This prevents carrier logic from being tightly coupled to a specific HTTP library.

## 5. Runtime Validation (Defensive Integration)

All external boundaries are validated using Zod:

- Incoming RateRequest payloads
- UPS API responses

This ensures:
- Fail-fast behavior
- Defensive parsing of third-party responses
- Runtime safety beyond compile-time types

## 6. Structured Error Handling

All errors are normalized into domain-specific error classes:
- ValidationError
- AuthError
- RateLimitError
- TimeoutError
- ExternalApiError

Errors include:
- Error code
- Carrier
- Operation
- Human-readable message
Raw axios errors are never leaked outside the integration layer.

## Project Structure

```bash
src/
  core/            # Domain models & carrier interface
  services/        # Application service layer
  carriers/
    ups/           # UPS adapter implementation
  http/            # HTTP abstraction
  config/          # Environment configuration
  errors/          # Structured error definitions

tests/
  integration/     # Stubbed end-to-end tests
```

**Installation**  
```bash
npm install
```
**Environment Configuration**
Copy the example file:
```bash
.env.example
```

Required variables:
```bash
UPS_CLIENT_ID=
UPS_CLIENT_SECRET=
UPS_BASE_URL=
UPS_OAUTH_URL=
HTTP_TIMEOUT_MS=
```
No secrets are hardcoded.

## Running the Project
**Type Check**
```bash
npm run typecheck
```

**Run Tests**
```bash
npm test
```

**Build**
```bash
npm run build
```
All tests run against stubbed HTTP responses. No live UPS credentials are required.

## What I Would Improve With More Time

- Decouple carriers from transport implementation
- Enable future retry/backoff logic
- 401 retry logic
- 429 rate limit handling
- Pluggable retry policies
- Backoff strategy for rate limits
- 100% test coverage enforcement