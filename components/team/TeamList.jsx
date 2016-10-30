import React from 'react';
import DataList from '../DataList';
import TeamCard from './TeamCard';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { Link } from 'react-router'

export default class TeamList extends DataList {


  constructor(props) {
    const teamDivision = props.children.type;
    const url = Server.API.getTeamByTeamDivision(teamDivision);

    super(props, url);
    this.state.teamDivision = teamDivision;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(teamDivision) {
    this.setState({
      teamDivision: teamDivision
    });

    this.fetchData(Server.API.getTeamByTeamDivision(teamDivision));
  }

  render() {

    return (
      <div>
        <Tabs
          value={this.state.teamDivision}
          onChange={this.handleChange} >
          <Tab label="実業団" value="works-team" />
          <Tab label="大学" value="university" />
          <Tab label="高校" value="high-school" />
        </Tabs>
        <Grid>
          <h2>チーム一覧</h2>
          {this.state.data ? (
              <Row>{this.state.data.map((t) => <Col xs={12} sm={6} md={6} lg={3}><TeamCard team={t} /></Col>)}</Row>
            ) : (
              <CircularProgressCenter />
            )
          }
        </Grid>
      </div>
    );

  }
}
