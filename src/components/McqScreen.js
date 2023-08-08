import React, { useState, useEffect } from 'react';

const McqScreen = ({ questionsData }) => {
  // State variables
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Question details
  const question = questionsData[questionIndex];
  const shuffledOptions = [...question?.incorrect_answers, question?.correct_answer].sort(() => Math.random() - 0.5);
  const isCorrect = selectedOption === question?.correct_answer;
  const progress = ((questionIndex + 1) / questionsData.length) * 100;

  // Calculate difficulty stars based on question difficulty
  const difficultyStars = question?.difficulty === 'easy' ? 1 : question?.difficulty === 'medium' ? 2 : 3;

  // Event handlers
  const handleOptionSelect = (option) => {
    if (!showResult) {
      setSelectedOption(option);
      setShowResult(true);
      if (option === question?.correct_answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // Update options and reset state on question change
  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setOptions(shuffledOptions);
  }, [questionIndex]);

  return (
    <div className="main-card">
      <div className="card">
        {/* Progress bar */}
        {progress && <div className="progress">
          <div className="progress-bar test-progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
        </div>}

        <div className="card-body">
          <div>
            <h3>Question {questionIndex + 1} of {questionsData.length}</h3>
            <p>{decodeURIComponent(question.category)}</p>
            {/* Difficulty stars */}
            <div className="difficulty-stars">
              {Array.from({ length: difficultyStars }).map((_, index) => (
                <span key={index} className="star-icon">
                  &#9733; {/* Unicode character for a solid star */}
                </span>
              ))}
            </div>
          </div>
          
          {/* Question text */}
          <p className="fw-bold">{decodeURIComponent(question.question)}</p>
          {/* Options */}
          <div className="options-container">
            <div className="options-row">
              {options.slice(0, 2).map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {decodeURIComponent(option)}
                </button>
              ))}
            </div>
            <div className="options-row">
              {options.slice(2, 4).map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {decodeURIComponent(option)}
                </button>
              ))}
            </div>
          </div>
          {/* Result */}
          {showResult && <div>{isCorrect ? 'Correct' : 'Sorry. Please try again.'}</div>}
          {/* Next Question button */}
          {questionIndex < 19 && (
            <button className="btn btn-dark mt-3" onClick={handleNextQuestion} disabled={!showResult}>
              Next Question
            </button>
          )}
        </div>

        {/* Score area */}
        <div className="score-area">
          <div className='score-data'>
            <p>Score: {((score / questionsData.length) * 100).toFixed(0)}%</p>
            <p>Max Score 75%</p>
          </div>
          <div className="progress">
            <div className="progress-bar score-bar" role="progressbar" style={{ width: `${((score / questionsData.length) * 100).toFixed(2)}%` }} aria-valuenow={((score / questionsData.length) * 100).toFixed(2)} aria-valuemin="0" aria-valuemax="100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default McqScreen;
