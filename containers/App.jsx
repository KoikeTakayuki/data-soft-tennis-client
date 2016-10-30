import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { showDrawer: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  render() {

    const links = [
      { url: 'home', name: 'HOME'},
      { url: 'player', name: 'プレイヤーを探す'},
      { url: 'team', name: 'チームを探す'},
      { url: 'match', name: '試合を探す'},
      { url: 'competition', name: '大会を探す'}
    ];

    const drawerMenus = links.map((l) => (
      <Link to={l.url} eventName="onTouchTap"><MenuItem onTouchTap={this.toggleDrawer}>{l.name}</MenuItem></Link>
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