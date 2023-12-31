import { Component, Input, ElementRef } from '@angular/core';
import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {Schema, DOMParser, DOMSerializer} from 'prosemirror-model'
// import {schema} from 'prosemirror-schema-basic'
import {addListNodes} from 'prosemirror-schema-list'
import {exampleSetup} from 'prosemirror-example-setup'
import {mentionPlugin} from "./plugins";
import schema1 from "./schema";

declare global {
  interface Window {
    view: any
  }
}

@Component({
  selector: 'prose-mirror',
  templateUrl: './prose-mirror.component.html',
  styles: [`@import url('https://prosemirror.net/css/editor.css');
  :host {display: block;}
  #editor {height: 200px;}
  #content {display: none;}
  `]
})
export class ProseMirrorComponent  {

  private view! : EditorView;
  private mySchema! : Schema;

  // content : string | null = "";


  getContent(): string { return this.view.state.doc.toJSON(); }


  constructor(private elRef: ElementRef){}

  ngOnInit(){
    const plugins = exampleSetup({ schema: schema1 });
    plugins.unshift(mentionPlugin);

    this.mySchema = new Schema({
      nodes: addListNodes(schema1.spec.nodes, "paragraph block*", "block"),
      marks: schema1.spec.marks
    })

    this.view = new EditorView(this.elRef.nativeElement.querySelector('#editor'), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(this.mySchema).parse(this.elRef.nativeElement.querySelector('#content')),
        plugins: plugins,
        // schema : schema1
        // plugins: exampleSetup({schema: mySchema})
      })
    })

  }


  // getContent() {
  //   return DOMSerializer.fromSchema(this.mySchema).serializeFragment(this.view.state.doc.content);
  // }
  log() {
    const x = this.getContent();
    console.log(this.getContent());
    console.log(this.view.state.doc.toJSON())
    // this.content = x.textContent;
    this.elRef.nativeElement.querySelector('#display').appendChild(x);
  }
}


