import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Prompt for API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "POST") {
    const { prompt } = req.body;

    const options = {
      // Reference: https://platform.openai.com/docs/api-reference/completions/create
      prompt: `Answer the following prompt in less than ten lines: ${prompt}`,
      model: 'text-davinci-003',
      max_tokens: 260,
      temperature: 0.7,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,

      },
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        options,
        config
      );

      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).json({ error: err });
      console.log(err);
    }
  }
}
