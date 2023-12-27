import { Component, Input, ElementRef } from '@angular/core';
import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {Schema, DOMParser} from 'prosemirror-model'
// import {schema} from 'prosemirror-schema-basic'
import {addListNodes} from 'prosemirror-schema-list'
import {exampleSetup} from 'prosemirror-example-setup'
import {mentionPlugin} from "../comment-edit/plugins";
import schema1 from "../comment-edit/schema";

declare global {
  interface Window {
    view: any
  }
}

@Component({
  selector: 'prose-mirror',
  template: `<div id="editor"></div><div id="content"><p>hello</p></div>`,
  styles: [`@import url('https://prosemirror.net/css/editor.css');
  :host {display: block;}
  #editor {height: 200px;}
  #content {display: none;}
  `]
})
export class ProseMirrorComponent  {

  constructor(private elRef: ElementRef){}

  ngOnInit(){

    const plugins = exampleSetup({ schema: schema1 });
    plugins.unshift(mentionPlugin);

    const mySchema = new Schema({
      nodes: addListNodes(schema1.spec.nodes, "paragraph block*", "block"),
      marks: schema1.spec.marks
    })

    window.view = new EditorView(this.elRef.nativeElement.querySelector('#editor'), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(this.elRef.nativeElement.querySelector('#content')),
        plugins: plugins,
        // schema : schema1
        // plugins: exampleSetup({schema: mySchema})
      })
    })
  }

}


