import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import { CircularProgress } from 'material-ui';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class Player extends React.Component {


  constructor(props) {
    super(props);
    const playerId = props.params.playerId;
    this.url = Server.API.getPlayerById(playerId);
    this.state = { player: false };
  }

  componentDidMount() {
    this.fetchPlayer(this.url);
  }

  fetchPlayer(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: (player) => {
        this.setState({ player: player });
      }
    });
  }

  render() {
    if (this.state.player) {
      return (
        <div>
          <Grid>
            <h2>{this.state.player.name}</h2>
          </Grid>
        </div>
      );
    }

    return <CircularProgressCenter />
  }
}
