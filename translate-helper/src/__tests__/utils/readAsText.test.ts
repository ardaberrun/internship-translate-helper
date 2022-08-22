import readAsText from '../../utils/readAsText';

class FileReaderMock {
  DONE = FileReader.DONE;
  EMPTY = FileReader.EMPTY;
  LOADING = FileReader.LOADING;
  readyState = 0;
  error: FileReader['error'] = null;
  result: FileReader['result'] = null;
  abort = jest.fn();
  addEventListener = jest.fn();
  dispatchEvent = jest.fn();
  onabort = jest.fn();
  onerror = jest.fn();
  onload = jest.fn();
  onloadend = jest.fn();
  onloadprogress = jest.fn();
  onloadstart = jest.fn();
  onprogress = jest.fn();
  readAsArrayBuffer = jest.fn();
  readAsBinaryString = jest.fn();
  readAsDataURL = jest.fn();
  readAsText = jest.fn();
  removeEventListener = jest.fn();
}

describe('readAsText()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve file as text', async () => {
    const file = new File([new ArrayBuffer(1)], 'oldFile.json');
    const fileReader = new FileReaderMock();
    jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

    fileReader.result = 'file content';
    fileReader.addEventListener.mockImplementation((_, fn) => fn());

    const content = await readAsText(file);

    expect(content).toBe('file content');
    expect(fileReader.readAsText).toHaveBeenCalledTimes(1);
    expect(fileReader.readAsText).toHaveBeenCalledWith(file, 'UTF-8');
  });
});
