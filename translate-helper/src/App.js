import { useState } from 'react';
import FileInput from './components/FileInput';

function App() {
  const [files, setFiles] = useState({
    oldFile: {},
    newFile: {},
  });

  const handleChange = (e) => {
    const fileName = e.target.name;

    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const obj = JSON.parse(e.target.result);

      setFiles({ ...files, [fileName]: obj });
    };
  };

  const showFileContent = (file) => {
    return (
      <div className="translate">
        {Object.keys(file).map((key, i) => (
          <span key={`${key}-${i}`}>{`"${key}": "${file[key]}"`}</span>
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
    </div>
  );
}

export default App;
