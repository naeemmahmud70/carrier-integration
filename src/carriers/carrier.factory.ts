import { Carrier } from "../core/carrier.interface";
import { UPSCarrier } from "./ups/ups.carrier";

export class CarrierFactory {
  static create(carrier: string): Carrier {
    switch (carrier.toLowerCase()) {
      case "ups":
        return new UPSCarrier();
      default:
        throw new Error("Unsupported carrier");
    }
  }
}
