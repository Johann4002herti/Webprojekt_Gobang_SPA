import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-join-game',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './join-game.component.html',
  standalone: true,
  styleUrl: './join-game.component.css'
})
export class JoinGameComponent {

  startGame(){
    let gameCode = $("#input-Code").val();

    if (typeof gameCode == "string"){
      $.ajax({
        url: 'https://tranquil-ravine-52782-34bf80f0f653.herokuapp.com/api/game?GameCode=' + gameCode,
        type: 'get',
        dataType: 'json',
        processData: false,
        contentType: "application/json; charset=UTF-8",
        success: function (data) {
          if(data === null){
            alert("No Game existing with Code: "+gameCode)
          } else {
            localStorage.setItem('gameCode',gameCode)
            localStorage.setItem("localPlayer", "Two")
            window.history.pushState("", "","/LinkGame")
            location.reload();
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert('Error: ' + xhr.status + '   ' + thrownError);
        }
      });
    }
  }
}
