import React, {Component} from 'react';

class ArtistsInfo extends Component {
  constructor (props) {
    super (props);
    this.state = {
      artists: this.props.artist,
      img: '',
    };
  }
  //this.props.artist.image[2]['#text'];

  render () {
    return (
      <div>
        <h1>
          Here are some results for{' '}
          {this.props.artist.name ? this.props.artist.name : 'Cher'}
        </h1>

      </div>
    );
  }
}

export default ArtistsInfo;
