import React from 'react';
import './App.css';
import $ from 'jquery';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      artists: {},
      artistTracks: {},
      artistName: 'Cher',
      search: [],
      display: [],
      trackCount: {
        len: '',
      },
    };
  }

  componentDidMount () {
    $ ('#searchbox').hide ();
    let items = JSON.parse (localStorage.getItem ('item'));

    this.setState ({
      display: items,
    });
    console.log (this.state.display);
  }

  componentDidUpdate () {
    console.log (this.state.artistTracks);
    let items = JSON.parse (localStorage.getItem ('item'));

    if (items.length !== this.state.display.length) {
      this.setState ({
        display: items,
      });
    }
    console.log (this.state.display);
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
      });

    // get artist tracks from last.fm api

    fetch (
      `https://ws.audioscrobbler.com/2.0/?method=user.getartisttracks&user=rj&artist=${this.state.artistName}&api_key=${apiKey}&format=json`
    )
      .then (tracks => tracks.json ())
      .then (tracks => {
        this.setState ({
          artistTracks: tracks.artisttracks,
        });
      });

    /*let trackCount = {...this.state.trackCount};
    trackCount.len = Object.keys (this.state.artistTracks).length;
    this.setState ({trackCount});
    console.log (this.state.trackCount.len);*/
    //    localStorage.setItem ('artist', this.state.artistName);

    this.state.display.unshift (this.state.artistName);
    let uniqueArtists = [...new Set (this.state.display)];
    localStorage.setItem ('item', JSON.stringify (uniqueArtists));
  };

  searchHistory = e => {
    $ ('#searchbox').toggle ();
  };

  render () {
    let artistBio = (
      <div>
        <h2>Here are some results for {this.state.artists.name}</h2>
        <div className="card">
          <div className="card-title ml-3 mt-3">
            <h3>{this.state.artists.name}'s Bio</h3>
          </div>
          <div className="card-body ">
            <small>
              {this.state.artists.bio ? this.state.artists.bio.content : null}
            </small>
          </div>
        </div>
      </div>
    );

    let statsArtist = (
      <div>
        <div className="card mt-5">
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
                <b>Url:</b>
                {this.state.artists.url ? this.state.artists.url : null}
              </div>

            </div>

          </div>
        </div>
      </div>
    );

    let similarArtist = (
      <div className="mt-5">
        <h2>Similar Artists</h2>
        <div className="row">
          <div className="card ml-5 " style={{width: '18rem'}}>
            <img
              className="card-img-top"
              src="https://lastfm-img2.akamaized.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
              alt="Card image cap"
              height="200"
            />
            <div className="card-title ">
              <h4 className="ml-3 mt-3 ">
                {this.state.artists.similar
                  ? this.state.artists.similar.artist[0].name
                  : null}
              </h4>
            </div>
            <small>
              <a className="ml-2">
                {this.state.artists.similar
                  ? this.state.artists.similar.artist[0].url
                  : null}
              </a>
            </small>
          </div>

          <div className="card ml-5" style={{width: '18rem'}}>
            <img
              className="card-img-top"
              src="https://lastfm-img2.akamaized.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
              alt="Card image cap"
              height="200"
            />
            <div className="card-title ">
              <h4 className="ml-3 mt-3 ">
                {this.state.artists.similar
                  ? this.state.artists.similar.artist[1].name
                  : null}
              </h4>
            </div>
            <small>
              <a className="ml-2">
                {this.state.artists.similar
                  ? this.state.artists.similar.artist[1].url
                  : null}
              </a>
            </small>
          </div>

        </div>
        <br /><br />
        <div className="row">
          <div className="card ml-5" style={{width: '18rem'}}>
            <img
              className="card-img-top"
              src="https://lastfm-img2.akamaized.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
              alt="Card image cap"
              height="200"
            />
            <div className="card-title ">
              <h4 className="ml-3 mt-3 ">
                {this.state.artists.similar
                  ? this.state.artists.similar.artist[2].name
                  : null}
              </h4>
            </div>
            <small>
              <a className="ml-2">
                {this.state.artists.similar
                  ? this.state.artists.similar.artist[2].url
                  : null}
              </a>
            </small>
          </div>

          <div className="card ml-5" style={{width: '18rem'}}>
            <img
              className="card-img-top"
              src="https://lastfm-img2.akamaized.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
              alt="Card image cap"
              height="200"
            />
            <div className="card-title ">
              <h4 className="ml-3 mt-3 ">
                {this.state.artists.similar
                  ? this.state.artists.similar.artist[3].name
                  : null}
              </h4>
            </div>
            <small>
              <a className="ml-2">
                {this.state.artists.similar
                  ? this.state.artists.similar.artist[3].url
                  : null}
              </a>
            </small>
          </div>

        </div>
        <br />
      </div>
    );

    let tracks = (
      <div>
        <div className="card">
          hghg 898
        </div>
      </div>
    );

    return (
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
            <span className="ml-5 pt-3">
              <i className="far fa-clock" />
              Search history
            </span><hr />

            {this.state.display.map (item => {
              return (
                <span>
                  <p className="ml-5">{item}</p>
                  <hr />
                </span>
              );
            })}

          </div>

          <br />

          <button
            className="btn btn-primary col-md-12 col-lg-12 col-xl-12"
            onClick={this.getData}
          >
            Search
          </button>
        </div>
        {this.state.artistTracks.track ? tracks : null}
        {this.state.artists.bio ? artistBio : null}
        {this.state.artists.stats ? statsArtist : null}
        {this.state.artists.similar ? similarArtist : null}
      </div>
    );
  }
}

export default App;
