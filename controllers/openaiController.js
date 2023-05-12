const request = require("request");

const generateImage = async (req, res) => {
  const { prompt, size } = await req.body;

  const imageSize =
    (await size) === "small"
      ? "256x256"
      : size === "medium"
      ? "512x512"
      : "1024x1024";

  const options =await {
    method: "POST",
    url: "https://openai80.p.rapidapi.com/images/generations",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID,
      "X-RapidAPI-Host": process.env.HOST,
    },
    body: {
      prompt: prompt,
      n: 1,
      size: imageSize,
    },
    json: true,
  };

  request(options,async (error, response, body)=> {
    if (error) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
    const imageUrl =await body.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  });

};

module.exports = { generateImage };
