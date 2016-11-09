import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App';
import Home from '../components/Home';
import Player from '../components/player/Player';
import AgeFilteredPlayerIndex from '../components/player/AgeFilteredPlayerIndex';
import PlayerIndex from '../components/player/PlayerIndex';
import Team from '../components/team/Team';
import TeamIndex from '../components/team/TeamIndex';
import Match from '../components//match/Match';
import MatchIndex from '../components//match/MatchIndex';
import Competition from '../components/competition/Competition';
import CompetitionIndex from '../components/competition/CompetitionIndex';
import TennisCourt from '../components/tennis-court/TennisCourt';
import TennisCourtIndex from '../components/tennis-court/TennisCourtIndex';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

injectTapEventPlugin();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="player/birth-year/:birthYear" component={AgeFilteredPlayerIndex} />
      <Route path="player" component={PlayerIndex} />
      <Route path="player/prefecture-:prefectureId" component={PlayerIndex} />
      <Route path="player/prefecture-:prefectureId/team-division-:teamDivisionId" component={PlayerIndex} />
      <Route path="player/team-division-:teamDivisionId" component={PlayerIndex} />
      <Route path="player/:playerId" component={Player} />
      <Route path="team" component={TeamIndex} />
      <Route path="team/prefecture-:prefectureId" component={TeamIndex} />
      <Route path="team/prefecture-:prefectureId/team-division-:teamDivisionId" component={TeamIndex} />
      <Route path="team/team-division-:teamDivisionId" component={TeamIndex} />
      <Route path="team/:teamId" component={Team} />
      <Route path="match" component={MatchIndex} />
      <Route path="match/:matchId" component={Match} />
      <Route path="competition" component={CompetitionIndex} />
      <Route path="competition/:competitionId" component={Competition} />
      <Route path="tennis-court" component={TennisCourtIndex} />
      <Route path="tennis-court/prefecture-:prefectureId" component={TennisCourtIndex} />
      <Route path="tennis-court/:tennisCourtId" component={TennisCourt} />
    </Route>
  </Router>
), document.getElementById('root'))