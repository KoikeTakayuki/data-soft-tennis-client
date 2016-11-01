import React from 'react';
import PlayerList from './PlayerList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class PlayerIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = { players: false };
  }

  componentDidMount() {
    this.fetchPlayers(Server.API.getPlayers());
  }

  fetchPlayers(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: (players) => {
        this.setState({ players: players });
      }
    });
  }

  render() {

    return (
      <Grid>
        <h1>プレイヤー一覧</h1>
        {this.state.players ? (
            <PlayerList players={this.state.players} />
          ) : null
        }
      </Grid>
    );

  }
}