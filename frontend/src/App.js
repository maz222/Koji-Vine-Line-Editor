import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Game from './components/Game';
import Config from './config.json';
import { GlobalContext } from './GlobalContext';

const Container = styled.div`
    padding: 0;
    margin: 0;
`;

class App extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = {};
  }

  render() {
    return (
      <Container>
        <ThemeProvider theme={Config}>
          <GlobalContext.Provider value={Config}>
            <Game />
          </GlobalContext.Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default App;
