import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerCard from '../player/PlayerCard';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class FormerTeamPlayerList extends React.Component {


  constructor(props) {
    super(props);
    const team = props.team;
    this.url = Server.API.getFormerPlayersByTeamId(team.id);
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
          <h3>過去に在籍していたプレイヤー</h3>
          <Row>{this.state.players.map((p) => <Col xs={12} sm={12} md={6}><PlayerCard player={p} /></Col>)}</Row>
        </Grid>
      );
    }

    return <CircularProgressCenter />
  }
}
