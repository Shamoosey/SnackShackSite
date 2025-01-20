import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateAccountInfoRequest } from '../../../core/data/models';

@Component({
  selector: 'app-update-account-info-dialog',
  templateUrl: './update-account-info-dialog.component.html',
  styleUrls: ['./update-account-info-dialog.component.scss'],
  standalone: false
})
export class UpdateAccountInfoDialogComponent implements OnInit {
  accountName = new FormControl<string>("")
  
  constructor(
    public dialogRef: MatDialogRef<UpdateAccountInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateAccountInfoDialogData
  ) { }

  ngOnInit(): void {
    this.accountName = new FormControl<string>(this.data.accountName);
  }

  onCloseDialog(buttonClicked: "primary" | "secondary"){
    if(this.accountName.valid || buttonClicked == "secondary"){
      this.dialogRef.close({
        primaryButtonClicked: buttonClicked == "primary",
        secondaryButtonClicked: buttonClicked == "secondary",
        inputResult: {
          accountName: this.accountName.value as string
        }
      } as InputDialogResult)
    }
  }
}

export interface InputDialogResult {
  primaryButtonClicked: boolean;
  secondaryButtonClicked: boolean; 
  inputResult: UpdateAccountInfoRequest
}

export interface UpdateAccountInfoDialogData {
  accountName: string;
  currencyCode: string
}