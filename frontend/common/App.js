import React from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import CustomVCC from '@withkoji/custom-vcc-sdk';

import {GridBar,CellBar} from './TopBar.js';

const DEFAULT_ROWS = 10;
const DEFAULT_COLS = 10;

let GridCell = styled.div`
    background-color:rgb(100,100,100);
    width:8vw;
    max-width:50px;
    height:8vw;
    max-height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    &:hover {
        background-color:rgb(60,60,60);
    }
`;

let CellImage = styled.img`
    width:7vw;
    max-width:30px;
    height:7vw;
    max-height:30px;
`;

const IMAGES = [
    null,
    Koji.config.images.spawn,
    Koji.config.images.coin,
    Koji.config.images.wall,
    Koji.config.images.end
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.customVCC = new CustomVCC();
        let level = [];
        for(var i=0;i<DEFAULT_ROWS;i++) {
            level.push([]);
            for(var j=0;j<DEFAULT_COLS;j++) {
                level[i].push(0);                
            }
        }
        this.state = {
            level:level,
            activeItem:0,
            startCell:null,
            exitCell:null,
        };
    }

    componentDidMount() {
        this.customVCC.register('300','300');
        this.customVCC.onUpdate((newProps) => {
            if(newProps.value != "" && newProps.value != undefined) {
                this.setState({level:newProps.value});
                this.parseLevel(newProps.value);
            }
        })
    }

    parseLevel(level) {
        for(var i=0;i<level.length; i++) {
            for(var j=0; j<level[i].length; j++) {
                if(level[i][j] == 1) {
                    this.setState({startCell:[i,j]});
                }
                if(level[i][j] == 4) {
                    this.setState({exitCell:[i,j]});
                }
            }
        }
    }

    expandX() {
        let level = this.state.level;
        for(var i=0; i<level.length; i++) {
            level[i].push(0);
        }
        this.state = {level:level};
        this.forceUpdate();
        this.customVCC.change(this.state.level);
        this.customVCC.save();
    }

    shrinkX() {
        let level = this.state.level;
        //min level size of 1x1
        if(level[0].length == 1) {
            return;
        }
        for(var i=0;i<level.length;i++) {
            level[i].pop();
        }
        this.state = {level:level};
        this.forceUpdate();
        this.customVCC.change(this.state.level);
        this.customVCC.save();
    }

    expandY() {
        let level = this.state.level;
        let t = [];
        for(var i=0;i<level[0].length;i++) {
            t.push(0);
        }
        level.push(t);
        this.state = {level:level};
        this.forceUpdate();
        this.customVCC.change(this.state.level);
        this.customVCC.save();
    }

    shrinkY() {
        let level = this.state.level;
        //min level size of 1x1
        if(level.length == 1) {
            return;
        }
        level.pop();
        this.state = {level:level};
        this.forceUpdate();
        this.customVCC.change(this.state.level);
        this.customVCC.save();
    }

    resetCell(row,col) {
        //reset spawn
        if(this.state.level[row][col] == 1) {
            this.setState({startCell:null});
        }
        //reset goal
        if(this.state.level[row][col] == 4) {
            this.setState({exitCell:null});
        }
        this.state.level[row][col] = 0;
    }

    setCell(row,col,value) {
        this.resetCell(row,col);
        //set spawn
        if(value == 1) {
            if(this.state.startCell != null) {
                this.resetCell(this.state.startCell[0],this.state.startCell[1]);
            }
            this.setState({startCell:[row,col]});
        }
        //set goal
        if(value == 4) {
            if(this.state.exitCell != null) {
                this.resetCell(this.state.exitCell[0],this.state.exitCell[1]);
            }
            this.setState({exitCell:[row,col]});
        }
        this.state.level[row][col] = value;
        this.forceUpdate();
        this.customVCC.change(this.state.level);
        this.customVCC.save();
    }

    render() {
        let PageDiv = styled.div`
            padding:50px;
            width:calc(100% - 100px);
            height:calc(100% - 100px);
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;
            background-color:rgb(240,240,240);
        `;
        return (
            <PageDiv>
                <GridBar expandY={() => {this.expandY()}} expandX={() => {this.expandX()}} shrinkX={() => {this.shrinkX()}} shrinkY={() => {this.shrinkY()}}/>
                <CellBar activeButton={this.state.activeItem} update={(i) => {this.setState({activeItem:i})}}/>
                <h3>{"Level must have a spawn and a goal!"}</h3>
                <div style={{display:'flex',flexDirection:'column', margin:'10px 0 0 0'}}>
                {
                    this.state.level.map((row,rowIndex) => {
                        return(
                            <div style={{display:'flex'}}>
                                {
                                    row.map((cell,cellIndex) => {
                                        let Image = <CellImage src={IMAGES[cell]} />;
                                        return(<GridCell onClick={() => {this.setCell(rowIndex,cellIndex,this.state.activeItem);}}>{Image}</GridCell>);
                                    })
                                }
                            </div>
                        );
                    })
                }
                </div>
            </PageDiv>
        );
    }
}

export default App;
