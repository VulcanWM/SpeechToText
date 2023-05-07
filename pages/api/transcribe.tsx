export default async function handler(req, res) {
  // Get data submitted in request's body.
const mySecret = process.env['DG_API_KEY']
const {url} = JSON.parse(req.body)

 const response = await fetch('https://api.deepgram.com/v1/listen?tier=enhanced&punctuate=true&paragraphs=true&diarize=true', {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + mySecret,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
url        })
      });
const json = await response.json() 
  res.status(200).json(JSON.stringify(json))
}