import {
  Box,
  CloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useGameQueryStore from '../store';
import { isMacOS } from '../utils/OSUtils';

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const setSearchText = useGameQueryStore((s) => s.setSearchText);
  const searchText = useGameQueryStore((s) => s.gameQuery.searchText);
  const navigate = useNavigate();

  const keyName = isMacOS() ? 'option' : 'Alt';

  const searchAndNavigate = () => {
    if (ref.current) {
      setSearchText(ref.current.value);
      navigate('/');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'Enter') {
        event.preventDefault();
        if (ref.current) {
          ref.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        searchAndNavigate();
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          onChange={searchAndNavigate}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          borderRadius={20}
          placeholder='Search games...'
          variant='filled'
        />
        <InputRightElement
          whiteSpace='nowrap'
          width={searchText ? 'fit-content' : '10rem'}
        >
          {searchText ? (
            <CloseButton
              width='40px'
              height='40px'
              borderRadius={20}
              onClick={(e) => {
                e.stopPropagation();
                ref.current!.value = '';
                ref.current?.focus();
                setSearchText('');
              }}
            />
          ) : !isFocused ? (
            <Box marginBottom={1}>
              <Kbd>{keyName}</Kbd> + <Kbd>enter</Kbd>
            </Box>
          ) : null}
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchInput;
