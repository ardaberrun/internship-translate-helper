import FileInput from './components/FileInput';

function App() {
  return (
    <div className="container">
      <div className="translate_zone">
        <FileInput file="oldFile" title="Upload Old File" />
        <FileInput file="newFile" title="Upload New File" />
      </div>
    </div>
  );
}

export default App;
