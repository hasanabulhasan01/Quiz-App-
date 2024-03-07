import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState();

  useEffect(function () {
    getQuestionsFromAPI();
  }, []);

  function getQuestionsFromAPI() {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((res) => {
        res.map(function (item) {
          item.options = [...item.incorrectAnswers, item.correctAnswer];
          item.options = shuffle(item.options);
        });
        setQuestions(res);
      });
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[randomIndex], array[currentIndex]] = [
        array[currentIndex],
        array[randomIndex],
      ];
    }
    return array;
  }

  if (!questions.length) {
    return (
      <div>
        <h1>Loading........</h1>
      </div>
    );
  }

  function next() {
    setCurrentIndex(currentIndex + 1);

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 10);
    }

    setSelectedOption(null);
  }

  function restart() {
    setCurrentIndex(0);
  }

  function selectedItem(item) {
    setSelectedOption(item);
  }

  const endQuiz = currentIndex === questions.length;
  const currentQuestion = questions[currentIndex];

  return (
    <div className="App">
  <div className="App-header">
    {!endQuiz ? (
      <>
        <h1>
          <u>Quiz Application</u>
        </h1>
        <h2>
          Question: {currentIndex + 1}){" "}
          {questions[currentIndex].question.text}
        </h2>

        <div className="options-container">
          {currentQuestion.options.map(function (item, index) {
            return (
              <div key={index}>
                <input
                  onChange={() => selectedItem(item)}
                  name="options"
                  type="radio"
                  checked={selectedOption === item}
                  value={item}
                />
                {item}
              </div>
            );
          })}
        </div>
        <button onClick={next}>Next</button>
      </>
    ) : (
      <div className="result">
        <h2>Result</h2>
        <h3>Your Score is {score} out of 100</h3>

        <button onClick={restart}>Restart</button>
      </div>
    )}
  </div>
</div>

  );
}

export default App;
