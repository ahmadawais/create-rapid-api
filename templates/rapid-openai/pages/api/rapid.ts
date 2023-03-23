// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Prompt for API key
if (!process.env.RAPIDAPI_KEY) {
  throw new Error('Missing Environment Variable RAPIDAPI_KEY')
}
// Prompt for API URL
if (!process.env.RAPIDAPI_KEY) {
  throw new Error('Missing Environment Variable RAPIDAPI_KEY')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const options = {
      method: "GET",
      url: process.env.RAPIDAPI_URL,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      }
    };

    try {
      const response = await axios.request(options);

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: err });
      console.log(err);
    }
  }
}
