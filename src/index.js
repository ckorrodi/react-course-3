import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './style.css';

class Github extends Component {
  
  state = {
    company: '-'
  };

  componentWillReceiveProps(props) {
    if (props.username) {
      axios({
        url: 'https://api.github.com/graphql',
          method: 'post',
          data: {
              query: `{user(login: "${props.username}") {company}}`
          },
          headers: {Authorization: `bearer 0ba187d97695d606e4cc143d83a8295b32aac1cf`}
      }).then(resp => {
        console.log(resp)
        if (resp.data.data.user) {
          this.setState(({company}) => ({company: resp.data.data.user.company}))
        }
      });
    }
  }

  render() {
    return (
      <p>
        <strong>{this.props.username}</strong> trabalha na <span>{this.state.company}</span>
      </p>
    );
  }
}

class App extends Component {
  state = { username: '' };

  setUsername = val => {
    this.setState(({username}) => ({username: val}));
  }

  render() {
    return (
      <div>
        <label>Username: </label>
        <input type="text" onBlur={(e) => this.setUsername(e.target.value)}/>

        <Github username={this.state.username} />
      </div>
    )
  }
};

render(<App />, document.getElementById('root'));
