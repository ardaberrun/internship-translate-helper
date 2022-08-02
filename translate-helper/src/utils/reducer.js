import types from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD_LANGUAGE:
      return {
        ...state,
        languages: [
          ...state.languages,
          {
            id: Math.random().toString(),
            languageId: {
              ...state.languages.languageId,
              current: '',
            },
            files: { oldFile: {}, newFile: {} },
          },
        ],
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
