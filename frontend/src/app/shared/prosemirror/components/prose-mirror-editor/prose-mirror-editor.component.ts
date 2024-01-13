import {Component, ElementRef, OnInit} from '@angular/core';
import {EditorState, Plugin} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {Schema, DOMParser, DOMSerializer} from 'prosemirror-model'

import {addListNodes} from 'prosemirror-schema-list'
import {buildMenuItems, exampleSetup} from 'prosemirror-example-setup'
import {mentionPlugin} from "../plugins";
import schema1 from "../schema";
import {icons, wrapItem} from "prosemirror-menu";


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

    const plugins = exampleSetup({
      schema: schema1,
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

}

// class MenuView {
//
//   items: any;
//   editorView : any;
//   dom : any;
//   constructor(items, editorView) {
//     this.items = items
//     this.editorView = editorView
//
//     this.dom = document.createElement("div")
//     this.dom.className = "menubar"
//     items.forEach(({dom}) => this.dom.appendChild(dom))
//     this.update()
//
//     this.dom.addEventListener("mousedown", e => {
//       e.preventDefault()
//       editorView.focus()
//       items.forEach(({command, dom}) => {
//         if (dom.contains(e.target))
//           command(editorView.state, editorView.dispatch, editorView)
//       })
//     })
//   }
//
//   update() {
//     this.items.forEach(({command, dom}) => {
//       let active = command(this.editorView.state, null, this.editorView)
//       dom.style.display = active ? "" : "none"
//     })
//   }
//
//   destroy() { this.dom.remove() }
// }
//
// function menuPlugin(items) {
//   return new Plugin({
//     view(editorView) {
//       let menuView = new MenuView(items, editorView);
//       editorView.dom.parentNode!.insertBefore(menuView.dom, editorView.dom)
//       return menuView
//     }
//   })
// }
//
// // Helper function to create menu icons
// function icon(text, name) {
//   let span = document.createElement("span")
//   span.className = "menuicon " + name
//   span.title = name
//   span.textContent = text
//   return span
// }
//
// import {toggleMark, setBlockType, wrapIn} from "prosemirror-commands"
// import {schema} from "prosemirror-schema-basic"
//
//
// // Create an icon for a heading at the given level
// function heading(level) {
//   return {
//     command: setBlockType(schema.nodes.heading, {level}),
//     dom: icon("H" + level, "heading")
//   }
// }
//
// let menu = menuPlugin([
//   {command: toggleMark(schema.marks.strong), dom: icon("B", "strong")},
//   {command: toggleMark(schema.marks.em), dom: icon("i", "em")},
//   {command: setBlockType(schema.nodes.paragraph), dom: icon("p", "paragraph")},
//   heading(1), heading(2), heading(3),
//   {command: wrapIn(schema.nodes.blockquote), dom: icon(">", "blockquote")}
// ])
