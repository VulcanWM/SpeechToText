This is a template which converts an audio file to text using the Deepgram API.

## Using the template
- Create an `.env` file and add your Deepgram API key with the key `DG_API_KEY`. If you don't have a Deepgram API key, [get it here](https://console.deepgram.com/signup?jump=keys).
- Go to `/pages/api/transcribe.jsx` and change `[path_of_file]` to the path of the file you want to transcribe.
- Also in `/pages/api/transcribe.jsx` change `[mimetype]` to the mimetype of the file you want to transcribe.
