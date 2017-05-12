import React, { Component } from 'react';
import update from 'react-addons-update';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      name: '',
      email: '',
      answer: '',
      answersCount: {
        incorrect1: 0,
        incorrect2: 0,
        incorrect3: 0,
        correct: 0
      },
      result: '',
      time: {},
      seconds: 300
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    
    while (0 !== currentIndex) {

      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    
        setTimeout(() => this.setNextQuestion(), 300);
    
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });

    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        answer: ''
    });
  }
  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }
  renderResult() {
    return (
      <Result correct={this.state.answersCount["correct"]} 
      incorrect={quizQuestions.length-this.state.answersCount["correct"]-1}
      time={300-this.state.seconds} />
      
    );
  }
  /*updateName(e) {
      this.setState({name: e.target.value});
  }
  updateEmail(e) {
      this.setState({email: e.target.value});
  }
  renderUserInfo(){
     
      return (
         <div>
            <input type="text" value={this.state.name} 
               onChange={this.updateName} />
            <input type="text" value={this.state.email} 
               onChange={this.updateEmail} />
            <h4>{this.state.email}fsdfds</h4>
         </div>
      );
   
  }*/
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
   if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    
    let seconds = this.state.seconds - 1;
     if(this.state.questionId < quizQuestions.length){
      this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
      });
    
      
      
    }
    if (seconds === 0) { 
        clearInterval(this.timer);
        this.setState({
          questionId : quizQuestions.length,
         });
        }
    }

  render() {
    return (
      <div className="App">
        
        <div class="timer" >
        { this.startTimer()}
        m: {this.state.time.m} s: {this.state.time.s}
      </div>
        {this.state.questionId < quizQuestions.length ?  this.renderQuiz() : this.renderResult() }
      </div>
    );
  }

}

export default App;
