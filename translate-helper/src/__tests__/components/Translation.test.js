import { render, screen, fireEvent } from '@testing-library/react';
import Translation from '../../components/Translation';

describe('Translation Component', () => {
  it('should be render correctly', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    render(<Translation fileState={mockState} file={{}} />);
  });

  it('should be visible add language button(+) in old language file', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    render(<Translation fileType="old" fileState={mockState} file={{}} />);

    expect(screen.getByRole('button', '+')).toBeInTheDocument();
  });
  it('should be add language when clicking the + button', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    const dispatch = jest.fn();
    render(
      <Translation
        dispatch={dispatch}
        fileType="old"
        fileState={mockState}
        file={{}}
      />
    );

    const addButton = screen.getByRole('button', '+');
    addButton.click();

    expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_LANGUAGE' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'CHECK_LANGUAGE_ID' });
  });
  it('should be visible remove language button(x) when there is more than one language', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    const dispatch = jest.fn();
    render(
      <Translation
        dispatch={dispatch}
        fileType="new"
        fileState={mockState}
        file={{}}
      />
    );

    expect(screen.getAllByRole('button', 'x')).toHaveLength(2);
  });
  it('should be remove language when clicking the x button', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    const dispatch = jest.fn();
    render(
      <Translation
        dispatch={dispatch}
        fileType="new"
        fileState={mockState}
        file={{}}
      />
    );

    const removeButton = screen.getByTestId('remove-language-btn-2');
    removeButton.click();

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LANGUAGE',
      payload: { languageId: '2' },
    });
  });

  it('should be update the active language if the removed language was active', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '2',
    };
    const dispatch = jest.fn();
    render(
      <Translation
        dispatch={dispatch}
        fileType="new"
        fileState={mockState}
        file={{}}
      />
    );

    const removeButton = screen.getByTestId('remove-language-btn-2');
    removeButton.click();

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LANGUAGE',
      payload: { languageId: '2' },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_ACTIVE_LANGUAGE',
      payload: '1',
    });
  });

  it('should be update the active language if the removed language was active2', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    const dispatch = jest.fn();
    render(
      <Translation
        dispatch={dispatch}
        fileType="new"
        fileState={mockState}
        file={{}}
      />
    );

    const removeButton = screen.getByTestId('remove-language-btn-1');
    removeButton.click();

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LANGUAGE',
      payload: { languageId: '1' },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_ACTIVE_LANGUAGE',
      payload: '2',
    });
  });

  it('should be change language name correctly when input change', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    const dispatch = jest.fn();
    render(
      <Translation
        dispatch={dispatch}
        fileType="old"
        fileState={mockState}
        file={{}}
      />
    );

    const input = screen.getByTestId('language-name-input-1');
    fireEvent.change(input, { target: { value: 'new language name' } });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_LANGUAGE_ID',
      payload: { id: '1', value: 'new language name' },
    });
    expect(dispatch).toHaveBeenCalledWith({ type: 'CHECK_LANGUAGE_ID' });
  });
  it('should be set active language correctly when clicking the different radio button', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    const dispatch = jest.fn();
    render(
      <Translation
        dispatch={dispatch}
        fileType="old"
        fileState={mockState}
        file={{}}
      />
    );

    const input2 = screen.getByTestId('2-radio');
    fireEvent.click(input2);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_ACTIVE_LANGUAGE',
      payload: '2',
    });
  });

  it('should be change file uploader title when file is uploaded', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {},
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };

    render(<Translation fileType="old" fileState={mockState} file={{}} />);
  });

  it('should be set active file correctly when add missing key', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    const dispatch = jest.fn();
    render(
      <Translation
        dispatch={dispatch}
        missingKeys={['newkey']}
        fileType="new"
        changes={{ removed: [], modified: [], added: [] }}
        fileState={mockState}
        file={{ key: 'value' }}
      />
    );

    const addMissingKeyButton = screen.getByTestId('newkey-add');
    fireEvent.click(addMissingKeyButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_ACTIVE_FILES',
      payload: { fileName: 'newFile', obj: { key: 'value', newkey: '' } },
    });
  });

  it('should be show error when language name is exists', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: true,
            errorMessage: 'error',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
        {
          id: '2',
          languageId: {
            current: 'en',
            error: true,
            errorMessage: 'error',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    const dispatch = jest.fn();
    render(
      <Translation
        dispatch={dispatch}
        fileType="old"
        fileState={mockState}
        file={{}}
      />
    );

    expect(screen.getByTestId('language-name-input-1')).toHaveClass('error');
    expect(screen.getByTestId('error-message-1')).toHaveTextContent('error');
  });

  it('should be set toggle correctly', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
              emptyValue: '',
              emptyValue2: '',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };

    render(
      <Translation
        fileType="old"
        changes={{ removed: [], modified: [], added: [] }}
        fileState={mockState}
        file={{ emptyValue: '', emptyValue2: '' }}
      />
    );

    const toggleButton = screen.getByTestId('toggle-old');

    fireEvent.click(toggleButton);
    expect(toggleButton.value).toBe('true');

    fireEvent.click(toggleButton);
    expect(toggleButton.value).toBe('false');
  });
  it('should be setEditableKey correctly', () => {
    const mockState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: {
              enoldkey1: 'enoldvalue1',
              enoldkey2: 'enoldvalue2',
              enoldkey3: 'enoldvalue3',
              enbothkey1: 'enbothvalue12',
              enbothkey2: 'enbothvalue21',
              emptyValue: '',
              emptyValue2: '',
            },
            newFile: {
              ennewkey1: 'ennewvalue1',
              ennewkey2: 'ennewvalue2',
              ennewkey3: 'ennewvalue3',
              enbothkey1: 'enbothvalue1',
              enbothkey2: 'enbothvalue2',
            },
          },
        },
      ],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };

    render(
      <Translation
        fileType="old"
        changes={{ removed: [], modified: [], added: [] }}
        fileState={mockState}
        file={{ key: 'value' }}
      />
    );

    const listItem = screen.getAllByTestId('translation-row-list-item')[0];
    fireEvent.click(listItem);
  });
});
