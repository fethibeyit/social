import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../models/postModel.interface";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {saveAs as importedSaveAs} from "file-saver";
import {PostState} from "../../state/post-state";
import {FileService} from "../../../file/services/file.service";
import {FileModel} from "../../../file/models/fileModel.interface";
import {FileState} from "../../../file/state/file-state";
import {LikeType, smileys} from "../../../like/enums/like-type.enum";
import {Like} from "../../../like/state/like-actions";
import {LikeModel} from "../../../like/models/likeModel.interface";
import {LikeCreateModel} from "../../../like/models/likeCreateModel.interface";
import {AuthState} from "../../../auth/state/auth-state";
import {ProfileModel} from "../../../auth/models/profileModel.interface";


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit{

  @Input() post! : PostModel;

  @Select(PostState.selectedPost) selected$!: Observable<PostModel | null>;
  @Select(PostState.deleteLoading) deleteLoading$!: Observable<boolean>;
  @Select(FileState.imagesUrl) imagesUrl$!: Observable<Map<string, string>> ;
  @Select(AuthState.profile) profile$!: Observable<ProfileModel|null> ;

  userId : string | null = null;
  constructor(private fileService: FileService, private store: Store) {
  }

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if(profile) this.userId = profile.user_id;
    })
  }

  download(file: FileModel) {
    this.fileService.download(file.url).subscribe((data) => {
      importedSaveAs(data, file.name)
    });
  }

  imageFiles (post : PostModel | null) : FileModel[] {
    return post?.files.filter(f => f.type.startsWith('image')) ?? [];
  }

  noImageFiles (post : PostModel | null) : FileModel[] {
    return post?.files.filter(f => !f.type.startsWith('image')) ?? [];
  }

  like(type: LikeType) {

    const like : LikeCreateModel = {type: type, post_id: this.post.id }
    this.store.dispatch(new Like.Create(like));

    console.log(type);
    console.log(this.post.content);
  }

 currentLike () : LikeModel | null {
    if(this.userId){
      const currentLikes = this.post.likes.filter(x => x.owner.id === this.userId);
      if(currentLikes.length > 0) return currentLikes[0];
    }
    return null;
  }

  aggregatedlikes () : [LikeType, LikeModel[]][]{

    // const likes : LikeModel[] = [
    //   {type: LikeType.SAD, id:"1", createdAt:new Date(), owner: {id: "11", createdAt: new Date(), firstName:"fn1", lastName:"ln1"}},
    //   {type: LikeType.SAD, id:"2", createdAt:new Date(), owner: {id: "12", createdAt: new Date(), firstName:"fn2", lastName:"ln2"}},
    //   {type: LikeType.SURPRISED, id:"3", createdAt:new Date(), owner: {id: "13", createdAt: new Date(), firstName:"fn3", lastName:"ln3"}},
    //   {type: LikeType.ANGRY, id:"4", createdAt:new Date(), owner: {id: "14", createdAt: new Date(), firstName:"fn4", lastName:"ln4"}},
    //   {type: LikeType.SURPRISED, id:"5", createdAt:new Date(), owner: {id: "15", createdAt: new Date(), firstName:"fn5", lastName:"ln5"}},
    //   {type: LikeType.ANGRY, id:"6", createdAt:new Date(), owner: {id: "16", createdAt: new Date(), firstName:"fn6", lastName:"ln6"}},
    //   {type: LikeType.SMILE, id:"1", createdAt:new Date(), owner: {id: "11", createdAt: new Date(), firstName:"fn1", lastName:"ln1"}},
    //   {type: LikeType.SURPRISED, id:"3", createdAt:new Date(), owner: {id: "13", createdAt: new Date(), firstName:"fn3", lastName:"ln3"}},
    //   {type: LikeType.ANGRY, id:"4", createdAt:new Date(), owner: {id: "14", createdAt: new Date(), firstName:"fn4", lastName:"ln4"}},
    //   {type: LikeType.SURPRISED, id:"5", createdAt:new Date(), owner: {id: "15", createdAt: new Date(), firstName:"fn5", lastName:"ln5"}},
    // ];

    // @ts-ignore
    // const groupedLikes : Map<LikeType, LikeModel[]> =  Map.groupBy(likes, like => like.type);

    // @ts-ignore
    const groupedLikes : Map<LikeType, LikeModel[]> =  Map.groupBy(this.post.likes, like => like.type);


    const sortedLikes = Array.from(groupedLikes.entries()).sort((a, b) => b[1].length - a[1].length);
    return sortedLikes.slice(0,3);
  }

  protected readonly smileys = smileys;
}
