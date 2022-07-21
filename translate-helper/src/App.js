import { useState } from 'react';
import FileInput from './components/FileInput';

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
    const fileName = event.target.name;

    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      localStorage.setItem(fileName, e.target.result);

      const obj = JSON.parse(e.target.result);
      setFiles({ ...files, [fileName]: obj });
    };
  };

  const applyClass = (key) => {
    if (changes.modified.includes(key)) {
      return 'changes-modify';
    }

    if (changes.added.includes(key)) {
      return 'changes-add';
    }

    return '';
  };

  const showFileContent = (file) => {
    return (
      <div className="translate">
        {Object.keys(file).map((key, i) => (
          <span
            className={applyClass(key)}
            key={`${key}-${i}`}
          >{`"${key}": "${file[key]}"`}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="translate_zone">
        {!Object.keys(files.oldFile).length ? (
          <FileInput
            file="oldFile"
            title="Upload Old File"
            onChange={handleChange}
          />
        ) : (
          showFileContent(files.oldFile)
        )}
        {!Object.keys(files.newFile).length ? (
          <FileInput
            file="newFile"
            title="Upload New File"
            onChange={handleChange}
          />
        ) : (
          showFileContent(files.newFile)
        )}
      </div>
      <button className="btn" onClick={compareFiles}>
        Compare
      </button>
    </div>
  );
}

export default App;
