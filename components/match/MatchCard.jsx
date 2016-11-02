import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'


export default class MatchCard extends React.Component {

  render() {
    const match = this.props.match;
    const youtubeUrl = match.url;
    const youtubeId = youtubeUrl.substring(youtubeUrl.indexOf('?v=') + 3);
    const thumbnailUrl = 'http://i.ytimg.com/vi/' + youtubeId + '/sddefault.jpg';

    return (
      <Card>
        <CardText style={{ height: 60 }}>
          {match.title}
        </CardText>
        <CardMedia>
          <img src={thumbnailUrl} />
        </CardMedia>
        <CardActions>
          <Link to={"match/" + match.id}>
            <FlatButton label="詳細を見る" />
          </Link>
        </CardActions>
      </Card>
    );
  }
}