import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerList from '../player/PlayerList';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class TeamPlayerList extends React.Component {


  constructor(props) {
    super(props);
    const team = props.team;
    this.url = Server.API.getPlayersByTeamId(team.id);
    this.state = { players: false };
  }

  componentDidMount() {
    this.fetchPlayers(this.url);
  }

  fetchPlayers(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: (players) => {
        this.setState({ players: players });
      }
    });
  }

  render() {
    if (this.state.players) {
      if (this.state.players.length <= 0) {
        return null;
      }
      return (
        <div>
          <h2>在籍プレイヤー</h2>
          <PlayerList players={this.state.players} />
        </div>
      );
    }

    return null;
  }
}
