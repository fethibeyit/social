import {Component, EventEmitter, Output} from '@angular/core';
import {ConnectionPositionPair} from "@angular/cdk/overlay";
import {LikeType, smileys} from "../../enums/like-type.enum";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {LikeState} from "../../state/like-state";


@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent {

  protected readonly smileys = smileys;
  protected readonly Object = Object;
  protected readonly SMILEYS_CLASS = "smileys-class";
  protected readonly LIKE_BUTTON_CLASS = "like-button-class";

  @Output() likeClick = new EventEmitter<LikeType>();

  @Select(LikeState.loading) loading$!: Observable<boolean>;

  isOpen = false;
  positions = [
    new ConnectionPositionPair(
      {originX: 'center', originY: 'top'},
      {overlayX: 'center', overlayY: 'bottom'}),
    new ConnectionPositionPair(
      {originX: 'center', originY: 'bottom'},
      {overlayX: 'center', overlayY: 'top'})];

  openSmileys() {
    setTimeout(() => this.isOpen = true,500);
  }

  closeSmileys(event: any ) {
    if(!event.toElement.className.toString().includes(this.SMILEYS_CLASS) && !event.toElement.className.toString().includes(this.LIKE_BUTTON_CLASS)){
      setTimeout(() => this.isOpen = false,500);
    }
  }

  onClick(type: LikeType) {
    this.likeClick.emit(type);
  }
}
