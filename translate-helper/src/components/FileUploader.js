import { ReactComponent as FileUploadLogo } from '../assets/upload.svg';

function FileUploader({ fileName, fileType, onChange, uploadType }) {
  return uploadType === 'first' ? (
    <div className="file-uploader upload-first">
      <input
        type="file"
        name={fileName}
        id={fileName}
        className="file-uploader__input"
        onChange={onChange}
      />
      <label className="file-uploader__label label-upload-first" htmlFor={fileName}>
        <FileUploadLogo />
        Upload {fileType} File
      </label>
    </div>
  ) : (
    <div className="file-uploader">
      <input
        type="file"
        name={fileName}
        id={fileName}
        className="file-uploader__input"
        onChange={onChange}
      />
      <label
        className="btn file-uploader__label label-upload-change"
        htmlFor={fileName}
      >
        Change {fileType} File
      </label>
    </div>
  );
}

export default FileUploader;
