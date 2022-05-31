import React, { useCallback, useEffect, useMemo, useRef, VFC } from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import { chunk, constant, times } from 'lodash';
import { MnemonicAutocompleteContainer } from './MnemonicAutocompleteContainer';
import * as styles from './MnemonicInput.scss';
import { COLUMNS_COUNT } from './constants';

const messages = defineMessages({
  recoveryPhraseNoResults: {
    id:
      'paper.wallet.create.certificate.verification.dialog.recoveryPhrase.noResults',
    defaultMessage: '!!!No results',
    description:
      '"Paper wallet create certificate verification dialog" recovery phrase no results label.',
  },
});

interface MnemonicInputProps {
  onChange?: (values: string[]) => void;

  value: string[];
  disabled?: boolean;
  error: boolean;
  reset: boolean;
  availableWords: string[];
  wordsCount: number;
}

const MnemonicInput: VFC<MnemonicInputProps> = injectIntl(
  ({
    intl,
    onChange,
    value: selectedWords,
    disabled,
    availableWords,
    wordsCount,
    error,
    reset,
  }) => {
    useEffect(() => {
      if (selectedWords.length < 1) {
        onChange(times(wordsCount, constant('')));
      }
    }, [selectedWords]);

    const wordsPerColumn = Math.ceil(wordsCount / COLUMNS_COUNT);
    const inputIndicesByColumnIndex = useMemo(
      () => chunk(times(wordsCount), wordsPerColumn),
      [wordsCount]
    );
    const inputRefs = times(wordsCount, () => useRef<HTMLInputElement>());
    const createHandleWordChange = useCallback(
      (idx: number) => (newValue) => {
        if (newValue === selectedWords[idx]) return;

        const newSelectedWords = [...selectedWords];
        newSelectedWords[idx] = newValue;

        onChange(newSelectedWords);
      },
      [selectedWords, onChange]
    );

    const createHandleConfirmSelection = useCallback(
      (idx: number) => () => {
        inputRefs[idx + 1]?.current.focus();
      },
      [inputRefs]
    );

    return (
      <div className={styles.root}>
        {inputIndicesByColumnIndex.map((inputIndices) => (
          <div key={inputIndices.join('')} className={styles.inputList}>
            {inputIndices.map((idx) => {
              const value = selectedWords[idx] || '';
              return (
                <div key={idx} className={styles.inputWrapper}>
                  <MnemonicAutocompleteContainer
                    ordinalNumber={idx + 1}
                    reset={reset}
                    options={availableWords}
                    value={value}
                    onChange={createHandleWordChange(idx)}
                    inputRef={inputRefs[idx]}
                    onConfirmSelection={createHandleConfirmSelection(idx)}
                    disabled={disabled}
                    error={error && !value}
                    maxVisibleOptions={5}
                    noResultsMessage={intl.formatMessage(
                      messages.recoveryPhraseNoResults
                    )}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);

export { MnemonicInput };
