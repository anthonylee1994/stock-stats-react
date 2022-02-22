import React from 'react';
import {
  Badge,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'umi';
import { useStockStore } from '@/hooks/useStockStore';
import { useAppBarStore } from '@/hooks/ui/useAppBarStore';
import { debounce } from 'lodash';
import { useHistory } from 'umi';

const AppBar = React.memo(() => {
  const { formatMessage } = useIntl();

  const history = useHistory();
  const appBarValue = useAppBarStore((state) => state.value);
  const searchMode = useAppBarStore((state) => state.searchMode);
  const toggleSearchMode = useAppBarStore((state) => state.toggleSearchMode);
  const setAppBarValue = useAppBarStore((state) => state.setValue);
  const searchStocks = useStockStore((state) => state.searchStocks);
  const searchedStocks = useStockStore((state) => state.searchedStocks);
  const isSearching = useStockStore((state) => state.searching);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [isPopoverOpen, setPopoverOpen] = React.useState(false);

  React.useEffect(
    () =>
      debounce(() => {
        searchStocks(
          searchMode === 'symbol' ? appBarValue : undefined,
          searchMode === 'name' ? appBarValue : undefined,
        );
      }, 300),
    [appBarValue, searchMode, searchStocks],
  );

  return (
    <Flex
      p={2}
      bg="messenger.500"
      justifyContent="center"
      position="sticky"
      top={0}
      zIndex={1}
      onBlur={() => setPopoverOpen(false)}
    >
      <Popover
        isOpen={isPopoverOpen}
        initialFocusRef={inputRef}
        onOpen={() => setPopoverOpen(true)}
        onClose={() => setPopoverOpen(false)}
      >
        <InputGroup maxWidth="md">
          <InputLeftElement width="4.5rem">
            <Button
              disabled={isSearching}
              colorScheme="gray"
              h="1.75rem"
              size="sm"
              onClick={toggleSearchMode}
            >
              <FormattedMessage id={`search.${searchMode}.toggle`} />
            </Button>
          </InputLeftElement>
          <PopoverTrigger>
            <Input
              ref={inputRef}
              pl="4.5rem"
              variant="filled"
              value={appBarValue}
              placeholder={formatMessage({ id: 'search.placeholder' })}
              onClick={() => setAppBarValue('')}
              onChange={(e) => setAppBarValue(e.target.value)}
              bg="white"
              _focus={{ bg: 'white' }}
              _hover={{ bg: 'white' }}
              _before={{ bg: 'white' }}
            />
          </PopoverTrigger>
        </InputGroup>
        <PopoverContent
          _focus={{}}
          width="full"
          minWidth={{ base: '100vw', md: 'md' }}
          borderTopRadius="none"
        >
          <PopoverBody p={0}>
            {searchedStocks.slice(0, 5).map((stock) => (
              <Flex
                cursor="pointer"
                _notLast={{ borderBottom: 'solid 1px #eaeaea' }}
                p={2}
                alignItems="center"
                key={stock.id}
                onClick={() => {
                  setPopoverOpen(false);
                  setAppBarValue('');
                  history.push(`/${stock.symbol}`);
                }}
              >
                <Badge>{stock.symbol}</Badge>
                <Text ml={2}>{stock.name}</Text>
              </Flex>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
});

export default AppBar;
