import React from 'react';

import Scrollbar from '../index';

class App extends React.Component {
  handleScroll = (status, scrollbar) => console.log(status, scrollbar);

  render() {
    return (
      <div className="App">
        <h1>SMOOTH-SCROLLBAR-REACT</h1>

        <h4 className="text-center">
          A wrapper for{' '}
          <a href="https://github.com/idiotWu/smooth-scrollbar" target="_blank">
            smooth-scrollbar
          </a>{' '}
          to React Component.
        </h4>

        <div
          className="sample-container"
          style={{ maxHeight: 250, display: 'flex' }}
        >
          <Scrollbar
            innerRef={node => (this.scrollbar = node)}
            onScroll={this.handleScroll}
          >
            {[...Array(50).keys()].map((value, index) => (
              <div key={index}>{value + index}</div>
            ))}
          </Scrollbar>
        </div>

        <Scrollbar>
          <div className="sample-container-2" style={{ maxHeight: 250 }}>
            {[...Array(40).keys()].map((value, index) => (
              <div key={index}>{value + index}</div>
            ))}
          </div>
        </Scrollbar>
      </div>
    );
  }

  componentDidMount() {
    if (this.scrollbar) {
      console.log(this.scrollbar);
    }
  }
}

export default App;
