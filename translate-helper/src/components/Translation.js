import React, { useState, useEffect } from 'react';
import TranslationRow from './TranslationRow';
import FileUploader from './FileUploader';

function Translation({ file, fileType, handleChange, changes, setFiles }) {
  const [editableKey, setEditableKey] = useState('');
  const [filterFile, setFilterFile] = useState(file);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (!editableKey) setFilterFile(file);
  }, [file, editableKey]);

  useEffect(() => {
    if (toggle) {
      const filterObject = Object.fromEntries(
        Object.entries(file).filter(([_, value]) => !value)
      );
      
      setFilterFile(filterObject);
    } else {
      setFilterFile(file);
    }
  }, [toggle]);

  const handleEdit = (key) => {
    setEditableKey(key);
    // setChanges({removed: [], modified: [], added: []});
  };

  return !Object.keys(file).length ? (
    <FileUploader
      fileName={`${fileType.toLowerCase()}File`}
      onChange={handleChange}
      uploadType="first"
      fileType={fileType}
    />
  ) : (
    <div className="translation">
      <div className="translation__header">
        <h2>{fileType} File</h2>
        <div className="translation__header-buttons">
          <FileUploader
            fileName={`${fileType.toLowerCase()}File`}
            fileType={fileType}
            onChange={handleChange}
            uploadType="change"
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
        </div>
        <div className="toggle">
          <span>Show Empty Translations</span>
          <label className="switch">
            <input type="checkbox" onClick={() => setToggle(!toggle)} />
            <span className="slider round" />
          </label>
        </div>
      </div>
      <div className="translation__body">
        {Object.keys(filterFile).map((key, i) => (
          <TranslationRow
            key={`${key}-${i}`}
            translateKey={key}
            translateValue={file[key]}
            changes={changes}
            editableKey={editableKey === key}
            handleEdit={handleEdit}
            setFiles={setFiles}
            fileName={`${fileType.toLowerCase()}File`}
            file={file}
          />
        ))}
      </div>
    </div>
  );
}

export default Translation;
