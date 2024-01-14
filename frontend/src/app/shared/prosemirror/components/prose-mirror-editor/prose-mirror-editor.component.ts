import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {EditorState, Plugin} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {Schema, DOMParser, DOMSerializer} from 'prosemirror-model'

import {addListNodes} from 'prosemirror-schema-list'
import {buildMenuItems, exampleSetup} from 'prosemirror-example-setup'
import {mentionPlugin} from "../plugins";
import schema1 from "../schema";
import {icons, wrapItem} from "prosemirror-menu";


@Component({
  selector: 'prose-mirror-editor',
  templateUrl: './prose-mirror-editor.component.html',
  styleUrls: ['./prose-mirror-editor.component.scss']
})
export class ProseMirrorEditorComponent implements OnInit{

  @Output() action = new EventEmitter();

  private view! : EditorView;
  private mySchema! : Schema;

  constructor(private elRef: ElementRef){}

  ngOnInit(){

    const plugins = exampleSetup({
      schema: schema1,
      menuBar : false,
      // menuContent: [[
      //   buildMenuItems(schema1).toggleStrong!,
      //   buildMenuItems(schema1).toggleEm!,
      //   // buildMenuItems(schema1).wrapBulletList!,
      //   // buildMenuItems(schema1).wrapOrderedList!,
      //   buildMenuItems(schema1).wrapBlockQuote!,
      //   buildMenuItems(schema1).makeHead1!,
      //   buildMenuItems(schema1).makeHead2!,
      //   // buildMenuItems(schema1).insertHorizontalRule!,
      // ]]
    });
    plugins.unshift(mentionPlugin);
    // plugins.unshift(menu);

    this.mySchema = new Schema({
      nodes: addListNodes(schema1.spec.nodes, "paragraph block*", "block"),
      marks: schema1.spec.marks
    })

    this.view = new EditorView(this.elRef.nativeElement.querySelector('#editor'), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(this.mySchema).parse(this.elRef.nativeElement.querySelector('#content')),
        plugins: plugins,

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

  emitAction() {
    this.action.emit(this.getContent())
  }
}

