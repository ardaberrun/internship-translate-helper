import { useEffect, useState, useReducer, useMemo } from 'react';
import Translation from './components/Translation';
import reducer from './utils/reducer';
import types from './utils/types';

const initialState = {
  languages: [
    {
      id: '1',
      languageId: {
        current: 'en',
        error: false,
        errorMessage: ''
      },
      files: { oldFile: {}, newFile: {} },
    },
  ],
  activeFiles: { oldFile: {}, newFile: {} },
  activeLanguage: '1',
};

function App() {
  const [fileState, dispatch] = useReducer(reducer, initialState);
  const [changes, setChanges] = useState({
    removed: [],
    modified: [],
    added: [],
  });

  // useEffect(() => {
  //   localStorage.setItem('fileState', JSON.stringify(fileState));
  // }, [fileState]);

  useEffect(() => {
    setChanges({
      removed: [],
      modified: [],
      added: [],
    });

    dispatch({ type: types.CHANGE_ACTIVE_FILES });

    // localStorage.setItem('activeLanguage', activeLanguage);
  }, [fileState.activeLanguage]);

  const missingKeys = useMemo(() => {
    const activeFileKeys = Object.keys(fileState.activeFiles.newFile);
    const allKeys = fileState.languages.map(language => Object.keys(language.files.newFile)).flat();

    return [...new Set(allKeys.filter(key => !activeFileKeys.includes(key)))];
  }, [fileState.activeFiles.newFile]);

  const compareFiles = () => {
    const { oldFile, newFile } = fileState.activeFiles;

    if (!Object.keys(oldFile).length || !Object.keys(newFile).length) return;

    const allFiles = { ...oldFile, ...newFile };
    const changesObj = Object.keys(allFiles).reduce(
      (acc, key) => {
        if (newFile[key] === undefined) {
          acc.removed.push(key);
        } else if (oldFile[key] === undefined) {
          acc.added.push(key);
        } else {
          if (oldFile[key] !== newFile[key]) {
            acc.modified.push(key);
          }
        }

        return acc;
      },
      { removed: [], modified: [], added: [] }
    );

    setChanges(changesObj);
  };

  const handleChange = (event, languageId) => {
    setChanges({ removed: [], modified: [], added: [] });

    const fileName = event.target.name;

    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const obj = JSON.parse(e.target.result);

      if (fileState.activeLanguage === languageId) {
        dispatch({
          type: types.SET_ACTIVE_FILES,
          payload: { fileName, obj },
        });
      }

      dispatch({
        type: types.CHANGE_LANGUAGE,
        payload: { languageId, fileName, uploadedFile: obj },
      });
    };
  };

  return (
    <div className="container">
      <div className="translation_container">
        <Translation
          file={fileState.activeFiles.oldFile}
          changes={changes}
          fileState={fileState}
          dispatch={dispatch}
          handleChange={handleChange}
          fileType="old"
        />
        <Translation
          file={fileState.activeFiles.newFile}
          changes={changes}
          fileState={fileState}
          dispatch={dispatch}
          handleChange={handleChange}
          fileType="new"
          missingKeys={missingKeys}
        />
      </div>
      <button
        className="btn"
        onClick={compareFiles}
        disabled={
          !Object.keys(fileState.activeFiles.oldFile).length ||
          !Object.keys(fileState.activeFiles.newFile).length
        }
      >
        Compare
      </button>
    </div>
  );
}

export default App;
