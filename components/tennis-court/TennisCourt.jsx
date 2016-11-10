import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import DetailedTennisCourtCard from './DetailedTennisCourtCard';
import TennisCourtCompetitionList from './TennisCourtCompetitionList';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router'
import GoogleMap from '../util/GoogleMap';
import DocumentMeta from 'react-document-meta';

export default class TennisCourt extends React.Component {


  constructor(props) {
    super(props);
    this.state = { tennisCourt: false };
  }

  componentDidMount() {
    Server.Proxy.getTennisCourtById(this.props.params.tennisCourtId).then(tennisCourt => {
      this.setState({ tennisCourt: tennisCourt });
    });
  }

  render() {

    if (this.state.tennisCourt) {

      const tennisCourt = this.state.tennisCourt;

      const meta = {
        title: tennisCourt.name + 'のデータ - DataSoftTennis ソフトテニスの情報サイト -',
        description: tennisCourt.name　+ 'の情報ならDataSoftTennis! DataSoftTennisは、ソフトテニスの選手・チームのデータやスコア、試合動画を紹介するサービスです!',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: [tennisCourt.name, 'ソフトテニス', '会場', '大会', '試合'].join(',')
          }
        }
      };

      return (
        <div>
          <Grid>
            <DocumentMeta {...meta} />
            <h1 style={{fontSize: 22}}>{tennisCourt.name}のデータ</h1>
            <h2>基本情報</h2>
            <DetailedTennisCourtCard tennisCourt={tennisCourt} />
            <h2>地図</h2>
            <Grid>
              <GoogleMap latitude={tennisCourt.latitude} longitude={tennisCourt.longitude} />
            </Grid>
            <h2>この会場で行われた大会</h2>
            <TennisCourtCompetitionList tennisCourt={tennisCourt} />
          </Grid>
        </div>
      );
    }

    return null;
  }
}
