const { Deepgram } = require("@deepgram/sdk");
const fs = require('fs');
const mySecret = process.env['DG_API_KEY']
const deepgram = new Deepgram(mySecret);

export default async function handler(req, res) {
// const {url} = JSON.parse(req.body)
// console.log(url)
//  const response = await fetch('https://api.deepgram.com/v1/listen?tier=enhanced&punctuate=true&paragraphs=true&diarize=true', {
//         method: 'POST',
//         headers: {
//           'Authorization': 'Token ' + mySecret,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
// url        })
//       });
const streamSource = {
  stream: fs.createReadStream("speech.m4a"),
  mimetype: "m4a",
};

const response = await deepgram.transcription.preRecorded(streamSource, {
  punctuate: true,
});
// const json = await response.json() 
  // res.status(200).json(JSON.stringify(json))
  res.status(200).json(JSON.stringify(response))
}