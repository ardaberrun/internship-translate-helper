import { render, screen } from '@testing-library/react';
import Content from '../../components/Content';

describe('Content Component', () => {
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
    const changes = { removed: [], modified: [], added: [] };
    render(
      <Content
        fileState={mockState}
        changes={changes}
        setChanges={() => {}}
        dispatch={() => {}}
      />
    );
  });

  it('should be disable compare button when active files is missing', () => {
    const mockState = {
      languages: [],
      activeFiles: {
        oldFile: {},
        newFile: {},
      },
      activeLanguage: '1',
    };
    const changes = { removed: [], modified: [], added: [] };
    render(
      <Content
        fileState={mockState}
        changes={changes}
        setChanges={() => {}}
        dispatch={() => {}}
      />
    );
    const compareButton = screen.getByText('Compare');
    expect(compareButton).toBeDisabled();
  });

  it('should be disable compare button when active old file is missing', () => {
    const mockState = {
      languages: [],
      activeFiles: {
        oldFile: {},
        newFile: { key: 'value' },
      },
      activeLanguage: '1',
    };
    const changes = { removed: [], modified: [], added: [] };
    render(
      <Content
        fileState={mockState}
        changes={changes}
        setChanges={() => {}}
        dispatch={() => {}}
      />
    );
    const compareButton = screen.getByText('Compare');
    expect(compareButton).toBeDisabled();
  });

  it('should be disable compare button when active new file is missing', () => {
    const mockState = {
      languages: [],
      activeFiles: {
        oldFile: { key: 'value' },
        newFile: {},
      },
      activeLanguage: '1',
    };
    const changes = { removed: [], modified: [], added: [] };
    render(
      <Content
        fileState={mockState}
        changes={changes}
        setChanges={() => {}}
        dispatch={() => {}}
      />
    );
    const compareButton = screen.getByText('Compare');
    expect(compareButton).toBeDisabled();
  });

  it('should be enable compare button when active files is present', () => {
    const mockState = {
      languages: [],
      activeFiles: {
        oldFile: { key: 'value' },
        newFile: { key: 'value' },
      },
      activeLanguage: '1',
    };
    const changes = { removed: [], modified: [], added: [] };
    render(
      <Content
        fileState={mockState}
        changes={changes}
        setChanges={() => {}}
        dispatch={() => {}}
      />
    );
    const compareButton = screen.getByText('Compare');
    expect(compareButton).not.toBeDisabled();
  });

  it('should be compare active files when compare button is clicked', () => {
    const mockState = {
      languages: [],
      activeFiles: {
        oldFile: { removedkey: 'removedvalue', modifiedkey: 'modifiedkey' },
        newFile: { modifiedkey: 'modifiedvalue', addedkey: 'addedvalue' },
      },
      activeLanguage: '1',
    };
    const changes = { removed: [], modified: [], added: [] };
    const setChanges = jest.fn();
    render(
      <Content
        fileState={mockState}
        changes={changes}
        setChanges={setChanges}
        dispatch={() => {}}
      />
    );
    const compareButton = screen.getByText('Compare');
    compareButton.click();
    expect(setChanges).toHaveBeenCalledTimes(1);
    expect(setChanges).toHaveBeenCalledWith({
      removed: ['removedkey'],
      modified: ['modifiedkey'],
      added: ['addedkey'],
    });
  });
});
