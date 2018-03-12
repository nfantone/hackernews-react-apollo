import React from 'react';
import './app.css';
import { Switch, Route } from 'react-router-dom';
import Header from './header';
import CreateLink from './create-link';
import LinkList from './link-list';
import SearchLinks from './search-links';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/search" component={SearchLinks} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
