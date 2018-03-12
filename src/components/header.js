import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { compose, pure } from 'recompose';

const Header = () => (
  <div className="flex pa1 justify-between nowrap orange">
    <div className="flex flex-fixed black">
      <div className="fw7 mr1">Hacker News</div>
      <Link to="/" className="ml1 no-underline black">
        new
      </Link>
      <div className="ml1">|</div>
      <Link to="/create" className="ml1 no-underline black">
        submit
      </Link>
      <div className="ml1">|</div>
      <Link to="/search" className="ml1 no-underline black">
        search
      </Link>
    </div>
  </div>
);

const enhance = compose(withRouter, pure);

export default enhance(Header);
