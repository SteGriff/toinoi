import express from 'express';
import { getAudio, validateGenderChar } from './speech.mjs';
import * as dotenv from 'dotenv';

// Maybe try this async error handling:
// https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware

const app = express();
dotenv.config();

app.use(express.static("public"));

app.get("/", async (_, res) => {
  try {
    const result = { "Route": "/" }
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.json({
      "Status": "Error",
      "Message": error.toString()
    });
  }
});

app.get("/say/:gender/:text", async (req, res) => {
  try {
    const valid = validateGenderChar(req.params.gender);
    if (!valid)     return res.json({
      "Status": "Error",
      "Message": error.toString()
    });

    //const result = { "Route": "Say", "Params" : req.params }
    const result = await getAudio(req.params.gender, req.params.text);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.json({
      "Status": "Error",
      "Message": error.toString()
    });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 443, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
