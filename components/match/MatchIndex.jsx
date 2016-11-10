import React from 'react';
import MatchList from './MatchList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class MatchIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = { 
      year: 2016,
      competitionTagId: 1,
      competitionTypeId: 1,
      competitionTags: [],
      competitionTypes: [],
      matches: false
    };

    this.onYearChange = this.onYearChange.bind(this);
    this.onCompetitionTagChange = this.onCompetitionTagChange.bind(this);
  }

  componentDidMount() {

    Server.Proxy.getCompetitionTags().then(competitionTags => {
      this.setState({ competitionTags: competitionTags });
    });

    /*Server.Proxy.getCompetitionTypes().then(competitionTypes => {
      console.log(competitionTypes);
      this.setState({ competitionTypes: competitionTypes });
    });*/

    Server.Proxy.getMatches().then(matches => {
      this.setState({ matches: matches });
    });
  }

  onYearChange(e, i, year) {
    this.setState({ year: year });
    this.fetchMatches({
      "competition.year": year,
      "competition.competition_tag_id": this.state.competitionTagId
    });
  }

  onCompetitionTagChange(e, i, competitionTagId) {

    this.setState({ competitionTagId: competitionTagId });
    this.fetchMatches({
      "competition.year": this.state.year,
      "competition.competition_tag_id": competitionTagId
    });
  }

  fetchMatches(condition) {
    Server.Proxy.getMatches(condition).then(matches => {
      this.setState({ matches: matches });
    });
  }


  render() {

    return (
      <Grid>
        <h1 style={{fontSize: 22}}>試合を探す</h1>
        <div style={{marginBottom: "10px", textAlign: "right"}}>
          <DropDownMenu value={this.state.year} onChange={this.onYearChange} style={{width: 140}} autoWidth={false} labelStyle={{fontSize: "16px"}}>
            {[2014, 2015, 2016].map((y) => <MenuItem key={y} value={y} primaryText={y + '年'}/>)}
          </DropDownMenu>
          <br />
          <DropDownMenu value={this.state.competitionTagId} onChange={this.onCompetitionTagChange} style={{width: 170}} autoWidth={false} labelStyle={{fontSize: "16px"}}>
            {this.state.competitionTags.map((t) => <MenuItem key={t.id} value={t.id} primaryText={t.name}/>)}
          </DropDownMenu>
        </div>
        {this.state.matches ? (
            <MatchList matches={this.state.matches} />
          ) : (
            <CircularProgressCenter />
          )
        }
      </Grid>
    );

  }
}