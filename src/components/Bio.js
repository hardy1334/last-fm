import React, {Component} from 'react';

class BioComponent extends Component {
  constructor (props) {
    super (props);
    this.state = {
      artist: {},
    };
  }

  render () {
    return (
      <div>
        <h2>Bio:</h2>
        {this.props.info ? this.props.info.bio : null}
      </div>
    );
  }
}

export default BioComponent;
