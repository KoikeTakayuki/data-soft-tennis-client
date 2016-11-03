import React from 'react';
import CompetitionList from '../competition/CompetitionList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class TennisCourtCompetitionList extends React.Component {


  constructor(props) {
    super(props);
    const tennisCourtId = this.props.tennisCourt.id;
    this.url = Server.API.getCompetitionsByPlayerTennisCourtId(tennisCourtId);
    this.state = { competitions: false };
  }

  componentDidMount() {
    this.fetchCompetitions(this.url);
  }

  fetchCompetitions(url) {

    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: (competitions) => {
        this.setState({ competitions: competitions });
      }
    });
  }

  render() {

    if (this.state.competitions) {
      if (this.state.competitions.length <= 0) {
        return null;
      }

      return (
        <div>
          <CompetitionList competitions={this.state.competitions} />
        </div>
      );
    }

    return null;
  }
}
