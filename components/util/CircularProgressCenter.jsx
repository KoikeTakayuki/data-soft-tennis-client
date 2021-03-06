import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { CircularProgress } from 'material-ui';

export default class CircularProgressCenter extends React.Component {

  render() {

    return (
        <Row><Col md={12} style={{"textAlign": "center", "marginTop": "30px"}}><CircularProgress mode="indeterminate" size={60} /></Col></Row>
    );
  }
}
