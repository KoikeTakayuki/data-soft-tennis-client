import React from 'react';
import MatchList from '../match/MatchList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import {Tabs, Tab} from 'material-ui/Tabs';

export default class PlayerMatchList extends React.Component {


  constructor(props) {
    super(props);
    const playerId = this.props.player.id;
    this.url = Server.API.getMatchesByPlayerId(playerId);
    this.state = { matches: false };
  }

  componentDidMount() {
    this.fetchMatches(this.url);
  }

  fetchMatches(url) {

    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: (matches) => {
        this.setState({ matches: matches });
      }
    });
  }

  render() {

    if (this.state.matches) {
      if (this.state.matches.length <= 0) {
        return null;
      }

      return (
        <div>
          <MatchList matches={this.state.matches} />
        </div>
      );
    }

    return <CircularProgressCenter />;
  }
}
