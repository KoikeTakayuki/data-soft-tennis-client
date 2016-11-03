import React from 'react';
import CompetitionList from '../competition/CompetitionList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class TennisCourtCompetitionList extends React.Component {


  constructor(props) {
    super(props);
    this.state = { competitions: false };
  }

  componentDidMount() {
    Server.Proxy.getCompetitionsByPlayerTennisCourtId(this.props.tennisCourt.id).then(competitions => {
      this.setState({ competitions: competitions });
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
