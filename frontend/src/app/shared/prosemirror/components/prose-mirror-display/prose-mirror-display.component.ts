import {Component, Input, ElementRef, OnInit} from '@angular/core';
import {Schema, DOMSerializer} from 'prosemirror-model'
import {addListNodes} from 'prosemirror-schema-list'
import {exampleSetup} from 'prosemirror-example-setup'
import {mentionPlugin} from "../plugins";
import schema1 from "../schema";
import {CommentModel} from "../../../../comment/models/commentModel.interface";
import {smileys} from "../../../../like/enums/like-type.enum";

@Component({
  selector: 'app-prose-mirror-display',
  templateUrl: './prose-mirror-display.component.html',
  styleUrls: ['./prose-mirror-display.component.scss']
})
export class ProseMirrorDisplayComponent implements OnInit{

  @Input() comment! : CommentModel;

  constructor(private elRef: ElementRef){}

  ngOnInit(){
    const plugins = exampleSetup({ schema: schema1 });
    plugins.unshift(mentionPlugin);
    const schema= new Schema({
      nodes: addListNodes(schema1.spec.nodes, "paragraph block*", "block"),
      marks: schema1.spec.marks
    });
    const node = schema.nodeFromJSON(JSON.parse(this.comment.content))
    const element = DOMSerializer.fromSchema(schema).serializeFragment(node.content);
    this.elRef.nativeElement.querySelector('#display').appendChild(element);
  }

  protected readonly smileys = smileys;
}
