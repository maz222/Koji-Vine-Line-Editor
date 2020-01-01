import styled from 'styled-components';
import Koji from '@withkoji/vcc';

export const StyledToolBar = styled.div`
	display: flex;
`;

export const StyledToolButton = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: ${Koji.config.colors.actionColor};
  border-radius: 6px;
  overflow: hidden;
  border-bottom: 4px solid rgba(0,0,0,0.3);
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  &:hover:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255, 0.3);
  }
  &.active {
    border-bottom-width: 0px;
    border: 1px dotted white;
    transform: translateY(3px);
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0, 0.1);
    }
  }
`;

export const StyledButtonInner = styled.div`
  width: 32px;
  height: 32px;
  background-image: url("${props => props.backgroundImage}");
  background-size: contain;
`;

export const StyledRow = styled.div`
  white-space: nowrap;
`;
export const StyledCellImage = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 32px;
  height: 32px;
  background-image: url("${props => props.end}"), url("${props => props.occupant}"), url("${props => props.ground}");
  background-size: contain;
  cursor: pointer;
  position: relative;
  &:hover:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255, 0.3);
  }
`;

export const StyledLevel = styled.div`
    max-width: 100%;
    overflow: auto;
`;