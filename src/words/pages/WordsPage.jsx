import React, { useState } from 'react';

import WordForm from 'words/components/WordForm';

const WordsPage = () => {
  const [wordToEdit, setWordToEdit] = useState(null);

  return (
    <>
      <section className="section">
        <WordForm
          wordId={wordToEdit}
          setWordToEdit={setWordToEdit}
        />
      </section>
    </>
  );
};

export default WordsPage;
