import styled from 'styled-components';

export const StyledRow = styled.div`
	display: flex;
`;
export const StyledCellImage = styled.div`
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