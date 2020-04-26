import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import WordForm from 'words/components/WordForm';

const WordsPage = () => {
  const { t } = useTranslation();
  const [wordToEdit, setWordToEdit] = useState(4);

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
