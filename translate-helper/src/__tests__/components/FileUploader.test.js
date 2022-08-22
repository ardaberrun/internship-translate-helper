import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileUploader from '../../components/FileUploader';

describe('FileUploader Component', () => {
  it('should be render correctly', () => {
    render(<FileUploader />);
  });

  it('should be icon render correctly', () => {
    render(<FileUploader uploadType="icon" />);

    expect(screen.getByTestId('upload-icon-svg')).toBeInTheDocument();
  });

  it('should be upload json file correctly', async () => {
    const dispatch = jest.fn();
    render(
      <FileUploader
        fileName="oldFile"
        languageId="1"
        dispatch={dispatch}
        title="Upload Old File"
      />
    );
    const fileInput = screen.getByText('Upload Old File');
    const file = new File(['{"name": "dasdsa", "ds": "ddss"}'], 'test.json', {
      type: 'application/json',
    });
    userEvent.upload(fileInput, file);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CHANGE_LANGUAGE',
        payload: {
          languageId: '1',
          fileName: 'oldFile',
          uploadedFile: { name: 'dasdsa', ds: 'ddss' },
        },
      });
    });

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('should be upload json file correctly when active language equal to languageId', async () => {
    const dispatch = jest.fn();
    render(
      <FileUploader
        fileName="oldFile"
        languageId="2"
        dispatch={dispatch}
        title="Upload Old File"
        activeLanguage="2"
      />
    );
    const fileInput = screen.getByText('Upload Old File');
    const file = new File(['{"name": "dasdsa", "ds": "ddss"}'], 'test.json', {
      type: 'application/json',
    });
    userEvent.upload(fileInput, file);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ACTIVE_FILES',
        payload: {
          fileName: 'oldFile',
          obj: { name: 'dasdsa', ds: 'ddss' },
        },
      });
    });

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
