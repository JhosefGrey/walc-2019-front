import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [UserService]
})
export class NavComponent implements OnInit {
  public identity;
  public token;
  public admin:boolean;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public tracks: Track
  public tracksArray = new Array()
  constructor(private _userService: UserService, private _router: Router,private element : ElementRef) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.admin = false
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.getTracks();
    const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    if(this.identity){
      if(this.identity.rol == 'ROLE_ADMIN'){
        console.log('hola admin')
        this.admin = true;
      }else{
        console.log('hola user')
      }
    }else{
      console.log('no estas logueado')
    }
  }

  getTracks(){
    this._userService.getTraks().subscribe(
      response=>{
        this.tracks = response.tracks
        console.log(response);
     
        
      }
    )
  }

  public goTo(url, id) {

    var myurl = `${url}/${id}`;
    this._router.navigateByUrl(myurl).then(e => {
      if (e) {
        url = ""
        id= ""
        window.location.reload()
        console.log("Navigation is successful!");
      } else {
        url = ""
        id= ""
        console.log("Navigation has failed!");
      }
    });
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    // console.log(toggleButton, 'toggle');

    setTimeout(function(){
        toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
};
sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
};
sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
};

  cerrarSesion(){
    sessionStorage.clear();    
    setTimeout(() => {  
      window.location.reload()
      setTimeout(() => {
        this._router.navigate(['/home']);    
      }, 100);
    }, 0);
  }
}
