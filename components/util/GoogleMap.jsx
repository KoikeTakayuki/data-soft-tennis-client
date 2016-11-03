import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router'


export default class GoogleMap extends React.Component {

  render() {

    const latitude = this.props.latitude;
    const longitude = this.props.longitude;

    return (
      <div style={{textAlign: "center"}}>
        <iframe
          width={320}
          height={320}
          src={"https://www.google.com/maps/embed/v1/place?q=" + latitude + "%2C" + longitude + "&key=AIzaSyDV8sHNXH_YGS1-Eo-I2EKpbFBZwE4-J0g"}
        />
      </div>
    );
  }
}
