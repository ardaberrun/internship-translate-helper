import React from 'react';
import FileUploader from './FileUploader';

function Translation({ file, fileType, handleChange, changes }) {
  const applyClass = (key) => {
    if (changes.removed.includes(key)) {
      return 'changes-removed';
    }
    
    if (changes.modified.includes(key)) {
      return 'changes-modify';
    }

    if (changes.added.includes(key)) {
      return 'changes-add';
    }

    return '';
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
        <FileUploader
          fileName={`${fileType.toLowerCase()}File`}
          fileType={fileType}
          onChange={handleChange}
          uploadType="change"
        />
      </div>
      <div className="translation__body">
        {Object.keys(file).map((key, i) => (
          <span
            className={applyClass(key)}
            key={`${key}-${i}`}
          >{`${key}: ${file[key]}`}</span>
        ))}
      </div>
    </div>
  );
}

export default Translation;
