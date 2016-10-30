import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import ServerConfig from '../config/server-config';
import { CircularProgress } from 'material-ui';

export default class DataList extends React.Component {


  constructor(props, url) {
    super(props);
    this.url = url;
    this.state = { data: false };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.url);
  }

  fetchData(url) {

    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: function(data) {
          this.setState({data: data});
      }.bind(this)
    });
  }
}
