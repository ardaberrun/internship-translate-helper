import { useState } from 'react';
import Translation from './components/Translation';

function App() {
  const [files, setFiles] = useState({
    oldFile: JSON.parse(localStorage.getItem('oldFile')) || {},
    newFile: JSON.parse(localStorage.getItem('newFile')) || {},
  });
  const [changes, setChanges] = useState({
    removed: [],
    modified: [],
    added: [],
  });

  const compareFiles = () => {
    const { oldFile, newFile } = files;

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

  const handleChange = (event) => {
    setChanges({ removed: [], modified: [], added: [] });

    const fileName = event.target.name;

    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      localStorage.setItem(fileName, e.target.result);

      const obj = JSON.parse(e.target.result);
      setFiles({ ...files, [fileName]: obj });
    };
  };

  return (
    <div className="container">
      <div className="translation_container">
        <Translation
          changes={changes}
          file={files.oldFile}
          handleChange={handleChange}
          fileType="old"
        />
        <Translation
          changes={changes}
          file={files.newFile}
          handleChange={handleChange}
          fileType="new"
        />
      </div>
      <button className="btn" onClick={compareFiles}>
        Compare
      </button>
    </div>
  );
}

export default App;
