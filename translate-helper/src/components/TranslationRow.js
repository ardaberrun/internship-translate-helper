import React, { useState, useEffect } from 'react';

function TranslationRow({
  translateKey,
  translateValue,
  editableKey,
  handleEdit,
  setFiles,
  fileName,
  file,
  changes
}) {
  const [inputValue, setInputValue] = useState(translateValue);

  useEffect(() => {
    if(inputValue !== translateValue) {
      const debounce = setTimeout(() => { 
        const changedObject = {...file, [translateKey]: inputValue};

        setFiles((prev) => ({ ...prev, [fileName]: changedObject }));
        localStorage.setItem(fileName, JSON.stringify(changedObject));
      }, 500);
  
      return () => {
        clearTimeout(debounce);
      };
    }
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
    <div className={applyClass(translateKey)} onClick={() => handleEdit(translateKey)}>
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
    </div>
  );
}

export default TranslationRow;
