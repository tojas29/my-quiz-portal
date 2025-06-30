import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import quizService from "./quizService";

class QuizBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0,
  };

  getQuestions = () => {
    quizService().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
  };

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5,
    });
  };

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0,
    });
  };

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="title">Simple Quiz</div>
          {this.state.questionBank.length > 0 &&
            this.state.responses < 5 &&
            this.state.questionBank.map(
              ({ question, answers, correct, questionId }) => (
                <QuestionBox
                  question={question}
                  answers={answers}
                  key={questionId}
                  selected={(answer) => this.computeAnswer(answer, correct)}
                />
              )
            )}

          {this.state.responses === 5 ? (
            <Result score={this.state.score} playAgain={this.playAgain} />
          ) : null}
        </div>
        <div
          style={{
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#445",
            fontSize: "0.9rem",
          }}
        >
          &copy; 2021,
          <a href="https://greg021.github.io" target="_blank" className="link">
            Greg Jones
          </a>
        </div>
      </>
    );
  }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));
