import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App';
import Home from '../components/Home';
import PlayerList from '../components/player/PlayerList';
import TeamList from '../components/team/TeamList';
import MatchList from '../components//match/MatchList';
import Competition from '../components/competition/Competition';
import CompetitionList from '../components/competition/CompetitionList';
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
      <Route path="/match" component={MatchList} />
      <Route path="/competition" component={CompetitionList} />
      <Route path="/competition/:competitionId" component={Competition} />
    </Route>
  </Router>
), document.getElementById('root'))