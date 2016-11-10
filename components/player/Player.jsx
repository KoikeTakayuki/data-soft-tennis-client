import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import DetailedPlayerCard from './DetailedPlayerCard';
import PlayerMatchList from './PlayerMatchList';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router'
import DocumentMeta from 'react-document-meta';

export default class Player extends React.Component {


  constructor(props) {
    super(props);
    this.state = { player: false };
  }

  componentDidMount() {
    Server.Proxy.getPlayerById(this.props.params.playerId).then(player => {
      this.setState({ player: player });
    });
  }

  render() {

    if (this.state.player) {

      const player = this.state.player;


      const meta = {
        title: player.name + '選手のデータ - DataSoftTennis ソフトテニスの情報サイト -',
        description: player.current_team.name + ' ' + player.name + '選手の情報ならDataSoftTennis! DataSoftTennisは、ソフトテニスの選手・チームのデータやスコア、試合動画を紹介するサービスです!',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: [player.name, player.current_team.name, 'ソフトテニス', '出身校', '試合'].join(',')
          }
        }
      };

      return (
        <div>
          <Grid>
            <DocumentMeta {...meta} />
            <h1 style={{fontSize: 30}}>{player.name}選手のデータ</h1>
            <h2>プロフィール</h2>
            <DetailedPlayerCard player={this.state.player} />
            <h2>試合一覧</h2>
            <PlayerMatchList player={this.state.player} />
          </Grid>
        </div>
      );
    }

    return null;
  }
}
