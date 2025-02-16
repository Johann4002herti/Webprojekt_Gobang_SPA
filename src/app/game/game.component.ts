import { Component } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  standalone: true,
  styleUrl: './game.component.css'
})
export class GameComponent {
  gameComponent : GameComponent = this;
  gameStatus : string = "isRunning";
  playersTurn : string = "One";
  game : any;
  gameCode : string  = "";
  localPlayer : string = "";
  static blackPiece :string = "assets/Gobang/blackPiece_1";
  static whitePiece :string = "assets/Gobang/whitePiece_1";
  background : string;

  constructor() {
    this.background   = "assets/Gobang/background_1.png"
  }

  async ngOnInit(){
    let temp = localStorage.getItem('gameCode');
    if (temp != null){
      this.gameCode = temp
    }
    temp = localStorage.getItem("localPlayer");
    if (temp != null){
      this.localPlayer = temp
    }
    await new Promise(f => setTimeout(f, 20));
    this.getBoard()
    setInterval(this.getBoard,5000);
  }

    makeMove(i : number,j : number) {
      console.log("called makeMove with: "+i+","+j);
      if(this.playersTurn == this.localPlayer) {
        $.ajax({
          url: 'https://tranquil-ravine-52782-34bf80f0f653.herokuapp.com/api/game/board/tiles?TileX='+i+'&TileY='+j+'&gameCode='+this.gameCode,
          type: 'put',
          dataType: 'json',
          processData: false,
          contentType: "application/json; charset=UTF-8",
          success: function (data) {
            console.log(data.Message)
            this.getBoard()
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '   ' + thrownError);
          }
        });
      }
    }

    async getBoard() {
      await new Promise(f => setTimeout(f, 20));
    console.log("called GetBoard")
      console.log(this.gameStatus)
      if(this.gameStatus == "isRunning") {
        console.log("nächster GET")
        $.ajax({
          url: 'https://tranquil-ravine-52782-34bf80f0f653.herokuapp.com/api/game?GameCode=' + this.gameCode,
          type: 'get',
          dataType: 'json',
          processData: false,
          contentType: "application/json; charset=UTF-8",
          success: function (data) {
            //console.log(this.localPlayer);
            console.log(data);
            if(data.PlayerOnesTurn){
              this.playersTurn = "One"
            } else {
              this.playersTurn = "Two"
            }
            this.gameStatus = data.GameStatus.toString()
            console.log(data.gameStatus)
            this.game = JSON.stringify(data)

            let DS = "<table class='tableBoard'>";
            for (let i = 0; i < data.Board.Size; i++) {
              DS += "<tr class='tableMarginPadding'>";
              for (let j = 0; j < data.Board.Size; j++) {
                DS += "<td class='tableMarginPadding'>" +
                  //"<span class='field' id='" + i + "_" + j + "' (click)='makeMove("+i+","+j+")'>hallo</span>"+
                  "<img src = 'assets/Gobang/background_1.png' class='field' id='" + i + "_" + j + "' alt='image' (click)='makeMove("+i+","+j+")'>" +
                  "</td>";
              }
              DS += "</tr>";
            }
            DS += "</table>";

            console.log(DS)
            $("#board").html(DS);

            //

            data.Board.Tiles.forEach(function (entry : any) {
              GameComponent.checkStatus(entry["x-coordinate"], entry["y-coordinate"], entry.Status)
            })
            if(this.gameStatus == "playerOneWon"){
              if(this.localPlayer == "One") {
                $("#board").html("<div id='Winner'>You Won!</div>");
              } else {
                $("#board").html("<div id='Loser'>You Lose!</div>");
              }
            } else if(this.gameStatus == "playerTwoWon"){
              if(this.localPlayer == "Two"){
                $("#board").html("<div id='Winner'>You Won!</div>");
              }else {
                $("#board").html("<div id='Loser'>You Lose!</div>");
              }
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '   ' + thrownError);
          }
        });
      }
    }


    static checkStatus(i : number,j : number, status : string) {
      console.log("it works")
      if(status == "playerOne"){
        $("#"+i+"_"+j).attr("src", GameComponent.blackPiece);
      } else if (status == "playerTwo") {
        $("#"+i+"_"+j).attr("src",GameComponent.whitePiece);
      } else {
        //$("#"+i+"_"+j).attr("src", "background");
      }
    }

    /*function Werteliste (querystring : string) {
      console.log(querystring);
      if (querystring == '') return;
      var wertestring = querystring.slice(1);
      var paare = wertestring.split("&");
      var paar, name, wert;
      for (var i = 0; i < paare.length; i++) {
        paar = paare[i].split("=");
        name = paar[0];
        console.log(name);
        wert = paar[1];
        console.log(wert);
        name = unescape(name).replace("+", " ");
        wert = unescape(wert).replace("+", " ");
        this[name] = wert;
      }*/
// irgendwas 
}
