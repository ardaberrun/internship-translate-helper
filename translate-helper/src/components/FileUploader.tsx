import React, { ChangeEvent } from 'react';
import {ReactComponent as FileUploadIcon} from '../assets/upload.svg';
import readAsText from '../utils/readAsText';
import types from '../utils/types';

type FileUploaderProps = {
  fileName: string;
  uploadType: 'button' | 'icon';
  title: string;
  languageId: string;
  activeLanguage: string;
  dispatch: React.Dispatch<any>;
}

function FileUploader({ fileName, uploadType, title, languageId, activeLanguage, dispatch }: FileUploaderProps) {
  const handleChange = async (event: ChangeEvent) => {
    const fileName: string = (event.target as HTMLInputElement).name;

    const result = await readAsText(
      (event.target as HTMLInputElement).files![0]
    );
    const obj = JSON.parse(result);

    if (activeLanguage === languageId) {
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

  return (
    <div className={`file-uploader ${uploadType === 'icon' && 'upload-icon'}`}>
      <input
        type="file"
        name={fileName}
        id={`${languageId}-${fileName}`}
        className="file-uploader__input"
        onChange={handleChange}
        accept="application/json"
      />
      <label
        className={`file-uploader__label label-upload-${
          uploadType === 'icon' ? 'icon' : 'button btn'
        }`}
        htmlFor={`${languageId}-${fileName}`}
      >
        {uploadType === 'icon' && <FileUploadIcon data-testid="upload-icon-svg" />}
        {title}
      </label>
    </div>
  );
}

export default FileUploader;
