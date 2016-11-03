import React from 'react';
import MatchList from '../match/MatchList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import {Tabs, Tab} from 'material-ui/Tabs';

export default class PlayerMatchList extends React.Component {


  constructor(props) {
    super(props);
    this.state = { matches: false };
  }

  componentDidMount() {
    Server.Proxy.getMatchesByPlayerId(this.props.player.id).then(matches => {
      this.setState({ matches: matches });
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
