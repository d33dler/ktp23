import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./MultiStepProgressBar.css";

export const MultiStepProgressBar = (props) => {
  const { questions } = props;
  const qsLength = questions?.length || 0;

  return (
    <ProgressBar
    percent={((props.step - 1) * 100) / qsLength}
    filledBackground="indigo"
  >
    {questions.map((question, index) => (
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
             className={`step ${accomplished ? "completed" : null}`}
            key={index}
          >
            {index + 1}
          </div>
        )}
      </Step>
    ))}

  </ProgressBar>
  )
};


// <Step transition="scale">
// {({ accomplished, index }) => (
//   <div
//     className={`step ${accomplished ? "completed" : null}`}
//   >
//     1
//   </div>
// )}
// </Step>
// <Step transition="scale">
// {({ accomplished, index }) => (
//   <div
//     className={`step ${accomplished ? "completed" : null}`}
//   >
//     2
//   </div>
// )}
// </Step>
// <Step transition="scale">
// {({ accomplished, index }) => (
//   <div
//     className={`step ${accomplished ? "completed" : null}`}
//   >
//     3
//   </div>
// )}
// </Step>