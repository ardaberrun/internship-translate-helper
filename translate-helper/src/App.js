import { useState } from 'react';
import Translation from './components/Translation';

function App() {
  const [files, setFiles] = useState({
    oldFile: JSON.parse(localStorage.getItem('oldFile')) || {},
    newFile: JSON.parse(localStorage.getItem('newFile')) || {},
  });
  const [changes, setChanges] = useState({
    modified: [],
    added: [],
  });

  const compareFiles = () => {
    const { oldFile, newFile } = files;

    if (!Object.keys(oldFile).length || !Object.keys(newFile).length) return;

    const changesObj = Object.keys(newFile).reduce(
      (acc, curr) => {
        if (oldFile[curr] !== undefined) {
          if (oldFile[curr] !== newFile[curr]) {
            acc.modified.push(curr);
          }
        } else {
          acc.added.push(curr);
        }

        return acc;
      },
      { modified: [], added: [] }
    );

    setChanges(changesObj);
  };

  const handleChange = (event) => {
    setChanges({ modified: [], added: [] });

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
