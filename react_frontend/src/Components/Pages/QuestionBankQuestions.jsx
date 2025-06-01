import React from "react";
import { useNavigate } from 'react-router-dom';
import "./QuestionBankQuestions.css";

const QuestionBankQuestionsTitle = () => (
    <div className = "question_bank_question_title">
      <h1> Byte Me Practice Mode </h1>
      <p> Select the question you would like to practice solving</p>
    </div>
  )

const QuestionBankQuestions = () => {
  return(
    <div className = "question_bank_questions_cat">
      <QuestionBankQuestionsTitle/>
    </div>
  )
}
export default QuestionBankQuestions;