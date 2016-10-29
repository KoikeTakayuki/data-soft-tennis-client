import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App';
import Home from '../components/Home';
import PlayerList from '../components/PlayerList';
import Team from '../components/Team';
import Match from '../components/Match';
import Competition from '../components/Competition';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import { Router, Route, hashHistory } from 'react-router'

injectTapEventPlugin();

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/home" component={Home} />
      <Route path="/player" component={PlayerList} />
      <Route path="/team" component={Team} />
      <Route path="/match" component={Match} />
      <Route path="/competition" component={Competition} />
    </Route>
  </Router>
), document.getElementById('root'))