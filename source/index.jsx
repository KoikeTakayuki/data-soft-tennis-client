import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App';
import Home from '../components/Home';
import PlayerList from '../components/PlayerList';
import TeamList from '../components/TeamList';
import Match from '../components/Match';
import Competition from '../components/Competition';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

injectTapEventPlugin();

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/home" component={Home} />
      <Route path="/player" component={PlayerList} />
      <Route path="/team" component={TeamList}>
        <IndexRoute component="works-team" />
        <Route path="/team/works-team" component="works-team" />
        <Route path="/team/university" component="university" />
        <Route path="/team/high-school" component="high-school" />
        <Route path="/team/junior-high" component="junior-high" />
      </Route>
      <Route path="/match" component={Match} />
      <Route path="/competition" component={Competition} />
    </Route>
  </Router>
), document.getElementById('root'))