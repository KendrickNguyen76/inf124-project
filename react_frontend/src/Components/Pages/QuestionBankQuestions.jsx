import React from "react";
import { useNavigate } from 'react-router-dom';
import "./QuestionBankQuestions.css";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

const QuestionBankQuestionsTitle = () => (
    <div className = "question_bank_question_title">
      <h1> Byte Me Practice Mode </h1>
      <p> Select the question you would like to practice solving</p>
    </div>
  )

/*figure out how to call the previous state of question set in here */
const QuestionsCall = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const difficulty = location.state?.difficulty || 'easy';

  console.log("Difficulty passed:", difficulty);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${API_URL}/questionDiff?difficulty=${difficulty}`);
        const data = await res.json();

         console.log('Received questions:', data);

        setQuestions(data);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  
return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="scroll-table">
          <table className="question-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {questions.length > 0 ? (
                questions.map((q) => (
                  <tr
                    key={q.id}
                    className="clickable-row"
                    onClick={() =>
                      navigate("/gamepage", {
                        state: {
                          question_id: q.id,
                          question_name: q.name,
                          question_example: q.example,
                          question_description: q.description,
                          question_category: q.category,
                          question_difficulty: q.difficulty,
                        },
                      })
                    }
                    
                  >
                    
                    <td>{q.name}</td>
                    <td>{q.description}</td>
                    <td>{q.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No questions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const QuestionBankQuestions = () => {

  return(
    <div className = "question_bank_questions_cat">
      <QuestionBankQuestionsTitle/>
      <QuestionsCall/>
    </div>
  )
}
export default QuestionBankQuestions;