import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import GroupIcon from 'material-ui/svg-icons/social/group';
import HomeIcon from 'material-ui/svg-icons/action/home';
import FaceIcon from 'material-ui/svg-icons/action/face';


export default class Home extends React.Component {

  render() {

    const style = {
      height: 280,
      width: 280,
      display: "inline-block",
      textAlign: "center",
      margin: 20
    };

    const links = [
      { url: 'player', name: 'プレイヤーを探す', icon: <FaceIcon /> },
      { url: 'team', name: 'チームを探す', icon: <GroupIcon /> },
      { url: 'match', name: '試合を探す', icon:  <img src="assets/images/racket.png" /> },
      { url: 'competition', name: '大会を探す', icon: <img src="assets/images/trophy.png" /> }
    ];


    return (
      <Card>
        <CardHeader>
          <h1>DataSoftTennis</h1>
        </CardHeader>
        <p>DataSoftTennisはソフトテニスの試合やプレイヤーのデータを集めたサイトです。</p>
        <h2>Menu</h2>
        <ul>
          {links.map((l) => <li><Link to={l.url} >{l.name}</Link></li>)}
        </ul>
      </Card>
    );
  }
}