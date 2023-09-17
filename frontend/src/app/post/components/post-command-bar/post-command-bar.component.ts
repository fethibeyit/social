import {Component, EventEmitter, Output} from '@angular/core';
import {CommandBarActions} from "../../enums/command-bar-actions.enum";

@Component({
  selector: 'app-post-command-bar',
  templateUrl: './post-command-bar.component.html',
  styleUrls: ['./post-command-bar.component.scss']
})
export class PostCommandBarComponent {
  @Output() action = new EventEmitter<CommandBarActions>()

  emitAction(action: CommandBarActions) {
    this.action.emit(action);
  }

  protected readonly CommandBarActions = CommandBarActions;
}
