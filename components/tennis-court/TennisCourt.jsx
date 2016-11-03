import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import DetailedTennisCourtCard from './DetailedTennisCourtCard';
import TennisCourtCompetitionList from './TennisCourtCompetitionList';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router'
import DocumentMeta from 'react-document-meta';
import GoogleMap from '../util/GoogleMap'

export default class TennisCourt extends React.Component {


  constructor(props) {
    super(props);
    const tennisCourtId = props.params.tennisCourtId;
    this.url = Server.API.getTennisCourtById(tennisCourtId);
    this.state = { tennisCourt: false };
  }

  componentDidMount() {
    this.fetchTennisCourt(this.url);
  }

  fetchTennisCourt(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: (tennisCourt) => {
        this.setState({ tennisCourt: tennisCourt });
      }
    });
  }

  render() {

    if (this.state.tennisCourt) {

      const tennisCourt = this.state.tennisCourt;
      return (
        <div>
          <Grid>
            <h1>{tennisCourt.name}</h1>
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
