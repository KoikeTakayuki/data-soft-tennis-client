import React from 'react';
import PlayerList from './PlayerList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter';
import DocumentMeta from 'react-document-meta';

export default class AgeFilteredPlayerIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = { players: false };
  }

  componentDidMount() {
    Server.Proxy.getPlayersByBirthYear(this.props.params.birthYear).then(players => {
      this.setState({ players: players });
    });
  }

  render() {

    let title = this.props.params.birthYear + '年度生まれのプレイヤーを探す - DataSoftTennis ソフトテニスの情報サイト -',
        description = this.props.params.birthYear + '年度生まれのプレイヤーの情報ならDataSoftTennis! DataSoftTennisは、ソフトテニスの選手・チームのデータやスコア、試合動画を紹介するサービスです!',
        keywords = ['ソフトテニス', this.props.params.birthYear + '年度生まれ', 'プレイヤー', 'データ'];

    const meta = {
        title: title,
        description: description,
        meta: {
          charset: 'utf-8',
          name: {
            keywords: keywords.join(',')
          }
        }
      };

    return (
      <Grid>
        <DocumentMeta {...meta} />
        <h1 style={{fontSize: 22}}>{this.props.params.birthYear}年度生まれのプレイヤー</h1>
        {this.state.players ? (
            <PlayerList players={this.state.players} />
          ) : null
        }
      </Grid>
    );

  }
}