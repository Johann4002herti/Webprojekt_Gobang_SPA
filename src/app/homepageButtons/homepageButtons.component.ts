import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'homepageButtons',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './homepageButtons.component.html',
  standalone: true,
  styleUrl: './homepageButtons.component.css'
})
export class HomepageButtonsComponent {
  title = 'Five in a Row';
  dailyVerse = "";

  async ngAfterViewInit(){
    await new Promise(f => setTimeout(f, 2));

    this.dailyVerse = $("#dailyVersesWrapper").html();
    await new Promise(f => setTimeout(f, 2));
    localStorage.setItem("dailyVerse", this.dailyVerse)
    //console.log("after:"+this.dailyVerse)
    //console.log(localStorage.getItem("dailyVerse"))
  }

  ngOnInit(){

    let todaysVerse = localStorage.getItem("todaysVerse");

    $.ajax({
      url: 'https://beta.ourmanna.com/api/v1/get',
      type: 'get',
      dataType: 'text',
      processData: false,
      contentType: "application/json; charset=UTF-8",
      success: function (data) {
        localStorage.setItem("todaysVerse", data.toString());
        todaysVerse = data.toString();
        //console.log(todaysVerse);
        if(todaysVerse !== null){
          //console.log("changed Verse")
          $("#verseOfTheDay").html(todaysVerse);
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert('Error: ' + xhr.status + '   ' + thrownError);
      }
    });
    const temp = localStorage.getItem("dailyVerse")
    //console.log("temp: "+temp)
    if ( temp != null){
      this.dailyVerse = temp;
    }
    //console.log(this.dailyVerse)
    if(this.dailyVerse !== null){
      $("#dailyVersesWrapper").html("<div>"+this.dailyVerse+"</div>");
    }
  }
}
