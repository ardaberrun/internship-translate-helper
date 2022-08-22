import React, { useMemo } from 'react';
import Translation from './Translation';
import { FileState } from '../utils/reducer';

type ContentProps = {
  fileState: FileState;
  dispatch: React.Dispatch<any>;
  changes: { removed: string[]; modified: string[]; added: string[] };
  setChanges: React.Dispatch<
    React.SetStateAction<{
      removed: string[];
      modified: string[];
      added: string[];
    }>
  >;
};

function Content({ fileState, dispatch, changes, setChanges }: ContentProps) {
  const missingKeys: string[] = useMemo(() => {
    const activeFileKeys = Object.keys(fileState.activeFiles.newFile);
    const allKeys = fileState.languages
      .map((language) => Object.keys(language.files.newFile))
      .flat();

    return [...new Set(allKeys.filter((key) => !activeFileKeys.includes(key)))];
  }, [fileState.activeFiles.newFile, fileState.languages]);

  const compareFiles = () => {
    const { oldFile, newFile } = fileState.activeFiles;

    const allFiles = { ...oldFile, ...newFile };
    const changesObj = Object.keys(allFiles).reduce<{
      removed: string[];
      modified: string[];
      added: string[];
    }>(
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

  return (
    <div className="container">
      <div className="translation_container">
        <Translation
          file={fileState.activeFiles.oldFile}
          changes={changes}
          fileState={fileState}
          dispatch={dispatch}
          fileType="old"
        />
        <Translation
          file={fileState.activeFiles.newFile}
          changes={changes}
          fileState={fileState}
          dispatch={dispatch}
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

export default Content;
