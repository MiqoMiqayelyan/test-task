import './App.css';

import { useEffect, useState } from 'react';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';

import { fetchContent, parseContentIntoSentences } from './lib/content';

import { useSpeech } from './lib/useSpeech';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentSentenceIdx,
    currentWordRange,
    play,
    pause, 
  } = useSpeech(sentences);

  const loadNewContent = async() => {
    pause();
    const text = await fetchContent();

    const parsedText = parseContentIntoSentences(text);

    setSentences(parsedText);
  }

  useEffect(() => {
    loadNewContent() 
  }, [])

  return (
    <div className="App">
      <div>
        <CurrentlyReading currentSentenceIdx={currentSentenceIdx} currentWordRange={currentWordRange} sentences={sentences}/>
      </div>
      <div>
       
        <Controls play={play} pause={pause} loadNewContent={loadNewContent}/>
      </div>
    </div>
  );
}

export default App;
