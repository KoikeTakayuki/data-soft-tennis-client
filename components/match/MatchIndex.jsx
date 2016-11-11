import React from 'react';
import MatchList from './MatchList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgressCenter from '../util/CircularProgressCenter';
import Pager from 'react-pager';
import DocumentMeta from 'react-document-meta';

export default class MatchIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = { 
      year: props.params.year ? Number(props.params.year) : undefined,
      competitionTagId: props.params.competitionTagId ? Number(props.params.competitionTagId) : undefined,
      competitionTags: [],
      pageNumber: 0,
      maxPageNumber: 1,
      count: 0,
      matches: false,
      competitionTagName: ''
    };

    this.onYearChanged = this.onYearChanged.bind(this);
    this.onCompetitionTagChanged = this.onCompetitionTagChanged.bind(this);
    this.fetchMatches = this.fetchMatches.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  componentDidMount() {;
    Server.Proxy.getCompetitionTags().then(competitionTags => {
      this.setState({ competitionTags: competitionTags });
    }).then(() => {
      this.fetchMatches(this.state.year, this.state.competitionTagId, 0, true);
    });
  }

  fetchMatches(year, competitionTagId, pageNumber, updateRecordCount) {

    Server.Proxy.getMatches({
      "competition.competition_tag_id": competitionTagId,
      "competition.year": year,
      pageNumber: pageNumber
    }).then(matches => {
      this.setState({ matches: matches });
    });

    if (updateRecordCount) {
      Server.Proxy.getMatchCount({
        "competition.competition_tag_id": competitionTagId,
        "competition.year": year
      }).then(count => {

        this.setState({
          count: count,
          maxPageNumber: (count / 4)
        });
      });

      this.setCompetitionTag(competitionTagId);
    }
  }

  setCompetitionTag(competitionTagId) {
    let competitionTag = this.state.competitionTags.find(c => {
      return c.id === Number(competitionTagId);
    });

    this.setState({ competitionTagName: (competitionTag ? competitionTag.name : '')});
  }


  onYearChanged(e, i, year) {
    this.setState({
      year: year,
      pageNumber: 0
    });
    this.fetchMatches(year, this.state.competitionTagId, 0, true);
  }

  onCompetitionTagChanged(e, i, competitionTagId) {

    this.setState({
      competitionTagId: competitionTagId,
      pageNumber: 0
    });
    this.fetchMatches(this.state.year, competitionTagId, 0, true);
  }

  onPageChanged(pageNumber) {
    pageNumber = Math.ceil(pageNumber);
    this.setState({ pageNumber: pageNumber});
    this.fetchMatches(this.state.year, this.state.competitionTagId, pageNumber, false);
  }

  render() {


    let count = this.state.count,
        start = this.state.pageNumber * 4 + 1,
        end = Math.min(count, start + 4 - 1),
        countStyle={ fontSize: 16, fontWeight: 700};

    let title = '試合を探す',
        description = '試合の情報ならDataSoftTennis! DataSoftTennisは、ソフトテニスの選手・チームのデータやスコア、試合動画を紹介するサービスです!',
        keywords = ['ソフトテニス', '試合', '大会'];

    if (this.state.competitionTagName) {
      title = this.state.competitionTagName + 'の' + title;
      description = this.state.competitionTagName + 'の' + description;
      keywords.unshift(this.state.competitionTagName);
    }

    if (this.state.year) {
      title = this.state.year + '年の' + title;
      description = this.state.year + '年の' + description;
      keywords.unshift(this.state.year + '年');
    }

    const meta = {
        title: title + ' - DataSoftTennis ソフトテニスの情報サイト -',
        description: description,
        meta: {
          charset: 'utf-8',
          name: {
            keywords: keywords.join(',')
          }
        }
      };

    return (
      <Grid>
        <DocumentMeta {...meta} />
        <h1 style={{fontSize: 22}}>{title}</h1>
        <div style={{marginBottom: "10px", textAlign: "right"}}>
          <DropDownMenu value={this.state.year} onChange={this.onYearChanged} style={{width: 140}} autoWidth={false} labelStyle={{fontSize: "16px"}}>
            <MenuItem value={undefined} primaryText='年を指定'/>{[2014, 2015, 2016].map((y) => <MenuItem key={y} value={y} primaryText={y + '年'}/>)}
          </DropDownMenu>
          <br />
          <DropDownMenu value={this.state.competitionTagId} onChange={this.onCompetitionTagChanged} style={{width: 170}} autoWidth={false} labelStyle={{fontSize: "16px"}}>
            <MenuItem value={undefined} primaryText='大会を指定'/>{this.state.competitionTags.map((t) => <MenuItem key={t.id} value={t.id} primaryText={t.name}/>)}
          </DropDownMenu>
        </div>
        {this.state.matches ? (
          <div>
            <div style={{ margin: 12 }}>
              <span style={countStyle}>{count}</span>件中 <span style={countStyle}>{start}</span>件 ~ <span style={countStyle}>{end}</span>件 を表示
            </div>
            <MatchList matches={this.state.matches} />
            {(this.state.maxPageNumber > 1) ? (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <Pager
                  total={this.state.maxPageNumber}
                  current={this.state.pageNumber}
                  visiblePages={3}
                  titles={{ first: '<<|', last: '|>>︎' }}
                  onPageChanged={this.onPageChanged} />
              </div>
            ) : null}
          </div>
          ) : (
            <CircularProgressCenter />
          )
        }
      </Grid>
    );

  }
}