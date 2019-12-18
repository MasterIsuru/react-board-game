import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    totalNodes: 9,
    currentNodePosition: 0,
    board: [],
    gameOver: false,
    successText: ''
  };

  componentDidMount() {
    this.renderBoard();
  }

  handleBtnClick = () => {
    let moverContainerLeftOffset = this.refs.moverContainer.offsetLeft;
    let moverLeftOffset = this.refs.mover.offsetLeft;
    let moverMiddle = this.refs.moverContainer.clientWidth / 2;
    let moverLength = this.refs.mover.clientWidth;
    let left = moverContainerLeftOffset + moverMiddle - (1.5 * moverLength);
    let right = moverContainerLeftOffset + moverMiddle + (1.5 * moverLength);

    if (moverLeftOffset >= left && moverLeftOffset <= right) {
      this.updateCurrentPosition();
    } else {
      this.setState({ gameOver: true });
      this.resetBoard();
    }
  }

  updateCurrentPosition = () => {
    const { currentNodePosition } = this.state;
    let currentPosition = currentNodePosition;
    currentPosition += 1;
    this.setState({ currentNodePosition: currentPosition });
    this.updateBoard(currentPosition);
  }

  updateBoard = (value) => {
    const { board, totalNodes } = this.state;
    if (value > totalNodes) {
      return;
    }
    let boardData = board;
    boardData[value - 2] = <div key={value - 2}>{value - 1}</div>
    boardData[value - 1] = <div key={value - 1}><div className='selected-node'></div></div>
    this.setState({ board: boardData, gameOver: false });
  }

  resetBoard = () => {
    this.setState({
      currentNodePosition: 0,
      board: []
    }, () => this.renderBoard());
  }

  renderBoard = () => {
    const { totalNodes } = this.state;
    let boardItems = [];
    for (let i = 0; i < totalNodes; i++) {
      boardItems.push(<div key={i}>{i + 1}</div>)
    }
    this.setState({ board: boardItems });
  }

  render() {
    const { board, currentNodePosition, totalNodes, gameOver } = this.state;
    return (
      <div className="App">
        <h1>Board game</h1>
        <div className="main-container">
          <div className="board-container">
            {board}
          </div>
          <div className="panel">
            <div>
              <button
                className="btn primary"
                onClick={this.handleBtnClick}
                disabled={currentNodePosition === totalNodes}
              >
                Click Here
            </button>
              <button
                className="btn danger"
                onClick={this.resetBoard}
              >
                Replay
            </button>
              <div ref="moverContainer" className="mover-container">
                <div ref="mover" className="mover"></div>
              </div>
              <div className="zone">
                <span style={{ backgroundColor: '#333' }}>ZONE</span>
              </div>
            </div>
            <div>
              {currentNodePosition === totalNodes && <h1 style={{ color: 'green' }}>You won !!!</h1>}
              {gameOver && <h1 style={{ color: 'red' }}>Game over !!!</h1>}
            </div>
          </div>
          <div className="instructions">
            <h3>Instructions</h3>
            <ol>
              <li>
                Press 'Click here' Button when the moving <br/>node is inside the 'Zone'
              </li>
              <li>
                If you can reach to box 9, you are a winner!
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
