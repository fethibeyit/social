import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConnectionPositionPair} from "@angular/cdk/overlay";
import {LikeType, smileys} from "../../enums/like-type.enum";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {LikeState} from "../../state/like-state";
import {PostModel} from "../../../post/models/postModel.interface";
import {LikeModule} from "../../like.module";
import {LikeModel} from "../../models/likeModel.interface";
import {Like} from "../../state/like-actions";


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

  @Input() like: LikeModel | null = null;
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

  constructor(private store: Store) {
  }

  openSmileys() {
      this.isOpen = true
  }

  closeSmileys(event: any ) {
    console.log("close", event)
    if(!event.toElement.className.toString().includes(this.SMILEYS_CLASS)
      && !event.toElement.className.toString().includes(this.LIKE_BUTTON_CLASS)){
      this.isOpen = false;
    }
  }

  onSmileyClick(type: LikeType) {
    if(this.like){
      const updatedLike = {...this.like , type};
      this.store.dispatch(new Like.Update(updatedLike));
    }else{
      this.likeClick.emit(type);
    }
    this.isOpen = false;
  }

  onLikeClick() {
    if(this.like){
      this.store.dispatch(new Like.Delete(this.like));
    } else {
      const defaultSmiley = Object.values(smileys)[0];
      this.likeClick.emit(defaultSmiley.type);
    }
    this.isOpen = false;
  }

}
