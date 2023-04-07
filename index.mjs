import express from "express";
import { createAudio, validateGenderChar } from "./speech.mjs";
import * as dotenv from "dotenv";
import { getError } from "./results.mjs";

// Maybe try this async error handling:
// https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use("/audio", express.static("audio"));

app.get("/", async (_, res) => {
  try {
    const result = { Route: "/" };
    return res.json(result);
  } catch (error) {
    console.error(error);
    return getError(error);
  }
});

// CREATE - return a JSON response describing where to download the audio
app.get("/create/:gender/:text", async (req, res) => {
  try {
    const valid = validateGenderChar(req.params.gender);
    if (!valid) return getError("Invalid gender character; try 'f' or 'm'");

    const result = await createAudio(req.params.gender, req.params.text);
    console.log("Return", result);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return getError(error);
  }
});

// SAY - Return streaming audio
app.get("/say/:gender/:text", async (req, res) => {
  try {
    const valid = validateGenderChar(req.params.gender);
    if (!valid) return getError("Invalid gender character; try 'f' or 'm'");

    const result = getError("Not implemented");
    return res.json(result);
  } catch (error) {
    console.error(error);
    return getError(error);
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 443, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
