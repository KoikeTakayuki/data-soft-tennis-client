import React from 'react';
import TeamList from './TeamList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import RaisedButton from 'material-ui/RaisedButton';

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
            <div style={{ textAlign: "center", marginBottom: "10px"}}>{teamDivisions.map((t) => <RaisedButton style={{ margin: "3px", width: "120px" }} onTouchTap={() => this.handleChange(t.id)} key={t.id} label={t.name} labelStyle={{fontSize: "18px"}} secondary={this.state.teamDivision === t.id}/>)}</div>
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
