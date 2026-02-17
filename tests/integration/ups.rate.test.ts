import { describe, it, expect } from "vitest";
import nock from "nock";
import { UPSCarrier } from "../../src/carriers/ups/ups.carrier";

describe("UPS Rate Integration", () => {
  it("should fetch and normalize rate", async () => {
    nock("https://onlinetools.ups.com")
      .post("/security/v1/oauth/token")
      .reply(200, {
        access_token: "mock-token",
        expires_in: 3600,
      });

    nock("https://onlinetools.ups.com")
      .post("/api/rating")
      .reply(200, {
        RateResponse: {
          RatedShipment: [
            {
              Service: { Code: "03" },
              TotalCharges: {
                CurrencyCode: "USD",
                MonetaryValue: "10.50",
              },
            },
          ],
        },
      });

    const carrier = new UPSCarrier();

    const rates = await carrier.getRates({
      origin: {
        addressLine1: "123 Main",
        city: "NY",
        postalCode: "10001",
        countryCode: "US",
      },
      destination: {
        addressLine1: "456 Other",
        city: "LA",
        postalCode: "90001",
        countryCode: "US",
      },
      packages: [
        {
          weight: 2,
          length: 10,
          width: 5,
          height: 4,
          unitOfMeasurement: "IN",
          weightUnit: "LBS",
        },
      ],
    });

    expect(rates[0].amount).toBe(10.5);
  });
});
