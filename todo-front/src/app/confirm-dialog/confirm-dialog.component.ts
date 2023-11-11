import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
data: any;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  closeDialog(): void {
    // You can perform any additional logic here before closing the dialog
    this.dialogRef.close();
  }

}
