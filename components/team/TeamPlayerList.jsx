import React from 'react';
import DataList from '../DataList';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerCard from '../player/PlayerCard';
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
      return (
        <Grid>
          <h2>所属プレイヤー一覧</h2>
          <Row>{this.state.players.map((p) => <Col xs={12} sm={12} md={6}><PlayerCard player={p} /></Col>)}</Row>
        </Grid>
      );
    }

    return <CircularProgressCenter />
  }
}
