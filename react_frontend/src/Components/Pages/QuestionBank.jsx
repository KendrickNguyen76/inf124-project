import React from "react";
import { useNavigate } from 'react-router-dom';
import "./QuestionBank.css";

const QuestionBankTitle = () => (
    <div className = "question_bank_container">
      <h1> Byte Me Practice Mode </h1>
      <p> Select a category below to begin honing your coding skills </p>
    </div>
  )

const QuestionCategories = () =>
{
  const navigate = useNavigate();
  return(
    <div className = "category_section">
      <button className = "category_1" onClick = {() => navigate("/gamepage")}>
        Algorithms
      </button>
      <button className = "category_2" onClick = {() => navigate("/gamepage")}>
        Data Structures
      </button>
      <button className = "category_3" onClick = {() => navigate("/gamepage")}>
        Databases
      </button>
      <button className = "category_4" onClick = {() => navigate("/gamepage")}>
        System Design
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