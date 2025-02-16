import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-host-game',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './host-game.component.html',
  standalone: true,
  styleUrl: './host-game.component.css'
})
export class HostGameComponent {

  startGame() {
    console.log("irgendwas")
    let checked;
    if ($('#input-bs').is(":checked")) {
      checked = true;
    } else {
      checked = false;
    }

      const gamecode = $('#input-Code').val();
      const size = $("#input-size").val()?.valueOf();
      if (typeof size == "string" && typeof gamecode == "string") {
        var game = {
          "GameCode": $("#input-Code").val(),
          "PlayerOnesTurn": true,
          "Board": {
            "Size": parseInt(size),
            "Tiles": [
              {
                "Status": "empty",
                "x-coordinate": 9,
                "y-coordinate": 3
              }
            ]
          },
          "Type": $("#input-type").val(),
          "BenefitSharing": checked,
          "GameStatus": "isRunning"
        };

        console.log(game);
        $.ajax({
          url: 'https://tranquil-ravine-52782-34bf80f0f653.herokuapp.com/api/game',
          type: 'post',
          dataType: 'json',
          success: function (data) {
            alert(data);
            localStorage.setItem('gameCode',gamecode)
            localStorage.setItem("localPlayer", "One")
            window.history.pushState("", "","/LinkGame")
            location.reload();
          },
          data: JSON.stringify(game),
          processData: false,
          contentType: "application/json; charset=UTF-8",
          error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status == 500) {
              alert("Bitte geben sie die geforderten Daten ein!")
            }
            //alert('Error: ' + xhr.status + '   ' + thrownError);
          }
        });
      }
    }
}

