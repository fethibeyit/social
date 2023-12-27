import {Component, OnDestroy, OnInit} from '@angular/core';
import {Editor, Toolbar} from "ngx-editor";
import schema1 from "./schema";
import {plugins} from "./plugins";

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit, OnDestroy {

  // @ts-ignore
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  html = 'Hello world!';

  ngOnInit(): void {
    this.editor = new Editor({
      schema : schema1,
      plugins,
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  items: string[] = ["Noah", "Liam", "Mason", "Jacob"];

  text: string | undefined;

  format(item:any) {
    return '<b>' + item['value'].toUpperCase() + '</b>' ;
  }

  complexItems = [
    {
      "value" : "user1",
      "email": "user1@domain.com",
      "name": "User One"
    },
    {
      "value" : "user2",
      "email": "user2@domain.com",
      "name": "User Two"
    },
    {
      "value" : "user3",
      "email": "user3@domain.com",
      "name": "User Three"
    }
  ];
}
