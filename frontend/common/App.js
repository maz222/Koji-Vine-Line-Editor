import React from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import CustomVCC from '@withkoji/custom-vcc-sdk';
import { StyledToolBar, StyledToolButton, StyledButtonInner, StyledRow, StyledCellImage } from './App.styled';

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

class App extends React.Component {
  EMPTY = 0;
  PLAYER = 1;
  BOX = 2;
  WALL = 3;
  END = 4;
  images = [];
  groundImage = '';
  endImage = '';

  constructor(props) {
    super(props);

    this.state = {
        'activeTool': 0,
        'value': {
          level:[[0]],
          ends: []
        }
    };

    this.images[this.EMPTY] = '';
    this.images[this.PLAYER] = Koji.config.images.player;
    this.images[this.BOX] = Koji.config.images.box;
    this.images[this.WALL] = Koji.config.images.wall;
    this.groundImage = Koji.config.images.ground;
    this.endImage = Koji.config.images.end;
    this.customVCC = new CustomVCC();
  }

  componentDidMount() {
    this.customVCC.register('300', '300');
    this.customVCC.onUpdate(({ value }) => {
      if(value.level == undefined) {
        value = {
          level:[[0]],
          ends: []
        };
      }
      this.setState({ value: value });
    });
  };

  change = (value) => {
    this.customVCC.change(value);
    this.customVCC.save();
  };

  setTool = (tool) => {
    this.setState({'activeTool': tool});
  };

  clearPlayer = (level) => {
    out:
    for (var i = level.length - 1; i >= 0; i--) {
      for (var j = level[i].length - 1; j >= 0; j--) {
        if (level[i][j] == this.PLAYER) {
          level[i][j] = this.EMPTY;
          break out;
        }
      }
    }
    return level;
  };

  isEnd = (x,y) => {
    const ends = this.state.value.ends;
    for (var i = ends.length - 1; i >= 0; i--) {
      if (ends[i].x == x && ends[i].y == y) {
        return true;
      }
    }
    return false;
  };

  removeEnd = (x,y, ends) => {
    let toRemove = null;
    for (var i = ends.length - 1; i >= 0; i--) {
      if (ends[i].x == x && ends[i].y == y) {
        toRemove = i;
      }
    }
    if (toRemove !== null) {
      ends.splice(toRemove,1);
    }
    return ends;
  };

  tileClick = (x,y) => {
    const { activeTool } = this.state;
    let { value } = this.state;

    if (activeTool != this.END) {
      if (activeTool == this.PLAYER) {
        value.level = this.clearPlayer(value.level);
      }
      if (!(activeTool == this.WALL && this.isEnd(x,y))) {
        value.level[y][x] = activeTool;
      }
    } else {
      if (this.isEnd(x,y)) {
        value.ends = this.removeEnd(x,y, value.ends);
      } else {
        value.ends.push({x:x,y:y});
      }
    }

    this.setState({ value: value })
    this.change(value);
  };

  addRow = () => {
    let { value } = this.state;
    value.level.push(Array.from({ length: value.level[0].length }));
    this.setState({ value: value })
    this.change(value);
  };

  removeRow = () => {
    let { value } = this.state;
    value.level.splice( value.level.length-1, 1);
    this.setState({ value: value })
    this.change(value);
  };

  addColumn = () => {
    let { value } = this.state;
    for (var i = value.level.length - 1; i >= 0; i--) {
      value.level[i].push(this.EMPTY);
    }
    this.setState({ value: value })
    this.change(value);
  };
  removeColumn = () => {
    let { value } = this.state;
    for (var i = value.level.length - 1; i >= 0; i--) {
      value.level[i].splice(value.level[i].length-1,1);
    }
    this.setState({ value: value })
    this.change(value);
  };

  render() {
    const { activeTool } = this.state;
    const level = this.state.value.level; 
    return (
      <Container>
        <StyledToolBar key={'tiles'}>
          <StyledToolButton key={0} onClick={()=>{this.setTool(0)}} className={activeTool == this.EMPTY ? 'active': ''}>
            <StyledButtonInner backgroundImage={this.groundImage} />
          </StyledToolButton>
          <StyledToolButton key={1} onClick={()=>{this.setTool(1)}} className={activeTool == this.PLAYER ? 'active': ''}>
            <StyledButtonInner backgroundImage={this.images[this.PLAYER]} />
          </StyledToolButton>
          <StyledToolButton key={2} onClick={()=>{this.setTool(2)}} className={activeTool == this.BOX ? 'active': ''}>
            <StyledButtonInner backgroundImage={this.images[this.BOX]} />
          </StyledToolButton>
          <StyledToolButton key={3} onClick={()=>{this.setTool(3)}} className={activeTool == this.WALL ? 'active': ''}>
            <StyledButtonInner backgroundImage={this.images[this.WALL]} />
          </StyledToolButton>
          <StyledToolButton key={4} onClick={()=>{this.setTool(4)}} className={activeTool == this.END ? 'active': ''}>
            <StyledButtonInner backgroundImage={this.endImage} />
          </StyledToolButton>
        </StyledToolBar>
        <StyledToolBar key={'grid'}>
          <StyledToolButton key={0} onClick={this.addColumn}>|+</StyledToolButton>
          <StyledToolButton key={1} onClick={this.removeColumn}>|-</StyledToolButton>
          <StyledToolButton key={2} onClick={this.addRow}>&mdash; +</StyledToolButton>
          <StyledToolButton key={3} onClick={this.removeRow}>&mdash; -</StyledToolButton>
        </StyledToolBar>

        {level.map((row, row_index) => {
            return(
              <StyledRow key={row_index}>
                {row.map((cell, cell_index) => {
                  return(
                    <StyledCellImage
                      key={cell_index}
                      occupant={this.images[cell]}
                      ground={this.groundImage}
                      end={this.isEnd(cell_index, row_index) ? this.endImage : '' }
                      onClick={ ()=>{this.tileClick(cell_index,row_index);} }
                      />
                  )
                })}
              </StyledRow>
            )
          })}
      </Container>
    );
  }
}

export default App;
