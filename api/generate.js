export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: `Cinematic animated movie style, vibrant colors, detailed, ${prompt}`,
        size: "1024x1024"
      })
    });

    const data = await response.json();

    res.status(200).json({
      image: data.data?.[0]?.url
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
      }
