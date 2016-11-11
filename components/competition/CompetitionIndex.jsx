import React from 'react';
import CompetitionList from './CompetitionList';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import { Grid, Row, Col } from 'react-bootstrap';
import Pager from 'react-pager';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router'

export default class CompetitionIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      competitions: false,
      competitionTagId: props.params.competitionTagId ? Number(props.params.competitionTagId) : undefined,
      competitionTags: [],
      pageNumber: 0,
      maxPageNumber: 0,
      count: 0
    };

    this.onCompetitionTagChanged = this.onCompetitionTagChanged.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  componentDidMount() {
    Server.Proxy.getCompetitions().then(competitions => {
      this.setState({ competitions: competitions });
    });
    Server.Proxy.getCompetitionCount().then(count => {
      this.setState({
        count: count,
        maxPageNumber: (count / 4)
      });
    });
    Server.Proxy.getCompetitionTags().then(competitionTags => {
      this.setState({ competitionTags: competitionTags });
    });
  }

  onCompetitionTagChanged(i, e, competitionTagId) {
    browserHistory.push("/competition" + (competitionTagId ? "/competition-tag-" + competitionTagId : ""));

    this.setState({
      competitionTagId: competitionTagId,
      pageNumber: 0
    });
    Server.Proxy.getCompetitions({
      competition_tag_id: competitionTagId,
      pageNumber: 0
    }).then(competitions => {
      this.setState({ competitions: competitions });
    });
    Server.Proxy.getCompetitionCount({ competition_tag_id: competitionTagId }).then(count => {
      this.setState({
        count: count,
        maxPageNumber: (count / 4)
      });
    });
  }

  onPageChanged(pageNumber) {
    this.setState({pageNumber: pageNumber });

    Server.Proxy.getCompetitions({
      competition_tag_id: this.state.competitionTagId,
      pageNumber: pageNumber
    }).then(competitions => {
      this.setState({ competitions: competitions });
    });

  }

  render() {

    let count = this.state.count,
        start = this.state.pageNumber * 4 + 1,
        end = Math.min(count, start + 4 - 1),
        countStyle={ fontSize: 16, fontWeight: 700};


    return (
      <Grid>
        <h1 style={{fontSize: 22}}>大会を探す</h1>
          <div style={{textAlign: "right", marginBottom: "10px"}}>
            <DropDownMenu maxHeight={300} value={this.state.competitionTagId} onChange={this.onCompetitionTagChanged} labelStyle={{fontSize: "14px"}}>
              <MenuItem value={undefined}  primaryText="大会名" />{this.state.competitionTags.map((c) => <MenuItem key={c.id} value={c.id} primaryText={c.name} />)}
            </DropDownMenu>
          </div>
        {(this.state.competitions && this.state.competitions.length > 0) ? (
            <div>
              <div style={{ margin: 12 }}>
                <span style={countStyle}>{count}</span>件中 <span style={countStyle}>{start}</span>件 ~ <span style={countStyle}>{end}</span>件 を表示
              </div>
              <CompetitionList competitions={this.state.competitions} />
              {this.state.maxPageNumber > 1 ? (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <Pager
                    total={this.state.maxPageNumber}
                    current={this.state.pageNumber}
                    visiblePages={3}
                    titles={{ first: '<<|', last: '|>>︎' }}
                    onPageChanged={this.onPageChanged}
                  />
                </div>
              ) : null
            }
            </div>
          ) : null
        }
      </Grid>
    );

  }
}