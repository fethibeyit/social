import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {LikeType, smileys} from "../../enums/like-type.enum";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {LikeState} from "../../state/like-state";
import {LikeModel} from "../../models/likeModel.interface";
import {Like} from "../../state/like-actions";
import {OverlayPanel} from "primeng/overlaypanel";


@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent {

  @ViewChild('op') op!: OverlayPanel;

  protected readonly smileys = smileys;
  protected readonly Object = Object;
  protected readonly SMILEYS_CLASS = "smileys-class";
  protected readonly LIKE_BUTTON_CLASS = "like-button-class";

  @Input() like: LikeModel | null = null;
  @Output() likeClick = new EventEmitter<LikeType>();

  @Select(LikeState.loading) loading$!: Observable<boolean>;

  constructor(private store: Store) {
  }

  onSmileyClick(type: LikeType) {
    if(this.like){
      const updatedLike = {...this.like , type};
      this.store.dispatch(new Like.Update(updatedLike));
    }else{
      this.likeClick.emit(type);
    }
  }

  onLikeClick(event: any) {
    if(this.like){
      this.store.dispatch(new Like.Delete(this.like));
    } else {
      this.op.toggle(event);
    }
  }

}
