import React, {Component} from 'react';
import {Link, BrowserRouter} from 'react-router-dom';

class Navbar extends Component {
  render () {
    return (
      <nav className="navbar navbar-light bg-light">

        <BrowserRouter>

          <Link className="navbar-brand" to="/" id="title">
            <h3>
              Artist Search
            </h3>
          </Link>

        </BrowserRouter>

      </nav>
    );
  }
}

export default Navbar;
