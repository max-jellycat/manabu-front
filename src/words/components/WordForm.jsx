import React, { useCallback, useEffect } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import languageIcon from '@iconify/icons-ion/language';
import textIcon from '@iconify/icons-ion/text';
import addCircle from '@iconify/icons-ion/add-circle';
import pricetagIcon from '@iconify/icons-ion/pricetag';

import useAlert from 'common/contexts/alerts';
import useAuth from 'common/contexts/auth';
import useWord from 'words/contexts/words';
import useTag from 'words/contexts/tags';
import FormInput from 'common/components/FormInput/FormInput';
import TagSelect from './TagSelect';

const WordForm = ({ wordId, setWordToEdit }) => {
  const { t } = useTranslation();
  const { setAlert } = useAlert();
  const { user } = useAuth();
  const {
    save, update, fetchItem: fetchWord, setItem: setWord, item: word,
  } = useWord();
  const { fetchItems: fetchTags, save: saveTags } = useTag();

  useEffect(() => { wordId && fetchWord(wordId); }, [fetchWord, wordId]);

  const onSubmit = useCallback(async (data) => {
    const word = { ...data };
    if (word.id) {
      const res = await update(word.id, word);

      if (!res.error) {
        setWord(null);
        setWordToEdit(null);
        setAlert(t('words.successEdit', { word: word.native }), 'success');
      } else {
        setAlert(res.message, 'success');
      }
    } else {
      console.log(data);
      const newWord = {
        ...data,
        user: user.id,
        tags: data.tags.map((t) => t.value),
      };
      const res = await save(newWord);
      console.log(res);

      if (!res.error) {
        setAlert(t('words.successAdd', { word: word.native }), 'success');
      } else {
        setAlert(res.message, 'success');
      }
    }
  }, [update, save, setAlert, t]);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={word?.id ? {
        ...word,
        tags: word.tags.map((t) => ({ label: t.label, value: t.id })),
      } : { tags: [] }}
      render={({
        handleSubmit, submitting, pristine, values, form,
      }) => (
        <form onSubmit={(event) => handleSubmit(event).then(() => {
          !word && Object.keys(values).forEach((key) => {
            form.change(key, null);
            form.resetFieldState(key);
          });
        })}
        >
          <FormInput
            name="native"
            placeholder={t('words.native')}
            icon={textIcon}
            required
          />
          <FormInput
            name="furigana"
            placeholder={t('words.furigana')}
            icon={languageIcon}
            required
          />
          <FormInput
            name="kanji"
            placeholder={t('words.kanji')}
            icon={languageIcon}
          />
          <FormInput
            name="roumaji"
            icon={textIcon}
            placeholder={t('words.roumaji')}
            required
          />
          <FormInput
            type="custom"
            name="tags"
            icon={pricetagIcon}
            placeholder={t('words.tags')}
          >
            <TagSelect fetchItems={fetchTags} save={saveTags} />
          </FormInput>
          <FormInput
            type="submit"
            placeholder={t(`words.${word && word.id ? 'edit' : 'add'}Word`)}
            icon={addCircle}
            disabled={submitting || pristine}
          />
        </form>
      )}
    />
  );
};

WordForm.propTypes = {
  wordId: PropTypes.number,
  setWordToEdit: PropTypes.func.isRequired,
};

WordForm.defaultProps = {
  wordId: null,
};

export default WordForm;
