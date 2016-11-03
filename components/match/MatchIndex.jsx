import React from 'react';
import MatchList from './MatchList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class MatchIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = { matches: false };
  }

  componentDidMount() {
    Server.Proxy.getMatches().then(matches => {
      this.setState({ matches: matches });
    });
  }

  render() {

    return (
      <Grid>
        <h1>試合一覧</h1>
        {this.state.matches ? (
            <MatchList matches={this.state.matches} />
          ) : (
            <CircularProgressCenter />
          )
        }
      </Grid>
    );

  }
}