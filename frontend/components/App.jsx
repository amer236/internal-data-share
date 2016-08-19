import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TopBar from './TopBar.jsx';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

class App extends React.Component {
  handleTouchTap() {
    alert('hello');
  }

  render() {
    var paperStyle = {
      width: '90%',
      margin: 'auto',
      marginTop: 10
    };

    return <div>
      <TopBar/>
        <Paper style={paperStyle} zDepth={1}>
          <FlatButton />
        </Paper>
    </div>;
  }
}

export default App;