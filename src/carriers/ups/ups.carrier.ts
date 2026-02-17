import axios from "axios";
import { Carrier } from "../../core/carrier.interface";
import { RateRequest, RateQuote } from "../../core/rate.types";
import { UPSTokenManager } from "./ups.auth";
import { config } from "../../config/env";
import { ExternalApiError } from "../../erorrs/carrier.errors";

export class UPSCarrier implements Carrier {
  private tokenManager = new UPSTokenManager();

  async getRates(request: RateRequest): Promise<RateQuote[]> {
    const token = await this.tokenManager.getValidToken();

    try {
      const response = await axios.post(
        `${config.ups.baseUrl}/api/rating`,
        this.buildUPSRequest(request),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return this.mapUPSResponse(response.data);
    } catch (err: any) {
      throw new ExternalApiError(
        "UPS_RATE_ERROR",
        "UPS",
        "RATE",
        "Failed to fetch UPS rates",
      );
    }
  }

  private buildUPSRequest(request: RateRequest) {
    return {
      RateRequest: {
        Shipment: {
          Shipper: {
            Address: {
              PostalCode: request.origin.postalCode,
              CountryCode: request.origin.countryCode,
            },
          },
        },
      },
    };
  }

  private mapUPSResponse(data: any): RateQuote[] {
    return data.RateResponse.RatedShipment.map((shipment: any) => ({
      carrier: "UPS",
      serviceLevel: shipment.Service.Code,
      amount: Number(shipment.TotalCharges.MonetaryValue),
      currency: shipment.TotalCharges.CurrencyCode,
    }));
  }
}
