import React, { useEffect, useState, useReducer } from 'react';
import reducer, { initialState } from './utils/reducer';
import types from './utils/types';
import Content from './components/Content';

type ChangeState = {
  removed: string[];
  modified: string[];
  added: string[];
};

function App() {
  const [fileState, dispatch] = useReducer(reducer, initialState, () => {
    const localState = localStorage.getItem('fileState');
    return localState ? JSON.parse(localState) : initialState;
  });

  const [changes, setChanges] = useState<ChangeState>({
    removed: [],
    modified: [],
    added: [],
  });

  useEffect(() => {
    setChanges({ removed: [], modified: [], added: [] });

    localStorage.setItem('fileState', JSON.stringify(fileState));
  }, [fileState]);

  useEffect(() => {
    dispatch({ type: types.CHANGE_ACTIVE_FILES });

    localStorage.setItem('activeLanguage', fileState.activeLanguage);
  }, [fileState.activeLanguage]);

  return (
    <Content
      fileState={fileState}
      dispatch={dispatch}
      changes={changes}
      setChanges={setChanges}
    />
  );
}

export default App;
