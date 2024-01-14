import {
  Component,
  Input,
  ElementRef,
  OnInit,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {Schema, DOMSerializer} from 'prosemirror-model'
import {addListNodes} from 'prosemirror-schema-list'
import {exampleSetup} from 'prosemirror-example-setup'
import {mentionPlugin} from "../plugins";
import schema1 from "../schema";
import {smileys} from "../../../../like/enums/like-type.enum";
import {UserTooltipComponent} from "../../../user-tooltip/user-tooltip.component";
import {Select} from "@ngxs/store";
import {PostState} from "../../../../post/state/post-state";
import {Observable} from "rxjs";
import {PostModel} from "../../../../post/models/postModel.interface";
import {AppUserState} from "../../../../user/state/appUser-state";
import {AppUserModel} from "../../../../user/models/appUserModel.interface";

// const users = [
//   {
//     name: 'John Doe1',
//     id: '101',
//     email: 'joe@gmail.com',
//   },
//   {
//     name: 'Joe Lewis',
//     id: '102',
//     email: 'lewis@gmail.com',
//   },
// ];

@Component({
  selector: 'app-prose-mirror-display',
  templateUrl: './prose-mirror-display.component.html',
  styleUrls: ['./prose-mirror-display.component.scss']
})
export class ProseMirrorDisplayComponent implements OnInit{

  @Input() content! : string;

  @Select(AppUserState.appUsers) users$!: Observable<AppUserModel[]> ;
  users : AppUserModel[] = [];

  constructor(private elRef: ElementRef, private viewContainerRef: ViewContainerRef){
    this.users$.subscribe(x => this.users = x);
  }

  ngOnInit(){
    const plugins = exampleSetup({ schema: schema1 });
    plugins.unshift(mentionPlugin(this.users));
    const schema= new Schema({
      nodes: addListNodes(schema1.spec.nodes, "paragraph block*", "block"),
      marks: schema1.spec.marks
    });
    const node = schema.nodeFromJSON(JSON.parse(this.content))
    const element = DOMSerializer.fromSchema(schema).serializeFragment(node.content);
    const tags = element.querySelectorAll(".prosemirror-mention-node");
    tags.forEach(tag => {
      tag.className = "tag-display";
      tag.addEventListener("mouseover", (event : any) => {
        event.stopPropagation();
        const userTooltip = event.target?.children[0];
        if(!userTooltip) return;
        userTooltip.firstChild.style = "display: inline;"
      });
      tag.addEventListener("mouseout", (event: any) => {
        event.stopPropagation();
        if(event.toElement.className.toString().includes("tooltip")) return;
        const element = event.target.children[0];
        if(element && element.firstChild){
          element.firstChild.style = "display : none;";
        }
      });
      const tooltip = this.viewContainerRef.createComponent(UserTooltipComponent);
      tooltip.instance.user = tag.getAttribute("data-mention-name")!;
      tooltip.instance.targetId = tag.getAttribute("data-mention-id")!;
      tag.appendChild(tooltip.location.nativeElement);
    }) ;
    this.elRef.nativeElement.querySelector('#display').appendChild(element);
  }

}
