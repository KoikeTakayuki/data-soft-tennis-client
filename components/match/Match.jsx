import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router';
import ReactPlayer from 'react-player'
import DocumentMeta from 'react-document-meta';

export default class Match extends React.Component {


  constructor(props) {
    super(props);
    this.state = { match: false };
  }

  componentDidMount() {
    Server.Proxy.getMatchById(this.props.params.matchId).then(match => {
      this.setState({ match: match });
    });
  }

  render() {
    if (this.state.match) {
      const match = this.state.match;
      const tableHeaderStyle = {width:"23%", textAlign:"center"};

      const meta = {
        title: match.title + 'のデータ - DataSoftTennis ソフトテニスの情報サイト -',
        description: match.title　+ 'の情報ならDataSoftTennis! DataSoftTennisは、ソフトテニスの選手・チームのデータやスコア、試合動画を紹介するサービスです!',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: ['ソフトテニス', '試合', match.player1.name, match.player2.name, match.player3.name, match.player4.name, match.competition.name, match.round.name, match.tennis_court.name].join(',')
          }
        }
      };


      return (
        <Grid>
          <DocumentMeta {...meta} />
          <h1 style={{fontSize: 20}}>{match.title}</h1>
          <div>
            <ReactPlayer url={match.url} width="100%" height="300px" style={{maxWidth: 640}} />
            <p>会場: <Link to={"/tennis-court/" + match.tennis_court.id}>{match.tennis_court.name}</Link></p>
            <Table>
              <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={tableHeaderStyle}><Link to={"/player/" + match.player1.id}>{match.player1.name}</Link></TableHeaderColumn>
                  <TableHeaderColumn style={tableHeaderStyle}><Link to={"/player/" + match.player2.id}>{match.player2.name}</Link></TableHeaderColumn>
                  <TableHeaderColumn style={{width:"8%", marginLeft:"-10px"}}><div>対</div></TableHeaderColumn>
                  <TableHeaderColumn style={tableHeaderStyle}><Link to={"/player/" + match.player3.id}>{match.player3.name}</Link></TableHeaderColumn>
                  <TableHeaderColumn style={tableHeaderStyle}><Link to={"/player/" + match.player4.id}>{match.player4.name}</Link></TableHeaderColumn>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
        </Grid>
      );
    }

    return <div />;
  }
}
