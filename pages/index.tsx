import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [file, setFile] = useState('');
  const [transcription, setTranscription] = useState('')
  const [lines, setLines] = useState([]);
  
 useEffect(() => {
    setLines(transcription.split("."));
  }, [transcription]);
  
  const transcribe = async () => {
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: JSON.stringify({
          "url": file,
        })
      });
      const received = await response.json();
            const data= JSON.parse(received)
      const transcription = data.results.channels[0].alternatives[0].paragraphs.transcript;
      setTranscription(transcription)
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App + Deepgram Transcription</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Transcribe Me!
        </h1>

        <p className={styles.description}>
          Get started sharing a link to your audio file.</p>
        <form >
          <label htmlFor="audio-file">Link to Audio </label>
          <input onChange={e => setFile(e.target.value)} type="text" id="audio-file" name="audio-file" required />
          <button type='button' onClick={transcribe} className={styles.button}>Transcribe</button>
          <p>Sample url: https://www.buzzsprout.com/1976304/11410388-whisper-by-openai-everything-you-need-to-know-about-the-latest-in-open-source-speech-recognition.mp3</p>
        </form>
        {transcription &&  <div className={styles.transcript} id="new-transcription">
      {lines.map((line, index) => {
        if (line.startsWith("Speaker 0:")) {
          return <p key={index}>{line}</p>
        } else {
          return <p key={index}>{line}</p>
        }
      })}
    </div>}
        <div className={styles.grid}>
          <a href="https://developers.deepgram.com/documentation/" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Deepgram features and API.</p>
          </a>

          <a href="https://blog.deepgram.com/" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Deepgram through our tutorials and explore our blog!</p>
          </a>

          <a
            href="https://github.com/orgs/deepgram/discussions"
            className={styles.card}
          >
            <h2>Community &rarr;</h2>
            <p>Join our community to learn more about AI, ML, and have some fun!</p>
          </a>


        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="/__repl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built on
          <span className={styles.logo}>
            <Image src="/replit.svg" alt="Replit Logo" width={20} height={18} />
          </span>
          Replit + 
          <span className={styles.logo}>
            <Image src="/dg.svg" alt="Deepgram Logo" width={20} height={18} />
          </span>
        </a> 
               
      </footer>
    </div>
  )
}

export default Home
