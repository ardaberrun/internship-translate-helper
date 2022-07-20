import { ReactComponent as FileUploadLogo } from '../assets/upload.svg';

function FileInput({ file, title, onChange }) {
  return (
    <div className="file-input">
      <input type="file" name={file} id={file} className="file-input__input" onChange={onChange} />
      <label for={file}>
        <FileUploadLogo />
        {title}
      </label>
    </div>
  );
}

export default FileInput;
