import React, { useState, useEffect } from 'react';
import types from '../utils/types';

function TranslationRow({
  translateKey,
  translateValue,
  editableKey,
  handleEdit,
  fileName,
  file,
  changes,
  languageId,
  dispatch,
}) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(translateValue);
  }, [file]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const changedObject = { ...file, [translateKey]: inputValue };

      dispatch({
        type: types.SET_ACTIVE_FILES,
        payload: { fileName, obj: changedObject },
      });
      dispatch({
        type: types.CHANGE_LANGUAGE,
        payload: { languageId, fileName, uploadedFile: changedObject },
      });
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [inputValue]);

  const applyClass = (key) => {
    if (changes.removed.includes(key)) {
      return 'changes changes-removed';
    }

    if (changes.modified.includes(key)) {
      return 'changes changes-modify';
    }

    if (changes.added.includes(key)) {
      return 'changes changes-add';
    }

    return 'changes';
  };

  return (
    <li
      className={applyClass(translateKey)}
      onClick={() => handleEdit(translateKey)}
    >
      <span>{`${translateKey}: `}</span>
      {!editableKey ? (
        <span>{`${translateValue}`}</span>
      ) : (
        <input
          onChange={(e) => setInputValue(e.target.value)}
          name={translateKey}
          value={inputValue || ''}
          autoFocus={true}
          type="text"
        />
      )}
    </li>
  );
}

export default TranslationRow;
