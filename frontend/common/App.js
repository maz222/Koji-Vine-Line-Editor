import React from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import CustomVCC from '@withkoji/custom-vcc-sdk';

const Container = styled.div`
    background-color: ${() => Koji.config.colors.backgroundColor};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: ${() => Koji.config.colors.textColor};
    text-align: center;
`;

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Content = styled.div`
  padding-bottom: 8px;
`;

const Icon = styled.div`
    animation: ${AppLogoSpin} infinite 20s linear;
    height: 50vmin;
    width: 50vmin;
    pointer-events: none;
    background-image: url(${() => Koji.config.images.icon});
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 16px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { value: '' };
    this.customVCC = new CustomVCC();
  }

    componentDidMount() {
        this.customVCC.register('300', '300');
        this.customVCC.onUpdate(({ value }) => {
            this.setState({ value });
        });
    }

  render() {
    return (
      <Container>
        <textarea
            onChange={(e) => {
            this.setState({ value: JSON.parse(e.currentTarget.value) });
            }}
            value={JSON.stringify(this.state.value)}
        />
      </Container>
    );
  }
}

export default App;
