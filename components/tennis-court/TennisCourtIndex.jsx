import React from 'react';
import TennisCourtList from './TennisCourtList'
import Server from '../../config/server';
import { Grid, Row, Col } from 'react-bootstrap';

export default class TennisCourtIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = { tennisCourts: false };
  }

  componentDidMount() {
    this.fetchTennisCourts(Server.API.getTennisCourts());
  }

  fetchTennisCourts(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: (tennisCourts) => {
        this.setState({ tennisCourts: tennisCourts });
      }
    });
  }

  render() {

    return (
      <Grid>
        <h1>会場一覧</h1>
        {this.state.tennisCourts ? (
            <TennisCourtList tennisCourts={this.state.tennisCourts} />
          ) : null
        }
      </Grid>
    );

  }
}