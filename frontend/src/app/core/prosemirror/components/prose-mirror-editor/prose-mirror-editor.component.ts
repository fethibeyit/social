import {Component, ElementRef, OnInit} from '@angular/core';
import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {Schema, DOMParser, DOMSerializer} from 'prosemirror-model'

import {addListNodes} from 'prosemirror-schema-list'
import {exampleSetup} from 'prosemirror-example-setup'
import {mentionPlugin} from "../plugins";
import schema1 from "../schema";

declare global {
  interface Window {
    view: any
  }
}

@Component({
  selector: 'prose-mirror',
  templateUrl: './prose-mirror-editor.component.html',
  styles: [`@import url('https://prosemirror.net/css/editor.css');
  :host {display: block;}
  #editor {height: 200px;}
  #content {display: none;}
  `]
})
export class ProseMirrorEditorComponent implements OnInit{

  private view! : EditorView;
  private mySchema! : Schema;

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
        plugins: plugins
      })
    })
  }

  getContent(): string { return this.view.state.doc.toJSON(); }

  public isEmpty(){
    const fragment = DOMSerializer
      .fromSchema(this.mySchema)
      .serializeFragment(this.view.state.doc.content)

    let divPM = document.createElement('div')
    divPM.appendChild(fragment)

    divPM.innerHTML = divPM.innerHTML.replaceAll(" ", "");
    divPM.innerHTML = divPM.innerHTML.replaceAll("<p></p>", "");

    return !divPM.innerHTML;
  }

}


