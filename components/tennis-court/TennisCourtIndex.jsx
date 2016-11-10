import React from 'react';
import TennisCourtList from './TennisCourtList'
import Server from '../../config/server';
import { Grid, Row, Col } from 'react-bootstrap';
import Pager from 'react-pager';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router'


export default class TennisCourtIndex extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      tennisCourts: false,
      prefectureId: props.params.prefectureId ? Number(props.params.prefectureId) : undefined,
      prefectures: [],
      pageNumber: 0,
      maxPageNumber: 1,
      count: 0,
      prefectureName: '全国'
    };

    this.onPrefectureChanged = this.onPrefectureChanged.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
    this.fetchTennisCourts = this.fetchTennisCourts.bind(this);
    this.setPrefecture = this.setPrefecture.bind(this);
  }

  setPrefecture(prefectureId) {
    let prefecture = this.state.prefectures.find(p => {
      return p.id === Number(prefectureId);
    });

    this.setState({ prefectureName: (prefecture ? prefecture.name : '全国')});
  }

  fetchTennisCourts(prefectureId, pageNumber, updateRecordCount) {

    Server.Proxy.getTennisCourts({
      "prefecture_id": prefectureId,
      pageNumber: pageNumber
    }).then(tennisCourts => {
      this.setState({ tennisCourts: tennisCourts });
    });

    if (updateRecordCount) {
      Server.Proxy.getTennisCourtCount({
        "prefecture_id": prefectureId
      }).then(count => {

        this.setState({
          count: count,
          maxPageNumber: (count / 4)
        });
      });

      this.setPrefecture(prefectureId);
    }
  }


  componentDidMount() {

      Server.Proxy.getPrefectures().then(prefectures => {
        this.setState({ prefectures: prefectures });
      }).then(() => {
        this.fetchTennisCourts(this.state.prefectureId, this.state.pageNumber, true);
      });
  }

  onPrefectureChanged(e, i, prefectureId) {
    browserHistory.push("/tennis-court" + (prefectureId ? "/prefecture-" + prefectureId : ""));

    this.setState({
      prefectureId: prefectureId,
      pageNumber: 0
    });

    this.fetchTennisCourts(prefectureId, 0, true);
  }

  onPageChanged(pageNumber) {
    pageNumber = Math.ceil(pageNumber);
    this.setState({ pageNumber: pageNumber});
    this.fetchTennisCourts(this.state.prefectureId, pageNumber, false);
  }

  render() {

    let count = this.state.count,
        start = this.state.pageNumber * 4 + 1,
        end = Math.min(count, start + 4 - 1),
        countStyle={ fontSize: 16, fontWeight: 700};

    return (
      <Grid>
        <h1 style={{fontSize: 22}}>{this.state.prefectureName}の会場を探す</h1>
          <div style={{textAlign: "right", marginBottom: "10px"}}>
            <DropDownMenu maxHeight={300} value={this.state.prefectureId} onChange={this.onPrefectureChanged} style={{margin: -20}} labelStyle={{fontSize: "14px"}}>
              <MenuItem value={undefined}  primaryText="都道府県" />{this.state.prefectures.map((p) => <MenuItem key={p.id} value={p.id} primaryText={p.name} />)}
            </DropDownMenu>
          </div>
        {(this.state.tennisCourts && this.state.tennisCourts.length > 0)? (
          <div>
            <div style={{ margin: 12 }}>
              <span style={countStyle}>{count}</span>件中 <span style={countStyle}>{start}</span>件 ~ <span style={countStyle}>{end}</span>件 を表示
            </div>
            <TennisCourtList tennisCourts={this.state.tennisCourts} />
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
        ) : null}
      </Grid>
    );

  }

}