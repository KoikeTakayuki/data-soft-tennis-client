import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import GroupIcon from 'material-ui/svg-icons/social/group';
import HomeIcon from 'material-ui/svg-icons/action/home';
import FaceIcon from 'material-ui/svg-icons/action/face';
import { hashHistory } from 'react-router'


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { showDrawer: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onDrawerMenuItemClicked = this.onDrawerMenuItemClicked.bind(this);
  }

  toggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  onDrawerMenuItemClicked(url) {
    hashHistory.push(url);
    this.setState({showDrawer: false});
  }

  render() {
    const links = [
      { url: 'home', name: 'HOME', icon: <HomeIcon /> },
      { url: 'player', name: 'プレイヤーを探す', icon: <FaceIcon /> },
      { url: 'team', name: 'チームを探す', icon: <GroupIcon /> },
      { url: 'match', name: '試合を探す', icon:  <img src="assets/images/racket.png" /> },
      { url: 'competition', name: '大会を探す', icon: <img src="assets/images/trophy.png" /> }
    ];

    const drawerMenus = links.map((l) => (
      <MenuItem key={l.url} onTouchTap={() => {this.onDrawerMenuItemClicked(l.url)}} leftIcon={l.icon}>{l.name}</MenuItem>
    ));


    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar
            title="DataSoftTennis"
            onLeftIconButtonTouchTap={this.toggleDrawer} />
          <Drawer
            docked={false}
            open={this.state.showDrawer}
            onRequestChange={this.toggleDrawer}
          >
            {drawerMenus}
          </Drawer>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}