import React from 'react';
import CompetitionList from './CompetitionList';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class CompetitionIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = { competitions: false };
  }

  componentDidMount() {
    this.fetchCompetitions(Server.API.getCompetitions());
  }

  fetchCompetitions(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: (competitions) => {
        this.setState({ competitions: competitions });
      }
    });
  }

  render() {

    return (
      <div>
        {this.state.competitions ? (
            <CompetitionList competitions={this.state.competitions} />
          ) : (
            <CircularProgressCenter />
          )
        }
      </div>
    );

  }
}