import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import DetailedPlayerCard from './DetailedPlayerCard';
import PlayerMatchList from './PlayerMatchList';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router'

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
            <h1>{this.state.player.name}</h1>
            <h2>プロフィール</h2>
            <DetailedPlayerCard player={this.state.player} />
            <h2>試合一覧</h2>
            <PlayerMatchList player={this.state.player} />
          </Grid>
        </div>
      );
    }

    return <CircularProgressCenter />
  }
}
