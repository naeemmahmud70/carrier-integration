import { CarrierFactory } from "./carriers/carrier.factory";
import { RateService } from "./services/rate.service";

async function main() {
  const carrier = CarrierFactory.create("ups");
  const service = new RateService(carrier);

  const rates = await service.getRates({
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

  console.log("demo", JSON.stringify(rates, null, 2));
}

main();
