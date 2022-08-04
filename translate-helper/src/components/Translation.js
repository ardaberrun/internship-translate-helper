import React, { useState } from 'react';
import TranslationRow from './TranslationRow';
import FileUploader from './FileUploader';
import types from '../utils/types';
import { ReactComponent as ErrorIcon } from '../assets/error.svg';

function Translation({
  file,
  fileType,
  handleChange,
  changes,
  fileState,
  dispatch,
  missingKeys,
}) {
  const [editableKey, setEditableKey] = useState('');
  const [toggle, setToggle] = useState(false);
  const { languages, activeLanguage } = fileState;

  const isError = languages.find((language) => language.id === activeLanguage)
    ?.languageId.error;

  const handleEdit = (key) => {
    setEditableKey(key);
    // setChanges({removed: [], modified: [], added: []});
  };

  const addLanguage = () => {
    dispatch({ type: types.ADD_LANGUAGE });
    dispatch({ type: types.CHECK_LANGUAGE_ID });
  };

  const removeLanguage = (newLanguageId, languageId) => {
      dispatch({ type: types.REMOVE_LANGUAGE, payload: { languageId } });

      if(activeLanguage === languageId) {
        dispatch({
          type: types.SET_ACTIVE_LANGUAGE,
          payload: newLanguageId,
        });
      }

  };

  const handleInputChange = (e, id) => {
    dispatch({
      type: types.CHANGE_LANGUAGE_ID,
      payload: { id, value: e.target.value },
    });

    dispatch({ type: types.CHECK_LANGUAGE_ID });
  };

  const addMissingKey = (missingKey) => {
    dispatch({
      type: types.SET_ACTIVE_FILES,
      payload: { fileName: 'newFile', obj: { ...file, [missingKey]: '' } },
    });
  };

  return (
    <div className="translation">
      <div className="translation__header">
        <h2>{fileType} File</h2>
        {languages.map((language, i) => (
          <div key={language.id} className="translation__header-buttons">
            {fileType === 'old' && (
              <>
                {languages.length - 1 === i && (
                  <button className="btn-add" onClick={addLanguage}>
                    +
                  </button>
                )}
                <input
                  name="langs"
                  id={language.id}
                  type="radio"
                  checked={language.id === activeLanguage}
                  onChange={(e) => {
                    dispatch({
                      type: types.SET_ACTIVE_LANGUAGE,
                      payload: e.target.id,
                    });
                    setEditableKey('');
                  }}
                />
                <input
                  className={language.languageId.error ? 'error' : ''}
                  type="text"
                  value={language.languageId.current}
                  onChange={(e) => handleInputChange(e, language.id)}
                />
                {language.languageId.error && (
                  <span>{language.languageId.errorMessage}</span>
                )}
              </>
            )}
            <FileUploader
              fileName={`${fileType.toLowerCase()}File`}
              onChange={handleChange}
              uploadType="button"
              title={`${
                Object.keys(language.files[`${fileType.toLowerCase()}File`])
                  .length
                  ? 'Change'
                  : 'Upload'
              } ${fileType} File`}
              languageId={language.id}
            />
            <a
              download={`${fileType.toLowerCase()}File.json`}
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(file)
              )}`}
              className="btn btn-download"
            >
              Download
            </a>
            {fileType === 'new' &&  languages.length > 1 && (
              <button
                className="btn-remove"
                onClick={() =>
                  removeLanguage(
                    languages[i-1]?.id || languages[i+1]?.id,
                    language.id
                  )
                }
              >
                x
              </button>
            )}
          </div>
        ))}
        <div className="toggle">
          <span>Show Empty Translations</span>
          <label className="switch">
            <input type="checkbox" onClick={() => setToggle(!toggle)} />
            <span className="slider round" />
          </label>
        </div>
      </div>
      {isError ? (
        <div className="translation__body error">
          <ErrorIcon />
          Error!
        </div>
      ) : !Object.keys(file).length ? (
        <div className="translation__body p-0">
          <FileUploader
            fileName={`${fileType.toLowerCase()}File`}
            onChange={handleChange}
            uploadType="icon"
            title={`Upload ${fileType} File`}
            languageId={activeLanguage}
          />
        </div>
      ) : toggle ? (
        <ul className="translation__body">
          {Object.keys(file)
            .filter((key) => !file[key])
            .map((key, i) => (
              <TranslationRow
                key={`${key}-${i}`}
                translateKey={key}
                translateValue={file[key]}
                changes={changes}
                editableKey={editableKey === key}
                handleEdit={handleEdit}
                fileName={`${fileType.toLowerCase()}File`}
                file={file}
                languageId={activeLanguage}
                dispatch={dispatch}
              />
            ))}
        </ul>
      ) : (
        <ul className="translation__body">
          {fileType === 'new' &&
            missingKeys.map((key) => (
              <li className="translation__body-missing-key">
                <span>{key}:</span>
                <button className="btn-add" onClick={() => addMissingKey(key)}>
                  +
                </button>
              </li>
            ))}
          {Object.keys(file).map((key, i) => (
            <TranslationRow
              key={`${key}-${i}`}
              translateKey={key}
              translateValue={file[key]}
              changes={changes}
              editableKey={editableKey === key}
              handleEdit={handleEdit}
              fileName={`${fileType.toLowerCase()}File`}
              file={file}
              languageId={activeLanguage}
              dispatch={dispatch}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Translation;
