import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostModel} from "../../models/postModel.interface";
import {TableActions} from "../../enums/table-actions.enum";
import {Observable, of} from "rxjs";
import {Select} from "@ngxs/store";
import { saveAs as importedSaveAs} from "file-saver";
import {PostState} from "../../state/post-state";
import {FileService} from "../../../file/services/file.service";
import {FileModel} from "../../../file/models/fileModel.interface";
import {FileState} from "../../../file/state/file-state";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{

  @Input() headers: Array<{headerName: string, fieldName: keyof PostModel}> = [];
  @Input() posts$: Observable<ReadonlyArray<PostModel>> = of([]);
  @Output() post = new EventEmitter<{post: PostModel, action :TableActions}>();
  headerFields: string[] = [];

  @Select(PostState.selectedPost) selected$!: Observable<PostModel | null>;
  @Select(PostState.deleteLoading) deleteLoading$!: Observable<boolean>;

  @Select(FileState.imagesUrl) imagesUrl$!: Observable<Map<string, string>> ;

  constructor(private fileService: FileService) {
  }

  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields() {
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectPost(post: PostModel, action: TableActions) {
    this.post.emit({post, action});
  }

  download(file: FileModel) {
    this.fileService.download(file.url).subscribe((data) => {
      importedSaveAs(data, file.name)
    });
  }

  imageFiles (post : PostModel) : FileModel[] {
    return post.files.filter(f => f.type.startsWith('image'));
  }

  noImageFiles (post : PostModel) : FileModel[] {
    return post.files.filter(f => !f.type.startsWith('image'));
  }

}
