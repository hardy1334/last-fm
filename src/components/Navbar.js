import React, {Component} from 'react';
import {Link, BrowserRouter} from 'react-router-dom';

class Navbar extends Component {
  render () {
    return (
      <nav className="navbar navbar-default navbar-light bg-light">

        <BrowserRouter>
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              <center>
                <h3>
                  Artist Search
                </h3>
              </center>
            </Link>
          </div>
        </BrowserRouter>

      </nav>
    );
  }
}

export default Navbar;
