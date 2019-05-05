import React from 'react';
import './App.css';
import $ from 'jquery';

import Navbar from './components/Navbar';

class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      artists: {},
      artistTracks: {},
      artistName: '',
      display: [],
      unavailable: '',
    };
  }

  componentDidMount () {
    $ ('#searchbox').hide ();
    let items = JSON.parse (localStorage.getItem ('item'));

    this.setState ({
      display: items,
    });
  }

  onChange = e => {
    this.setState ({
      [e.target.name]: e.target.value,
    });
  };

  getData = e => {
    let apiKey = '0990867cea64f856406097e29d8d3b99';

    // get artists info from last.fm api
    fetch (
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.state.artistName}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`
    )
      .then (data => data.json ())
      .then (data => {
        this.setState ({
          artists: data.artist,
        });
      })
      .catch (err => {
        alert ('Please Enter a valid Artist name');
        window.location.reload ();
      });

    // get artist tracks from last.fm api

    fetch (
      `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks
&artist=${this.state.artistName}&api_key=${apiKey}&format=json`
    )
      .then (tracks => tracks.json ())
      .then (tracks => {
        this.setState ({
          artistTracks: tracks.toptracks.track,
        });
      })
      .catch (err => {
        alert ('Please Enter a valid Artist name');
      });

    if (this.state.display) {
      this.state.display.unshift (this.state.artistName);
    }

    let uniqueArtists = [...new Set (this.state.display)];
    localStorage.setItem ('item', JSON.stringify (uniqueArtists));
    let items = JSON.parse (localStorage.getItem ('item'));

    this.setState ({
      display: items,
    });
  };

  searchHistory = e => {
    $ ('#searchbox').toggle ();
  };

  biography () {
    if (this.state.artists.bio.content === '') {
      return `Sorry, Bio of this ${this.state.artistName} is not available`;
    }
    return this.state.artists.bio.content;
  }

  render () {
    let artistBio = (
      <div>

        <h2 className="pb-3 pt-5">
          Here are some results for
          {' '}
          {this.state.artists
            ? this.state.artists.name
            : this.state.unavailable}
        </h2>
        <div className="card bio">
          <div className="card-title ml-3 mt-3">
            <h3>
              {this.state.artists
                ? this.state.artists.name
                : this.state.unavailable}
              's Bio
            </h3>
          </div>
          <div className="card-body ">
            <small>
              {this.state.artists.bio
                ? this.biography ()
                : 'Sorry,There is nothing available'}
            </small>
          </div>
        </div>
      </div>
    );

    let statsArtist = (
      <div>
        <div className="card mt-5 bio">
          <div className="card-title ml-3 mt-3">
            <h3>Stats</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <b>Listeners: </b>
                {this.state.artists.stats
                  ? this.state.artists.stats.listeners
                  : null}

              </div>
              <div className="col-md-6">
                <b>Playcount: </b>

                {this.state.artists.stats
                  ? this.state.artists.stats.playcount
                  : null}

              </div>

            </div>

            <div className="row">
              <div className="col-md-6">
                <b>Ontour:</b>
                {this.state.artists.ontour ? this.state.artists.ontour : null}
              </div>
              <div className="col-md-6">
                <b>Bio:</b>
                {this.state.artists.url ? this.state.artists.url : null}
              </div>

            </div>

          </div>
        </div>
      </div>
    );

    let searched = <p className="pl-3">You haven't searched yet</p>;

    return (
      <div>
        <Navbar />
        <div className="main mt-5">
          <div className="form-group has-search">
            <span className="fas fa-search form-control-feedback" />
            <input
              type="text"
              className="form-control"
              placeholder="Search Your Favourite Artist here......"
              onChange={this.onChange}
              value={this.state.artistName}
              name="artistName"
              onClick={this.searchHistory}
            />
            <div className="card" id="searchbox">

              <span className="ml-3 pt-3 row">
                <i className="far fa-clock pt-1" />
                <p className="ml-2">Search history</p>
              </span>

              <hr />

              {this.state.display
                ? this.state.display.map ((item, id) => {
                    return (
                      <span key={id}>
                        <p className="ml-5">{item}</p>
                        <hr />
                      </span>
                    );
                  })
                : searched}
            </div>

            <br />

            <button
              className="btn btn-primary col-md-12 col-lg-12 col-xl-12"
              onClick={this.getData}
            >
              Search
            </button>
          </div>
          <div className="mt-5">
            {this.state.artistName
              ? <h2 className="mb-4">{this.state.artistName}'s Top Songs</h2>
              : null}

            {this.state.artistTracks[0]
              ? this.state.artistTracks.map ((item, id) => {
                  if (id < 11) {
                    return (
                      <div className="card" key={id}>
                        <p className="ml-3 mt-2">{item.name}</p>
                      </div>
                    );
                  }
                })
              : null}
          </div>
          {this.state.artists.bio ? artistBio : null}
          {this.state.artists.stats ? statsArtist : null}
          <br /><br /><br />
          {this.state.artists.similar ? <h3>Similar Artists</h3> : null}
          {this.state.artists.similar
            ? this.state.artists.similar.artist.map ((item, id) => {
                return (
                  <div className="card bio mt-3 mb-5">
                    <h4 className="ml-5 mt-3">{item.name}</h4>
                    <p className="ml-5">{item.url}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default App;
