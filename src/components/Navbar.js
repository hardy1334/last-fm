import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
  render () {
    return (
      <nav className=" navbar-fixed-top navbar-default navbar navbar-expand-lg navbar-light bg-success mb-5">
        <Link className="navbar-brand" to="/">
          {this.props.name.name ? this.props.name.name : 'Cher'}
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/tracks">
                Tracks <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bio">Bio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/similar">Similar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tags">Tags</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
