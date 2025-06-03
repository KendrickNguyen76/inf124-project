import React from "react";
import { useNavigate } from 'react-router-dom';
import "./QuestionBankQuestions.css";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const QuestionBankQuestionsTitle = () => (
    <div className = "question_bank_question_title">
      <h1> Byte Me Practice Mode </h1>
      <p> Select the question you would like to practice solving</p>
    </div>
  )

/*figure out how to call the previous state of question set in here */
const QuestionsCall = () => {
  const location = useLocation();
  const difficulty = location.state?.difficulty;

  /*use the difficulty to query the database*/
  return (
    <div>
      <h2> Selected Difficulty: </h2>
      <p>{difficulty ? difficulty: "no difficulty selected."}</p>
    </div>
  )
}

const QuestionBankQuestions = () => {

  return(
    <div className = "question_bank_questions_cat">
      <QuestionBankQuestionsTitle/>
      <QuestionsCall/>
    </div>
  )
}
export default QuestionBankQuestions;