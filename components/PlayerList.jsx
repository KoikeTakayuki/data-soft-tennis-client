import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import ServerConfig from '../config/server-config';
import { CircularProgress } from 'material-ui';

export default class PlayerList extends React.Component {


  constructor(props) {
    super(props);
    this.state = { players: false };
    this.fetchPlayers = this.fetchPlayers.bind(this);
  }

  componentDidMount() {
    this.fetchPlayers();
  }

  fetchPlayers() {
    console.log('fetch start')
    $.ajax({
      url: ServerConfig.URL + 'player',
      dataType: 'json',
      cache: true,
      success: function(players) {
        console.log('finish')
          this.setState({players: players});
      }.bind(this)
    });
  }

  render() {
    if (this.state.players) {
      return (
          <Grid>
            <h2>プレイヤー一覧</h2>
            <Row>{this.state.players.map((p) => <Col xs={12} sm={6} md={3}><PlayerCard player={p} /></Col>)}</Row>
          </Grid>
      );
    }

    return (
      <Grid>
        <h2>プレイヤー一覧</h2>
        <CircularProgress mode="indeterminate" size={60} />
      </Grid>
    );
  }
}
