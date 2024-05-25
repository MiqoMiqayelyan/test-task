/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: number | null;
  currentSentenceIdx: number;
  sentences: string[];
}) => {

  return <div data-testid="currently-reading" className="currently-reading">{sentences.map((sentence, index) => 
    <p key={sentence} className={currentSentenceIdx === index ? 'currently-reading-text': ''} data-testid={currentSentenceIdx && 'current-sentence'}>
      {sentence.split(' ').map((sent, index) => <span key={sent} className={currentWordRange === index ? 'currentword' : ''}> {sent} </span>)}
    </p>
  )}</div>;
};
