import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TranslationRow from '../../components/TranslationRow';

describe('TranslationRow Component', () => {
  it('should be render correctly', () => {
    render(
      <TranslationRow changes={{ removed: [], modified: [], added: [] }} />
    );
  });

  it('should be input visible when editableKey is true', () => {
    render(
      <TranslationRow
        translateKey="translateKey"
        editableKey={true}
        changes={{ removed: [], modified: [], added: [] }}
      />
    );

    expect(screen.getByTestId('editable-key')).toBeInTheDocument();
  });

  it('should be className of the list item generate correctly in case of removed changes', () => {
    render(
      <TranslationRow
        translateKey="translateKey"
        editableKey={true}
        changes={{ removed: ['translateKey'], modified: [], added: [] }}
      />
    );

    expect(screen.getByTestId('translation-row-list-item')).toHaveClass(
      'changes-removed'
    );
  });
  it('should be className of the list item generate correctly in case of modified changes', () => {
    render(
      <TranslationRow
        translateKey="translateKey"
        editableKey={true}
        changes={{ removed: [], modified: ['translateKey'], added: [] }}
      />
    );

    expect(screen.getByTestId('translation-row-list-item')).toHaveClass(
      'changes-modify'
    );
  });
  it('should be className of the list item generate correctly in case of added changes', () => {
    render(
      <TranslationRow
        translateKey="translateKey"
        editableKey={true}
        changes={{ removed: [], modified: [], added: ['translateKey'] }}
      />
    );

    expect(screen.getByTestId('translation-row-list-item')).toHaveClass(
      'changes-add'
    );
  });
  it('should be call handleEdit function correctly', () => {
    const handleEdit = jest.fn();

    render(
      <TranslationRow
        handleEdit={handleEdit}
        translateKey="translateKey"
        editableKey={true}
        changes={{ removed: [], modified: [], added: ['translateKey'] }}
      />
    );

    const translationRowItem = screen.getByTestId('translation-row-list-item');
    fireEvent.click(translationRowItem);

    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it('should be set key value correctly when key is editable', () => {
    render(
      <TranslationRow
        translateKey="translateKey"
        editableKey={true}
        changes={{ removed: [], modified: [], added: [] }}
      />
    );

    const input = screen.getByTestId('editable-key');

    fireEvent.change(input, { target: { value: 'newTranslateKey' } });
    expect(input).toHaveValue('newTranslateKey');
  });

  it('should be set file correctly with debounce when key is editable', async () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const dispatch = jest.fn();
    render(
      <TranslationRow
        file={{ key: 'value' }}
        dispatch={dispatch}
        translateKey="translateKey"
        editableKey={true}
        changes={{ removed: [], modified: [], added: ['translateKey'] }}
        fileName="oldFile"
        languageId="1"
      />
    );

    const input = screen.getByTestId('editable-key');
    fireEvent.change(input, { target: { value: 'newTranslateKey' } });

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ACTIVE_FILES',
        payload: {
          fileName: 'oldFile',
          obj: { key: 'value', translateKey: 'newTranslateKey' },
        },
      });
    });
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CHANGE_LANGUAGE',
        payload: {
          languageId: '1',
          fileName: 'oldFile',
          uploadedFile: { key: 'value', translateKey: 'newTranslateKey' },
        },
      });
    });
  });
});
