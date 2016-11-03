import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router'


export default class DetailedTennisCourtCard extends React.Component {

  render() {
    const tennisCourt = this.props.tennisCourt;

    return (
      <Table>
        <TableBody displayRowCheckbox={false} selectable={false}>
          <TableRow selectable={false}>
            <TableRowColumn>住所</TableRowColumn>
            <TableRowColumn>{tennisCourt.prefecture.name + tennisCourt.address}</TableRowColumn>
          </TableRow>
          <TableRow selectable={false}>
            <TableRowColumn>電話番号</TableRowColumn>
            <TableRowColumn>{tennisCourt.phone_number}</TableRowColumn>
          </TableRow>
          {tennisCourt.url ? (
            <TableRow selectable={false}>
              <TableRowColumn>URL</TableRowColumn>
              <TableRowColumn><a href={tennisCourt.url} target="_blank" rel="nofollow">{tennisCourt.url}</a></TableRowColumn>
            </TableRow>
            ) : null
          }
        </TableBody>
      </Table>
    );
  }
}
