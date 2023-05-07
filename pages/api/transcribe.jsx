const { Deepgram } = require("@deepgram/sdk");
const fs = require('fs');
const mySecret = process.env['DG_API_KEY']
const deepgram = new Deepgram(mySecret);

export default async function handler(req, res) {
const streamSource = {
  stream: fs.createReadStream("speech.m4a"),
  mimetype: "m4a",
};

const response = await deepgram.transcription.preRecorded(streamSource, {
  punctuate: true,
});
  res.status(200).json(JSON.stringify(response))
}
