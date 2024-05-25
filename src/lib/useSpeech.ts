import { useEffect, useState } from 'react';

import { PlayingState, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<null | number>(null);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const onBoundary = () => {
    setCurrentWordRange((state) => (state || 0) + 1)
  }

  const onEnd = () => {
    setCurrentSentenceIdx((state) => {
      const newValue = state + 1;
      
      if(newValue > sentences.length){
        load(sentences[0]);
        return 0;
      }
      load(sentences[newValue]);
      return newValue;
    });
    
  }

  const {state,
    play: speechPLay,
    pause: speechPause,
    cancel,
    load,} = createSpeechEngine({onBoundary,
    onEnd,
    onStateUpdate: setPlaybackState});

  const play = () => {
    setCurrentWordRange(0)
    speechPLay()};
  const pause = () => {
    speechPause();
  };

  useEffect(() => {
    if(sentences?.length) {
      // load first sentence for play
      load(sentences[0]);
      setCurrentWordRange(null);
    }

    return () => {
      cancel();
    }
  },[sentences])

  useEffect(() => {
    if(state.utterance) {
      // play every time when current sentence changed
      play();
    }
  }, [currentSentenceIdx])

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
