import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router'

export default class DetailedPlayerCard extends React.Component {

  render() {
    const player = this.props.player;

    return (
      <Table>
        <TableBody displayRowCheckbox={false} selectable={false}>
          <TableRow selectable={false}>
            <TableRowColumn>利き腕</TableRowColumn>
            <TableRowColumn>{player.is_lefty ? '左' : '右'}</TableRowColumn>
          </TableRow>
          <TableRow selectable={false}>
            <TableRowColumn>所属</TableRowColumn>
            <TableRowColumn><Link to={"/team/" + player.current_team.id}>{player.current_team.name}</Link></TableRowColumn>
          </TableRow>
          <TableRow selectable={false}>
            <TableRowColumn>世代</TableRowColumn>
            <TableRowColumn><Link to={"/player/birth-year/" + player.birth_year}>{player.birth_year}年生まれ</Link></TableRowColumn>
          </TableRow>
          <TableRow selectable={false}>
            <TableRowColumn>中学校</TableRowColumn>
            <TableRowColumn><Link to={"/team/" + player.junior_high_team.id}>{player.junior_high_team.name}</Link></TableRowColumn>
          </TableRow>
          <TableRow selectable={false}>
            <TableRowColumn>高校</TableRowColumn>
            <TableRowColumn><Link to={"/team/" + player.high_school_team.id}>{player.high_school_team.name}</Link></TableRowColumn>
          </TableRow>
          <TableRow selectable={false}>
            <TableRowColumn>大学</TableRowColumn>
            <TableRowColumn><Link to={"/team/" + player.university_team.id}>{player.university_team.name}</Link></TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
