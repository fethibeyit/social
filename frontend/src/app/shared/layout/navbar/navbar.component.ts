import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() actionEmitter = new EventEmitter();
  @Input() loggedIn = false;
  submit(action: string) {
    this.actionEmitter.emit(action);
  }

}
