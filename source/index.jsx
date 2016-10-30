import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App';
import Home from '../components/Home';
import Player from '../components/player/Player';
import PlayerIndex from '../components/player/PlayerIndex';
import Team from '../components/team/Team';
import TeamIndex from '../components/team/TeamIndex';
import MatchIndex from '../components//match/MatchIndex';
import Competition from '../components/competition/Competition';
import CompetitionIndex from '../components/competition/CompetitionIndex';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

injectTapEventPlugin();

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/home" component={Home} />
      <Route path="/player" component={PlayerIndex} />
      <Route path="/player/:playerId" component={Player} />
      <Route path="/team" component={TeamIndex}>
        <IndexRoute component="works-team" />
        <Route path="/team/works-team" component="works-team" />
        <Route path="/team/university" component="university" />
        <Route path="/team/high-school" component="high-school" />
        <Route path="/team/junior-high" component="junior-high" />
      </Route>
      <Route path="/team/:teamId" component={Team} />
      <Route path="/match" component={MatchIndex} />
      <Route path="/competition" component={CompetitionIndex} />
      <Route path="/competition/:competitionId" component={Competition} />
    </Route>
  </Router>
), document.getElementById('root'))