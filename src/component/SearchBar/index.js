import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { injectFilterState, Tokenizer } from 'react-simplest-typeahead'
import { cutPattern } from './cutPattern'
import { formatOption, formatValue, formatCount } from './parse'

const renderOption = ({ option, isHighlighted, pattern, ...props }) => (
  <Option key={option} {...props} isHighlighted={isHighlighted}>
    {cutPattern(option, pattern).map(({ text, type }) => (
      <Text type={type}>{text}</Text>
    ))}
  </Option>
)

const renderItem = ({ i, item, onDelete, ...props }) => (
  <Item key={i} {...props} onClick={onDelete}>
    <Text type="normal">{item}</Text>
    <RemoveButton />
  </Item>
)

const Text = styled.span`
  color: ${props => (props.type === 'match' ? '#000' : '#555')};
  font-weight: ${props => (props.type === 'match' ? 'bold' : 'normal')};
`

const Item = styled.div`
  padding: 0 10px;
  height: 30px;
  border: solid 1px #e0e0e0;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Option = styled.div`
  padding: 6px;
  background-color: ${props => (props.isHighlighted ? '#eee' : 'transparent')};
  cursor: pointer;
`
const RemoveButton = styled.div`
  margin-left: 6px;
  padding: 2px;
  display: inline-block;
  background-color: ${props => (props.isHighlighted ? '#eee' : 'transparent')};
  cursor: pointer;
  &:after {
    content: '×';
  }
`

const SearchBar_ = ({ value, ...props }) => (
  <TokenizerWithFilter
    value={value}
    renderItem={renderItem}
    renderOption={renderOption}
    placeholder="type here ..."
    customClassName={customClassName}
    {...props}
  />
)

const customClassName = {
  tokenizer: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 4px;
  `,
  values: css`
    display: flex;
    flex-direction: row;
  `,
  input: css`
    padding: 6px;
  `,
  options: css`
    width: calc(100% + 12px) !important;
  `,
  typeahead: css``,
}

const filterFunction = pattern => word => word.includes(pattern.toLowerCase())
const sortFunction = pattern => (a, b) =>
  (pattern.length - a.length) / a.length <
  (pattern.length - b.length) / b.length
    ? 1
    : -1

const TokenizerWithFilter = injectFilterState({
  filter: filterFunction,
  sort: sortFunction,
  maxDisplayed: 16,
})(Tokenizer)

export const SearchBar = ({
  availableWords,
  combinaisonTree,
  value,
  words,
  onChange,
}) => (
  <Container>
    <SearchBar_
      options={formatOption(words)(value)}
      value={value}
      onChange={value => onChange(formatValue(words)(value))}
    />
    {combinaisonTree && (
      <Counter>{`${formatCount(combinaisonTree.sum)} combinaisons`}</Counter>
    )}
  </Container>
)

const Container = styled.div`
  margin: 4px;
`
const Counter = styled.div`
  margin-top: 4px;
  font-size: 0.8em;
  font-style: italic;
  text-align: right;
`
