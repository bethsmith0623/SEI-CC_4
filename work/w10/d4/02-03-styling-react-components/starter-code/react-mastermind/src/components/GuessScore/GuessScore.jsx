import React from 'react';

const GuessScore = ({ score }) => {
  let scores = ('P'.repeat(score.perfect) + 'A'.repeat(score.almost) +
    'I'.repeat(4 - score.perfect - score.almost)).split('');
  return (
    <div>
      {scores.map((score, idx) => <div key={idx}>{score}</div>)}
    </div>
  );
}

export default GuessScore;
