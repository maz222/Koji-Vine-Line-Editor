import React from 'react';
import Koji from '@withkoji/vcc';
import { StyledRow, StyledCellImage } from './Level.styled';

export class Level extends React.Component {

  EMPTY = 0;
  PLAYER = 1;
  BOX = 2;
  WALL = 3;
  images = [];
  groundImage = '';
  endImage = '';

  constructor(props) {
    super(props);
    this.state = {
      level: props.value.level,
      ends: props.value.ends
    }
    this.images[this.EMPTY] = '';
    this.images[this.PLAYER] = Koji.config.images.player;
    this.images[this.BOX] = Koji.config.images.box;
    this.images[this.WALL] = Koji.config.images.wall;
    this.groundImage = Koji.config.images.ground;
    this.endImage = Koji.config.images.end;
  }

  isEnd = (x,y) => {
    const { ends } = this.state;
    for (var i = ends.length - 1; i >= 0; i--) {
      if (ends[i].x == x && ends[i].y == y) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { level, ends } = this.state;
    const { tileClick } = this.props;
    return(
      <div>
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
                      onClick={ ()=>{tileClick(cell_index,row_index);} }
                      />
                  )
                })}
              </StyledRow>
            )
          })}
      </div>
    );
  }
}
