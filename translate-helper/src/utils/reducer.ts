import types from './types';

type Files = {
  'oldFile': {[key: string]: string};
  'newFile': {[key: string]: string};
};

type Language = {
  id: string;
  languageId: {
    current: string;
    error: boolean;
    errorMessage: string;
  };
  files: Files;
};

export type FileState = {
  languages: Array<Language>;
  activeFiles: Files;
  activeLanguage: string;
};

type AddLanguageAction = {
  type: types.ADD_LANGUAGE;
};

type RemoveLanguageAction = {
  type: types.REMOVE_LANGUAGE;
  payload: {
    languageId: string;
  };
};

type ChangeLanguageAction = {
  type: types.CHANGE_LANGUAGE;
  payload: {
    fileName: string;
    uploadedFile: {};
    languageId: string;
  };
};

type ChangeActiveFiles = {
  type: types.CHANGE_ACTIVE_FILES;
};

type SetActiveFiles = {
  type: types.SET_ACTIVE_FILES;
  payload: {
    fileName: string;
    obj: {};
  };
};

type SetActiveLanguage = {
  type: types.SET_ACTIVE_LANGUAGE;
  payload: string;
};

type ChangeLanguageId = {
  type: types.CHANGE_LANGUAGE_ID;
  payload: {
    id: string;
    value: string;
  };
};

type CheckLanguageId = {
  type: types.CHECK_LANGUAGE_ID;
};

type ReducerActions =
  | AddLanguageAction
  | RemoveLanguageAction
  | ChangeLanguageAction
  | ChangeActiveFiles
  | SetActiveFiles
  | SetActiveLanguage
  | ChangeLanguageId
  | CheckLanguageId;

const reducer = (state: FileState, action: ReducerActions) => {
  switch (action.type) {
    case types.ADD_LANGUAGE:
      return {
        ...state,
        languages: [
          ...state.languages,
          {
            id: Math.random().toString(),
            languageId: {
              current: '',
              error: false,
              errorMessage: '',
            },
            files: { oldFile: {}, newFile: {} },
          },
        ],
      };

    case types.REMOVE_LANGUAGE:
      return {
        ...state,
        languages: state.languages.filter(
          (language) => language.id !== action.payload.languageId
        ),
      };

    case types.CHANGE_LANGUAGE:
      return {
        ...state,
        languages: state.languages.map((language) =>
          language.id === action.payload.languageId
            ? {
                ...language,
                files: {
                  ...language.files,
                  [action.payload.fileName]: action.payload.uploadedFile,
                },
              }
            : language
        ),
      };

    case types.SET_ACTIVE_FILES:
      return {
        ...state,
        activeFiles: {
          ...state.activeFiles,
          [action.payload.fileName]: action.payload.obj,
        },
      };

    case types.CHANGE_ACTIVE_FILES:
      return {
        ...state,
        activeFiles: state.languages.filter(
          (language) => language.id === state.activeLanguage
        )[0]?.files,
      };

    case types.SET_ACTIVE_LANGUAGE:
      return {
        ...state,
        activeLanguage: action.payload,
      };

    case types.CHANGE_LANGUAGE_ID:
      return {
        ...state,
        languages: state.languages.map((language) =>
          language.id === action.payload.id
            ? {
                ...language,
                languageId: {
                  ...language.languageId,
                  current: action.payload.value,
                },
              }
            : language
        ),
      };

    // CHECK UNIQUE
    case types.CHECK_LANGUAGE_ID:
      return {
        ...state,
        languages: state.languages.map((language, _, languages) =>
          languages.filter(
            (lang) => lang.languageId.current === language.languageId.current
          ).length > 1
            ? {
                ...language,
                languageId: {
                  ...language.languageId,
                  error: true,
                  errorMessage: 'Error. Please change language id...',
                },
              }
            : {
                ...language,
                languageId: {
                  ...language.languageId,
                  error: false,
                  errorMessage: '',
                },
              }
        ),
      };

    default:
      return state;
  }
};

export default reducer;
