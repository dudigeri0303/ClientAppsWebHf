import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  @Input()
  componentId: string;

  @Output()
  onYes = new EventEmitter<void>();

  @Output()
  onNo = new EventEmitter<void>();

  constructor() { }

  initParameters(outputs: { onYes: (...args: any[]) => any, onNo: (...args: any[]) => any }) {
    this.onYes.subscribe(outputs["onYes"]);
    this.onNo.subscribe(outputs["onNo"]);
  }
}
