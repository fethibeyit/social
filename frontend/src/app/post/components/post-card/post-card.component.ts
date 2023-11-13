import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../models/postModel.interface";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import { saveAs as importedSaveAs} from "file-saver";
import {PostState} from "../../state/post-state";
import {FileService} from "../../../file/services/file.service";
import {FileModel} from "../../../file/models/fileModel.interface";
import {FileState} from "../../../file/state/file-state";
import {LikeType} from "../../../like/enums/like-type.enum";
import {Like} from "../../../like/state/like-actions";
import {LikeModel} from "../../../like/models/likeModel.interface";
import {LikeCreateModel} from "../../../like/models/likeCreateModel.interface";


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit{

  @Input() post!: PostModel;

  @Select(PostState.selectedPost) selected$!: Observable<PostModel | null>;
  @Select(PostState.deleteLoading) deleteLoading$!: Observable<boolean>;
  @Select(FileState.imagesUrl) imagesUrl$!: Observable<Map<string, string>> ;

  constructor(private fileService: FileService, private store: Store) {
  }

  ngOnInit(): void {
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
}
