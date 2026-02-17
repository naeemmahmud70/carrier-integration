import dotenv from "dotenv";

dotenv.config();

export const config = {
  ups: {
    clientId: process.env.UPS_CLIENT_ID!,
    clientSecret: process.env.UPS_CLIENT_SECRET!,
    baseUrl: process.env.UPS_BASE_URL!,
    oauthUrl: process.env.UPS_OAUTH_URL!,
  },
  httpTimeout: Number(process.env.HTTP_TIMEOUT_MS || 5000),
};
