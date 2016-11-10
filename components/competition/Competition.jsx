import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import CompetitionMatchList from './CompetitionMatchList';
import Server from '../../config/server';
import { CircularProgress } from 'material-ui';
import CircularProgressCenter from '../util/CircularProgressCenter'
import DocumentMeta from 'react-document-meta';

export default class Competition extends React.Component {


  constructor(props) {
    super(props);
    this.state = { competition: false };
  }

  componentDidMount() {
    Server.Proxy.getCompetitionById(this.props.params.competitionId).then(competition => {
      this.setState({ competition: competition });
    });
  }

  render() {
    if (this.state.competition) {

      const competition = this.state.competition;

      const meta = {
        title: competition.name + 'のデータ - DataSoftTennis ソフトテニスの情報サイト -',
        description: competition.name　+ 'の情報ならDataSoftTennis! DataSoftTennisは、ソフトテニスの選手・チームのデータやスコア、試合動画を紹介するサービスです!',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: [competition.name, 'ソフトテニス', '試合'].join(',')
          }
        }
      };


      return (
        <div>
          <Grid>
            <DocumentMeta {...meta} />
            <h1 style={{fontSize:30}}>{competition.name}のデータ</h1>
          </Grid>
          <CompetitionMatchList competition={competition} />
        </div>
      );
    }

    return null;
  }
}
