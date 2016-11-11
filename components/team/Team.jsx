import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TeamPlayerList from './TeamPlayerList';
import FormerTeamPlayerList from './FormerTeamPlayerList';
import Server from '../../config/server';
import { CircularProgress } from 'material-ui';
import CircularProgressCenter from '../util/CircularProgressCenter';
import DocumentMeta from 'react-document-meta';

export default class Team extends React.Component {


  constructor(props) {
    super(props);
    this.state = { team: false };
  }

  componentDidMount() {
    Server.Proxy.getTeamById(this.props.params.teamId).then(team => {
      this.setState({ team: team });
    });
  }

  render() {
    if (this.state.team) {

      const team = this.state.team;
      const meta = {
        title: team.prefecture.name + '/' + team.name + 'のデータ - DataSoftTennis ソフトテニスの情報サイト -',
        description: team.prefecture.name + ' ' + team.name　+ 'ソフトテニス部の情報ならDataSoftTennis! DataSoftTennisは、ソフトテニスの選手・チームのデータやスコア、試合動画を紹介するサービスです!',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: [team.name, 'ソフトテニス', 'プレイヤー', '試合'].join(',')
          }
        }
      };

      return (
        <Grid>
          <DocumentMeta {...meta} />
          <h1 style={{fontSize: 22}}>{team.name}のデータ</h1>
          <div style={{ marginLeft: 10 }}>{team.prefecture.name}/{team.team_division.name}</div>
          <TeamPlayerList team={team} />
          <FormerTeamPlayerList team={team} />
        </Grid>
      );
    }

    return null;
  }
}
