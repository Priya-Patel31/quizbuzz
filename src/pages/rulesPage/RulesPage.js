import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Header } from "../../shared/header/Header";
import { Sidebar } from "../../shared/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { QuizImageDetails } from "../../shared/quizImageDetail/QuizImageDetails";
import { useQuiz } from "../../context/quizContext/QuizContext";
import "./rulesPage.css";

export const RulesPage = () => {
  const location = useLocation();
  const { getQuizById } = useQuiz();
  let params = useParams();
  useEffect(() => {
    (async function () {
      const success = await getQuizById(params.id);
      if (success) {
        //TOAST 
      }
    })();
  },[ params]);

  return (
    <div className="rules-page-container">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="main-content-container flex-col p-2 m-2">
          <h2 className="pt-2 font-bold">Quiz on {location.state.name}</h2>
          <p className="my-2">Read the following instructions</p>
          <QuizImageDetails />
          <div>
            <h2 className="my-2 font-bold">Instructions</h2>
            <p className="font-medium">
              This quiz consists of 5 multiple choice questions. To be
              successful with the quizzes,it's important to be conversant with
              the topics. Keep the following in mind. <br />
              <br />
              Timing - You need to complete each attempt in one sitting ,as you
              are alloted 30 minutes to each attempt.
              <br />
              <br />
              Answers - You may review your answer-choices and compare them to
              the correct answer after your final attempt.
              <br />
              <br />
              To start click the "Start" button and when finished click on
              "Submit" button.
            </p>
            <br />
            <Link
              to="/questions_page"
              className="button start-button my-2 font-semibold"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
