import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router';
import ReactPlayer from 'react-player'

export default class Match extends React.Component {


  constructor(props) {
    super(props);
    const matchId = props.params.matchId;
    this.url = Server.API.getMatchById(matchId);
    this.state = { match: false };
  }

  componentDidMount() {
    this.fetchMatch(this.url);
  }

  fetchMatch(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: (match) => {
        this.setState({ match: match });
      }
    });
  }

  render() {
    if (this.state.match) {
      const match = this.state.match;

      return (
        <Grid>
          <h1 style={{fontSize: "14px"}}>{match.title}</h1>
          <div>
            <ReactPlayer url={match.url} width="100%" height="300px" style={{maxWidth: "640"}} />
            <p>会場: {match.tennis_court_name}</p>
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn><Link to={"player/" + match.player1_id}>{match.player1_name}</Link></TableHeaderColumn>
                  <TableHeaderColumn><Link to={"player/" + match.player2_id}>{match.player2_name}</Link></TableHeaderColumn>
                  <TableHeaderColumn>対</TableHeaderColumn>
                  <TableHeaderColumn><Link to={"player/" + match.player3_id}>{match.player3_name}</Link></TableHeaderColumn>
                  <TableHeaderColumn><Link to={"player/" + match.player4_id}>{match.player4_name}</Link></TableHeaderColumn>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
        </Grid>
      );
    }

    return null;
  }
}
