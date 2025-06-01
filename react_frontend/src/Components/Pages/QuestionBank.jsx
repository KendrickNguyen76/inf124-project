import React from "react";
import { useNavigate } from 'react-router-dom';
import "./QuestionBank.css";

const QuestionBankTitle = () => (
    <div className = "question_bank_container">
      <h1> Byte Me Practice Mode </h1>
      <p> Select a difficulty level below to begin honing your coding skills </p>
    </div>
  )

const QuestionCategories = () =>
{
  const navigate = useNavigate();
  return(
    <div className = "category_section">
      <button className = "category_1" onClick = {() => navigate("/questionbankquestions")}>
        Easy
      </button>
      <button className = "category_2" onClick = {() => navigate("/questionbankquestions")}>
        Medium
      </button>
      <button className = "category_3" onClick = {() => navigate("/questionbankquestions")}>
        Hard
      </button>
    </div>
  );
}

const QuestionBank = () => {
  return(
    <div className = "question_bank_categories">
      <QuestionBankTitle/>
      <QuestionCategories/>
    </div>
  )
}
export default QuestionBank;