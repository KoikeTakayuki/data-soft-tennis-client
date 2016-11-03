import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import CompetitionMatchList from './CompetitionMatchList';
import Server from '../../config/server';
import { CircularProgress } from 'material-ui';
import CircularProgressCenter from '../util/CircularProgressCenter'

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
      return (
        <div>
          <Grid>
            <h2>{this.state.competition.name}</h2>
          </Grid>
          <CompetitionMatchList competition={this.state.competition} />
        </div>
      );
    }

    return null;
  }
}
