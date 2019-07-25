import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Patrocinador } from '../../models/patrocinador.model';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[UserService]
})
export class HomeComponent implements OnInit {
  public patrocinador: Patrocinador
  constructor(
    private _router: Router,
    public _userService: UserService
  ) {
   }

  ngOnInit() {
    this.getPatrocinadores()  
  
    $(window).scroll(function() {
      if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
          $('#return-to-top').fadeIn(200);    // Fade in the arrow
      } else {
          $('#return-to-top').fadeOut(200);   // Else fade out the arrow
      }
  });
  $('#return-to-top').click(function() {      // When arrow is clicked
      $('body,html').animate({
          scrollTop : 0                       // Scroll to top of body
      }, 500);
  });
  }

  getPatrocinadores(){
    this._userService.getPatrocinadores().subscribe(
      response=>{
        this.patrocinador = response.patrocinador
        console.log(this.patrocinador);
        
      }
    )
  }

  public goTo(url, id) {

    var myurl = `${url}/${id}`;
    this._router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}
