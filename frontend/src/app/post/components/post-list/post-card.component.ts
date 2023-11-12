import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../models/postModel.interface";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";
import { saveAs as importedSaveAs} from "file-saver";
import {PostState} from "../../state/post-state";
import {FileService} from "../../../file/services/file.service";
import {FileModel} from "../../../file/models/fileModel.interface";
import {FileState} from "../../../file/state/file-state";


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

  constructor(private fileService: FileService) {
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
}
