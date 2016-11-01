import React from 'react';
import TeamList from './TeamList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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

  handleChange(e, i, teamDivision) {

    this.setState({
      teamDivision: teamDivision
    });

    this.fetchTeams(Server.API.getTeamByTeamDivision(teamDivision));
  }

  render() {

    const teamDivisions = [
      { name: '実業団', id: 'works-team' },
      { name: '大学', id: 'university' },
      { name: '高校', id: 'high-school' },
      { name: '中学', id: 'junior-high' }
    ];

    return (
      <div>
        <Grid>
          <h1>チーム一覧</h1>
          <div style={{textAlign: "right", marginBottom: "10px"}}>
            <DropDownMenu value={this.state.teamDivision} onChange={this.handleChange} labelStyle={{fontSize: "18px"}}>
              {teamDivisions.map((t) => <MenuItem key={t.id} value={t.id} primaryText={t.name}/>)}
            </DropDownMenu>
          </div>
          {this.state.teams ? (
              <TeamList teams={this.state.teams} />
            ) : (
              <CircularProgressCenter />
            )
          }
        </Grid>
      </div>
    );

  }
}
