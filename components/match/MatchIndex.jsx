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
    this.fetchMatches(Server.API.getMatches());
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