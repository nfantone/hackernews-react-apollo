import React from 'react';
import { pure, compose, withState, withHandlers } from 'recompose';
import SearchResults from './search-results';

const SearchLinks = ({ onSearchChange, onSearch, filter }) => (
  <div>
    <div>
      Search
      <input className="ml1" type="text" onChange={onSearchChange} />
      <button className="ml1" onClick={onSearch}>
        OK
      </button>
    </div>
    <SearchResults filter={filter} />
  </div>
);

const enhance = compose(
  withState('filter', 'setFilter', ''),
  withState('criteria', 'setCriteria', ''),
  withHandlers({
    onSearchChange: ({ setCriteria }) => e =>
      setCriteria(e.currentTarget.value),
    onSearch: ({ setFilter, criteria }) => () => {
      return setFilter(criteria);
    }
  }),
  pure
);

export default enhance(SearchLinks);
