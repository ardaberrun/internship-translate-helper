import { ChangeEvent } from 'react';
import {ReactComponent as FileUploadIcon} from '../assets/upload.svg';

type FileUploaderProps = {
  fileName: string;
  onChange: (event: ChangeEvent, languageId: string) => void;
  uploadType: 'button' | 'icon';
  title: string;
  languageId: string;
}

function FileUploader({ fileName, onChange, uploadType, title, languageId }: FileUploaderProps) {
  return (
    <div className={`file-uploader ${uploadType === 'icon' && 'upload-icon'}`}>
      <input
        type="file"
        name={fileName}
        id={`${languageId}-${fileName}`}
        className="file-uploader__input"
        onChange={(e) => onChange(e, languageId)}
      />
      <label
        className={`file-uploader__label label-upload-${
          uploadType === 'icon' ? 'icon' : 'button btn'
        }`}
        htmlFor={`${languageId}-${fileName}`}
      >
        {uploadType === 'icon' && <FileUploadIcon />}
        {title}
      </label>
    </div>
  );
}

export default FileUploader;
