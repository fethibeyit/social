import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-tooltip',
  templateUrl: './user-tooltip.component.html',
  styleUrls: ['./user-tooltip.component.scss']
})
export class UserTooltipComponent implements OnInit{

  @Input() user: string = '';
  @Input() targetId: string = '';

  content : string = '';

  constructor(private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.content = 'contenu exemple';
  }

  onLeave(event: any) {
    console.log(event.toElement.getAttribute("data-mention-id") === this.targetId)
    if(event.toElement.getAttribute("data-mention-id") === this.targetId) return;
    const displaySpan = this.elRef.nativeElement.querySelector('#display-span');
    displaySpan.style = "display : none;";
  }
}
