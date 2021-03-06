import React from 'react';
import '../style.css';


class Winblock extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    const ifPlayerWin = this.props.ifPlayerWin;
    const Player = this.props.Player;


    let WinPlayer, WinClass, ImgClass


    if ( Player === 2 ){
      WinPlayer = (

      <svg  width="50px" height="50px" viewBox="0 0 66 66" version="1.1" >
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                <g id="Artboard-23" transform="translate(-16.000000, -21.000000)" stroke="#39BCD4" stroke-width="16">
                    <g id="Group" className="svg-img" transform="translate(24.000000, 29.000000)">
                        <path d="M0.497425847,0.497425847 L49.0583794,49.0583794" id="Line"></path>
                        <path d="M0.497425847,0.497425847 L49.0583794,49.0583794" id="Line" transform="translate(25.000000, 25.000000) scale(-1, 1) translate(-25.000000, -25.000000) "></path>
                    </g>
                </g>
            </g>
        </svg>


    )
     

    }else{
      WinPlayer = (

      <svg  width="86px" height="88px" viewBox="0 0 86 88" version="1.1" >
        <title>Oval 5</title>
        <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none"  fill="none" fill-rule="evenodd">
              <g id="Artboard-21" transform="translate(0.000000, -26.000000)">
                  <g id="Oval-5">
                      <use fill="black" fill-opacity="1" filter="url(#filter-2)"></use>
                      <circle className="svg-img" stroke="#D7B8FC" cx="41" cy="71" r="27" ></circle>
                  </g>
              </g>
          </g>
        </svg>
    )

    }

    

    if (ifPlayerWin === true){
      console.log('palyer win');

      WinClass = 'win-block win';
      ImgClass = 'win-img';

    }else{
      WinClass = 'win-block'
      ImgClass = 'cele-img'
    }

    return(

      <div className={WinClass}>
        <div><img className={ImgClass}  src="img/win-img.png"/></div>
        <h1 className="win-msg">{WinPlayer} Win!</h1>
       </div>

    )
  }



}
class PlayTag extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const Player = this.props.Player
    const currentPlayer = this.props.currentPlayer
    let PlayerClass
    let PlayerImg


    if (Player === currentPlayer ){
      PlayerClass = 'play-turn-' + Player;
    }
    else{
      PlayerClass = 'player-turn';
    }

    if(Player === 1){
      PlayerImg = (<svg transform="scale(0.7)" width="30px" height="30px" viewBox="0 0 66 66" version="1.1" >
            
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                <g className={PlayerClass} id="Artboard-23" transform="translate(-16.000000, -21.000000)"  stroke-width="16">
                    <g id="Group" className="svg-img" transform="translate(24.000000, 29.000000)">
                        <path d="M0.497425847,0.497425847 L49.0583794,49.0583794" id="Line"></path>
                        <path d="M0.497425847,0.497425847 L49.0583794,49.0583794" id="Line" transform="translate(25.000000, 25.000000) scale(-1, 1) translate(-25.000000, -25.000000) "></path>
                    </g>
                </g>
            </g>
        </svg>);
    }else{
      PlayerImg = (
        <svg  width="30px" height="30px"  viewBox="0 0 86 88" version="1.1" >
        <title>Oval 5</title>
        <desc>Created with Sketch.</desc>
          <defs>
              <circle id="path-1" cx="41" cy="71" r="35"></circle>
            
          </defs>
          <g id="Page-1" stroke="none"  fill="none" fill-rule="evenodd">
              <g id="Artboard-21" transform="translate(0.000000, -26.000000)">
                  <g className={PlayerClass} id="Oval-5">
                      <use fill="black" fill-opacity="1" filter="url(#filter-2)"></use>
                      <circle  className="svg-img" cx="41" cy="71" r="27"></circle>
                  </g>
              </g>
          </g>
        </svg>
        )

    }

    


  

    return(
      <div className={PlayerClass}>Player {PlayerImg}</div>
    )
  }


}

class Square extends React.Component{
  constructor(props){
    super(props);
    this.buttonClick = this.buttonClick.bind(this)
  };

    
  
//Square Click Function 
  buttonClick(e){
    const SquareIndex = this.props.SquareIndex;
    const GameInfo = this.props.GameInfo;
    const RowIndex = SquareIndex[0];
    const ColumnIndex = SquareIndex[1];
    const PlayerTurn = this.props.PlayerTurn;
    const ifPlayerWin = this.props.ifPlayerWin;

    if (ifPlayerWin === true ) {


    }else{

      if (GameInfo[RowIndex][ColumnIndex] !=0 ){
          
          this.props.onMsgChange(ifPlayerWin,'This button is cliked try another one');

      }else{

        
        GameInfo[RowIndex][ColumnIndex] = PlayerTurn
        this.props.onButtonClick(GameInfo,PlayerTurn,);
        const WinCheck = this.WinCheck(RowIndex,ColumnIndex,GameInfo,PlayerTurn);
        this.props.onMsgChange(WinCheck.ifPlayerWin,WinCheck.Msg);
        
      }
    }
   
  }

  // Check if any player wins
  WinCheck(RowIndex,ColumnIndex ,GameInfo,PlayerTurn){
    
    const RowCompare = this.ValueCompare(PlayerTurn,GameInfo[RowIndex][0],GameInfo[RowIndex][1],GameInfo[RowIndex][2]);
    const ColumnCompare = this.ValueCompare(PlayerTurn,GameInfo[0][ColumnIndex],GameInfo[1][ColumnIndex],GameInfo[2][ColumnIndex]);
    
    if ( RowCompare || ColumnCompare ) { 

      
      return {ifPlayerWin: true, Msg: 'Player '+ PlayerTurn +' win!' }
    }else{
    
      if ( Math.abs(ColumnIndex- RowIndex) != 1 ){
         // Crosscompare
         const Crosscompare1 = this.ValueCompare(PlayerTurn,GameInfo[0][0],GameInfo[1][1], GameInfo[2][2]);
         const Crosscompare2 = this.ValueCompare(PlayerTurn,GameInfo[0][2],GameInfo[1][1],GameInfo[2][0]);
         if (Crosscompare1 || Crosscompare2 ) {
          
          return {ifPlayerWin: true, Msg: 'Player '+ PlayerTurn +' win!' }
         }else{
          return {ifPlayerWin:false, Msg:'Game continue...'}
         }

      }else{
        return {ifPlayerWin:false, Msg:'Game continue...'}
      }

    }




  }

  ValueCompare(a,b,c,d){
    if (a === b && a === c && a === d ){
      return true
    }else{
      return false
    }
  }
 


  
  render(){
    const SquareIndex = this.props.SquareIndex;
    let CrossClass, CircleClass, Draw;
    if (this.props.GameInfo[SquareIndex[0]][SquareIndex[1]] === 0)
        { CrossClass = 'img' ;
          CircleClass = 'img'
          }
      else if (this.props.GameInfo[SquareIndex[0]][SquareIndex[1]] === 1)
        { CrossClass = 'appear' ;
          CircleClass = 'hide' ;
          Draw = 'draw'
        }
      else {
        CrossClass = 'hide' ;
        CircleClass = 'appear' ;
        Draw = 'draw'
      }

    return(
      
      <button className='square' onClick={this.buttonClick}>
    
      <svg className={CrossClass} width="66px" height="66px" viewBox="0 0 66 66" version="1.1" >
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                <g id="Artboard-23" transform="translate(-16.000000, -21.000000)" stroke="#39BCD4" stroke-width="16">
                    <g id="Group" className="svg-img" transform="translate(24.000000, 29.000000)">
                        <path className={Draw} d="M0.497425847,0.497425847 L49.0583794,49.0583794" id="Line"></path>
                        <path className={Draw + '1'} d="M0.497425847,0.497425847 L49.0583794,49.0583794" id="Line" transform="translate(25.000000, 25.000000) scale(-1, 1) translate(-25.000000, -25.000000) "></path>
                    </g>
                </g>
            </g>
        </svg>



       

        <svg className={CircleClass} width="86px" height="88px" viewBox="0 0 86 88" version="1.1" >
        <title>Oval 5</title>
        <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none"  fill="none" fill-rule="evenodd">
              <g id="Artboard-21" transform="translate(0.000000, -26.000000)">
                  <g id="Oval-5">
                      <use fill="black" fill-opacity="1" filter="url(#filter-2)"></use>
                      <circle className={Draw + ' svg-img'}  stroke="#D7B8FC" cx="41" cy="71" r="27" ></circle>
                  </g>
              </g>
          </g>
        </svg>

        
      </button>
    );
  }
}




class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      GameInfo: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      PlayerTurn:1,
      ifPlayerWin: false,
      Msg: 'Game Started'
    }
    this.UpdateGameInfo = this.UpdateGameInfo.bind(this);
    this.MsgUpdate = this.MsgUpdate.bind(this);
    this.NewGame = this.NewGame.bind(this);

  };

  UpdateGameInfo(NewGameInfo,PlayerTurn){
    
    this.setState({
      GameInfo : NewGameInfo
    });

    //console.log(PlayerTurn);

    if (PlayerTurn === 1){
      this.setState(
      {
        PlayerTurn : 2
        
      });
      
    }else{

      this.setState(
      {
        PlayerTurn : 1
      });
      
    }
    
  }

  MsgUpdate(ifPlayerWin, Msg){
    this.setState({
      ifPlayerWin : ifPlayerWin,
      Msg: Msg
    });

  }

  NewGame(){
    this.setState({
      GameInfo: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      PlayerTurn:1,
      ifPlayerWin: false,
      Msg: 'Game Started'
    })
  }

  render(){

 

    return(
    <div className="main-content">
      <div className="left-content">
       <h1 className="game-title">Let's Play the <br></br> Tic-tac-toe Game!</h1>
       <button className="restart-button" onClick= {this.NewGame}>Start A New Game</button>
     </div>

     <div className="right-content">
      
       <Winblock ifPlayerWin={this.state.ifPlayerWin} Player={this.state.PlayerTurn}/>

       <div className="turn-container">
         <PlayTag Player={1} currentPlayer={this.state.PlayerTurn}/>
         <PlayTag Player={2} currentPlayer={this.state.PlayerTurn}/>
       </div>

      
       

       <div className="game-board">
         <div className = "row">
          <Square SquareIndex={[0,0]} GameInfo={this.state.GameInfo} PlayerTurn={this.state.PlayerTurn} ifPlayerWin={this.state.ifPlayerWin} onButtonClick={this.UpdateGameInfo} onMsgChange={this.MsgUpdate}/>
          <Square SquareIndex={[0,1]} GameInfo={this.state.GameInfo} PlayerTurn={this.state.PlayerTurn} ifPlayerWin={this.state.ifPlayerWin}  onButtonClick={this.UpdateGameInfo} onMsgChange={this.MsgUpdate}/>
          <Square SquareIndex={[0,2]} GameInfo={this.state.GameInfo} PlayerTurn={this.state.PlayerTurn} ifPlayerWin={this.state.ifPlayerWin}  onButtonClick={this.UpdateGameInfo} onMsgChange={this.MsgUpdate}/>
         </div> 
         <div className = "row">
          <Square SquareIndex={[1,0]} GameInfo={this.state.GameInfo} PlayerTurn={this.state.PlayerTurn} ifPlayerWin={this.state.ifPlayerWin}  onButtonClick={this.UpdateGameInfo} onMsgChange={this.MsgUpdate}/>
          <Square SquareIndex={[1,1]} GameInfo={this.state.GameInfo} PlayerTurn={this.state.PlayerTurn} ifPlayerWin={this.state.ifPlayerWin}  onButtonClick={this.UpdateGameInfo} onMsgChange={this.MsgUpdate}/>
          <Square SquareIndex={[1,2]} GameInfo={this.state.GameInfo} PlayerTurn={this.state.PlayerTurn} ifPlayerWin={this.state.ifPlayerWin}  onButtonClick={this.UpdateGameInfo} onMsgChange={this.MsgUpdate}/>
         </div>
         <div className = "row"> 
          <Square SquareIndex={[2,0]} GameInfo={this.state.GameInfo} PlayerTurn={this.state.PlayerTurn} ifPlayerWin={this.state.ifPlayerWin}  onButtonClick={this.UpdateGameInfo} onMsgChange={this.MsgUpdate}/>
          <Square SquareIndex={[2,1]} GameInfo={this.state.GameInfo} PlayerTurn={this.state.PlayerTurn} ifPlayerWin={this.state.ifPlayerWin}  onButtonClick={this.UpdateGameInfo} onMsgChange={this.MsgUpdate}/>
          <Square SquareIndex={[2,2]} GameInfo={this.state.GameInfo} PlayerTurn={this.state.PlayerTurn} ifPlayerWin={this.state.ifPlayerWin}  onButtonClick={this.UpdateGameInfo} onMsgChange={this.MsgUpdate}/>
          </div>
        </div>
     </div>
     

     

     
    </div> 
    )
  }
}

export default Board;

