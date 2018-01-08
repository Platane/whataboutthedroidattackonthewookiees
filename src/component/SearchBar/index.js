import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { injectFilterState, Tokenizer } from 'react-simplest-typeahead'
import { cutPattern } from './cutPattern'
import { formatOption, formatValue } from './parse'

const renderOption = pattern => ({ option, isHighlighted, ...props }) => (
  <Option key={option} {...props} isHighlighted={isHighlighted}>
    {cutPattern(option, pattern).map(({ text, type }) => (
      <Text type={type}>{text}</Text>
    ))}
  </Option>
)

const renderItem = ({ item, onDelete, ...props }) => (
  <Item key={item} {...props} onClick={onDelete}>
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
// background-color: #fafafa;

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

const SearchBar_ = ({ pattern, value, ...props }) => (
  <Tokenizer
    pattern={pattern}
    value={value}
    renderItem={renderItem}
    renderOption={renderOption(pattern)}
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

const SearchBar__ = injectFilterState({
  filter: filterFunction,
  maxDisplayed: 16,
})(SearchBar_)

export const SearchBar = ({ value, words, onChange }) => (
  <SearchBar__
    options={formatOption(words)(value)}
    value={value}
    onChange={value => onChange(formatValue(words)(value))}
  />
)
