import { reducer } from '../../utils/reducer';

describe('reducer function tests', () => {
  it('should return the initial state', () => {
    const initialState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: {} },
        },
      ],
      activeFiles: { oldFile: {}, newFile: {} },
      activeLanguage: '1',
    };
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should be handle ADD_LANGUAGE', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    const initialState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: {} },
        },
      ],
      activeFiles: { oldFile: {}, newFile: {} },
      activeLanguage: '1',
    };
    const action = { type: 'ADD_LANGUAGE' };
    const expectedState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: {} },
        },
        {
          id: '0.123456789',
          languageId: {
            current: '',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: {} },
        },
      ],
      activeFiles: { oldFile: {}, newFile: {} },
      activeLanguage: '1',
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('should be handle REMOVE_LANGUAGE', () => {
    const initialState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: {} },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: {} },
        },
      ],
      activeFiles: { oldFile: {}, newFile: {} },
      activeLanguage: '1',
    };
    const action = { type: 'REMOVE_LANGUAGE', payload: { languageId: '1' } };
    const expectedState = {
      languages: [
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: {} },
        },
      ],
      activeFiles: { oldFile: {}, newFile: {} },
      activeLanguage: '1',
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should be handle CHANGE_LANGUAGE', () => {
    const initialState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: {} },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: { trold: 'trold' }, newFile: { trnew: 'trnew' } },
        },
      ],
    };
    const action = {
      type: 'CHANGE_LANGUAGE',
      payload: {
        languageId: '1',
        fileName: 'oldFile',
        uploadedFile: { enold: 'enold' },
      },
    };
    const expectedState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: { enold: 'enold' }, newFile: {} },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: { trold: 'trold' }, newFile: { trnew: 'trnew' } },
        },
      ],
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should be handle SET_ACTIVE_FILES', () => {
    const initialState = {
      activeFiles: { oldFile: {}, newFile: {} },
    };
    const action = {
      type: 'SET_ACTIVE_FILES',
      payload: { fileName: 'newFile', obj: { trkey1: 'trvalue1' } },
    };
    const expectedState = {
      activeFiles: { oldFile: {}, newFile: { trkey1: 'trvalue1' } },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should be handle CHANGE_ACTIVE_FILES', () => {
    const initialState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: { enkey1: 'envalue1' } },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: { oldtrkey1: 'oldtrvalue1' },
            newFile: { trkey1: 'trvalue1' },
          },
        },
      ],
      activeFiles: { oldFile: {}, newFile: { enkey1: 'envalue1' } },
      activeLanguage: '2',
    };
    const action = { type: 'CHANGE_ACTIVE_FILES' };
    const expectedState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
          files: { oldFile: {}, newFile: { enkey1: 'envalue1' } },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
          files: {
            oldFile: { oldtrkey1: 'oldtrvalue1' },
            newFile: { trkey1: 'trvalue1' },
          },
        },
      ],
      activeFiles: {
        oldFile: { oldtrkey1: 'oldtrvalue1' },
        newFile: { trkey1: 'trvalue1' },
      },
      activeLanguage: '2',
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should be handle SET_ACTIVE_LANGUAGE', () => {
    const initialState = { activeLanguage: '1' };
    const action = { type: 'SET_ACTIVE_LANGUAGE', payload: '2' };
    const expectedState = { activeLanguage: '2' };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should be handle CHANGE_LANGUAGE_ID', () => {
    const initialState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
        },
      ],
    };
    const action = {
      type: 'CHANGE_LANGUAGE_ID',
      payload: { id: '1', value: 'trtest' },
    };
    const expectedState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'trtest',
            error: false,
            errorMessage: '',
          },
        },
        {
          id: '2',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
        },
      ],
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should be handle CHECK_LANGUAGE_ID with error', () => {
    const initialState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
        },
        {
          id: '2',
          languageId: {
            current: 'en',
            error: false,
            errorMessage: '',
          },
        },
        {
          id: '3',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
        },
      ],
    };
    const action = { type: 'CHECK_LANGUAGE_ID' };
    const expectedState = {
      languages: [
        {
          id: '1',
          languageId: {
            current: 'en',
            error: true,
            errorMessage: 'Error. Please change language id...',
          },
        },
        {
          id: '2',
          languageId: {
            current: 'en',
            error: true,
            errorMessage: 'Error. Please change language id...',
          },
        },
        {
          id: '3',
          languageId: {
            current: 'tr',
            error: false,
            errorMessage: '',
          },
        },
      ],
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
