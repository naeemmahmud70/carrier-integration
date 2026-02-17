import axios from "axios";
import { config } from "../../config/env";
import { AuthError } from "../../erorrs/carrier.errors";

export class UPSTokenManager {
  private token?: string;
  private expiresAt?: number;

  async getValidToken(): Promise<string> {
    if (this.token && this.expiresAt && Date.now() < this.expiresAt) {
      return this.token;
    }

    return this.fetchToken();
  }

  private async fetchToken(): Promise<string> {
    try {
      const response = await axios.post(
        config.ups.oauthUrl,
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: config.ups.clientId,
            password: config.ups.clientSecret,
          },
        },
      );

      this.token = response.data.access_token;
      this.expiresAt = Date.now() + response.data.expires_in * 1000;

      return this.token ?? "";
    } catch (err) {
      throw new AuthError(
        "AUTH_FAILED",
        "UPS",
        "OAUTH",
        "Failed to acquire UPS OAuth token",
      );
    }
  }
}
