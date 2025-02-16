import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {HomepageButtonsComponent} from './homepageButtons/homepageButtons.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomepageButtonsComponent, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Five in a Row';

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.ngAfterContentInit()
    });
  }

  public async ngAfterContentInit (){
    let ElementList = document.getElementsByTagName("homepagebuttons")
    await new Promise(f => setTimeout(f, 0.01));
      let thisElement = ElementList.item(0)
      if (thisElement !== null){
        thisElement.className = "container-fluid"
        //console.log(thisElement)
      } else {
        ElementList = document.getElementsByTagName("app-host-game")
        await new Promise(f => setTimeout(f, 0.01));
        thisElement = ElementList.item(0)
        if (thisElement !== null){
          thisElement.className = "container-fluid"
          //console.log(thisElement)
        } else {
          ElementList = document.getElementsByTagName("app-join-game")
          await new Promise(f => setTimeout(f, 0.01));
          thisElement = ElementList.item(0)
          if (thisElement !== null){
            thisElement.className = "container-fluid"
            //console.log(thisElement)
          } else {
            ElementList = document.getElementsByTagName("app-game")
            await new Promise(f => setTimeout(f, 0.01));
            thisElement = ElementList.item(0)
            if (thisElement !== null){
              thisElement.className = "container-fluid"
              //console.log(thisElement)
            } else {

            }
          }
        }
        //console.log(ElementList)
      }
    //console.log(ElementList)
  }
}
