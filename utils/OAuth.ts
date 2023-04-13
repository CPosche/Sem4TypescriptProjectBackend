import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const getAccessToken = async () => {
  const response = await axios.post(
    "https://oauth.battle.net/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      auth: {
        username: process.env.CLIENT_ID!,
        password: process.env.CLIENT_SECRET!,
      },
    }
  );
  return response.data.access_token;
};

const OAuth = {
  getAccessToken,
};

export default OAuth;
