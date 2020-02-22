import React from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';


var Bar = styled.div`
	background-color:rgb(60,60,60);
	border:1px solid rgba(0,0,0,.2);
	border-radius:4px;
	display:flex;
	justify-content:space-around;
	align-items:center;
	padding:20px;
	width:calc(100% - 40px);
    margin-bottom:10px;
`;

let ButtonImage = styled.img`
    width:8vw;
    height:8vw;
    max-width:50px;
    max-height:50px;
`;

var Button = styled.button`
	background-color:rgb(100,100,100);
	border:1px solid rgba(0,0,0,.1);
	border-radius:4px;
	padding:5px;
    margin:5px;
	&:hover {
		background-color:rgb(80,80,80);
	}
`;

var ActiveButton = styled.button`
	background-color:rgb(200,200,200);
	border:3px solid black;
	border-radius:4px;
	padding:10px;
`;

const IMAGES = [
    null,
    Koji.config.images.spawn,
    Koji.config.images.coin,
    Koji.config.images.wall,
    Koji.config.images.end
]

class GridBar extends React.Component {
	render() {
        let VCC = Koji.config.images;
		return(
			<Bar>
				<Button onClick={this.props.expandX}><ButtonImage src={VCC.growX}/></Button>
				<Button onClick={this.props.shrinkX}><ButtonImage src={VCC.shrinkX}/></Button>
				<Button onClick={this.props.expandY}><ButtonImage src={VCC.growY}/></Button>
				<Button onClick={this.props.shrinkY}><ButtonImage src={VCC.shrinkY}/></Button>
			</Bar>
		);
	}
}

class CellBar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let buttons = [0,1,2,3,4];
        let labels = ["Floor","Spawn","Coin","Wall","Goal"];
		return(
			<Bar>
			{
				buttons.map((image,index) => {
					let Image = <ButtonImage src={IMAGES[image]} />
					let ItemButton = index == this.props.activeButton ? <ActiveButton onClick={() => {this.props.update(index);}} >{Image}</ActiveButton> : 
						<Button onClick={() => {this.props.update(index);}}>{Image}</Button>
                    let labelColor = index == this.props.activeButton ? 'red' : 'white';
                    return(
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                            {ItemButton}
                            <h2 style={{fontSize:'1em',color:labelColor,margin:'5px 0 0 0', backgroundColor:'rgb(40,40,40)',padding:'4px 10px 4px 10px',borderRadius:'2px'}}>{labels[image]}</h2>
                        </div>
                    );
				})
			}
			</Bar>
		)
	}
}

export {GridBar,CellBar};