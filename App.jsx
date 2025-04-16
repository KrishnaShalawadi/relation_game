import React, { useState } from 'react';

const generateRandomRelation = (setSize) => {
  const relation = [];
  for (let i = 0; i < setSize; i++) {
    for (let j = 0; j < setSize; j++) {
      if (Math.random() > 0.5) {
        relation.push([i, j]);
      }
    }
  }
  return relation;
};

const isReflexive = (relation, setSize) => {
  for (let i = 0; i < setSize; i++) {
    if (!relation.some(([a, b]) => a === i && b === i)) {
      return false;
    }
  }
  return true;
};

const isSymmetric = (relation) => {
  return relation.every(([a, b]) => 
    a === b || relation.some(([c, d]) => c === b && d === a)
  );
};

const isTransitive = (relation) => {
  return relation.every(([a, b]) => 
    relation.every(([c, d]) => 
      !(b === c) || relation.some(([e, f]) => e === a && f === d)
    )
  );
};

const RelationGame = () => {
  const [setSize] = useState(4); // Fixed set size for simplicity
  const [relation, setRelation] = useState(() => generateRandomRelation(setSize));
  const [userAnswers, setUserAnswers] = useState({ reflexive: false, symmetric: false, transitive: false });
  const [message, setMessage] = useState("");

  const handleCheck = () => {
    const correctAnswers = {
      reflexive: isReflexive(relation, setSize),
      symmetric: isSymmetric(relation),
      transitive: isTransitive(relation),
    };

    const isCorrect =
      userAnswers.reflexive === correctAnswers.reflexive &&
      userAnswers.symmetric === correctAnswers.symmetric &&
      userAnswers.transitive === correctAnswers.transitive;

    if (isCorrect) {
      setMessage("Correct! Great job.");
    } else {
      setMessage("Incorrect. Please try again!");
    }
  };

  const handleNewGame = () => {
    setRelation(generateRandomRelation(setSize));
    setUserAnswers({ reflexive: false, symmetric: false, transitive: false });
    setMessage("");
  };

  const handleCheckboxChange = (property) => {
    setUserAnswers((prev) => ({ ...prev, [property]: !prev[property] }));
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <h1 className="text-xl font-bold">Relation Properties Game</h1>
      <div className="w-full max-w-md border rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold">Current Relation:</h2>
        <ul>
          {relation.map(([a, b], index) => (
            <li key={index}>{`(${a}, ${b})`}</li>
          ))}
        </ul>
        <div className="mt-4 space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={userAnswers.reflexive}
              onChange={() => handleCheckboxChange('reflexive')}
            />
            <span>Reflexive</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={userAnswers.symmetric}
              onChange={() => handleCheckboxChange('symmetric')}
            />
            <span>Symmetric</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={userAnswers.transitive}
              onChange={() => handleCheckboxChange('transitive')}
            />
            <span>Transitive</span>
          </label>
        </div>
      </div>
      <div className="space-x-4">
        <button onClick={handleCheck} className="px-4 py-2 bg-blue-500 text-white rounded">Submit Answer</button>
        <button onClick={handleNewGame} className="px-4 py-2 bg-gray-500 text-white rounded">New Game</button>
      </div>
      {message && <p className="text-center mt-4 text-lg font-medium">{message}</p>}
    </div>
  );
};

export default RelationGame;
