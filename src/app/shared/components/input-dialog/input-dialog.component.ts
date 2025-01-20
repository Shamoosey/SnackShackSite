import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
  standalone: false
})
export class InputDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onCloseDialog(buttonClicked: "primary" | "secondary"){
    this.dialogRef.close({
      primaryButtonClicked: buttonClicked == "primary",
      secondaryButtonClicked: buttonClicked == "secondary"
    } as DialogResult)
  }
}

export interface DialogResult {
  primaryButtonClicked: boolean;
  secondaryButtonClicked: boolean; 
  inputResult: unknown
}

export interface DialogData {
  title: string,
  inputTitle: string,
  inputPlaceholder: string,
  primaryButtonText: string,
  secondaryButtonText: string
}