import React, { useState, useEffect } from 'react';
import types from '../utils/types';

type TranslationRowProps = {
  translateKey: string;
  translateValue: string;
  editableKey: boolean;
  handleEdit: (key: string) => void;
  fileName: string;
  file: { [key: string]: string };
  changes: { removed: string[], modified: string[], added: string[] };
  languageId: string;
  dispatch: React.Dispatch<any>;
}

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
}: TranslationRowProps) {
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

  const applyClass = (key: string) => {
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
      data-testid="translation-row-list-item"
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
          data-testid="editable-key"
        />
      )}
    </li>
  );
}

export default TranslationRow;
