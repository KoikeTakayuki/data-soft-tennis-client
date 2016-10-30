import React from 'react';
import TeamList from './TeamList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import {Tabs, Tab} from 'material-ui/Tabs';

export default class TeamIndex extends React.Component {


  constructor(props) {
    super(props);

    const teamDivision = props.children.type;
    this.url = Server.API.getTeamByTeamDivision(teamDivision);
    this.state = { teamDivision: teamDivision };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchTeams(this.url);
  }

  fetchTeams(url) {

    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: (teams) => {
        this.setState({ teams: teams });
      }
    });
  }

  handleChange(teamDivision) {
    this.setState({
      teamDivision: teamDivision
    });

    this.fetchTeams(Server.API.getTeamByTeamDivision(teamDivision));
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
        {this.state.teams ? (
            <TeamList teams={this.state.teams} />
          ) : (
            <CircularProgressCenter />
          )
        }
      </div>
    );

  }
}
