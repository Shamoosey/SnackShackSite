import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '../dialog/dialog.component';

@Component({
  selector: 'slot-machine',
  templateUrl: './slot-machine.component.html',
  standalone: false,
  styleUrl: './slot-machine.component.scss'
})
export class SlotMachineComponent implements OnInit {
  resultText = ""
  
  constructor(
    private dialog: MatDialog
  ){

  }

  rolling = false;
  result = new Array<string>();

  iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
  // Width of the icons
  icon_width = 79;	
  // Height of one icon in the strip
  icon_height = 79;	
  // Number of icons in the strip
  num_icons = 9;
  // Max-speed in ms for animating one icon down
  time_per_icon = 100;
  // Holds icon indexes
  indexes = [0, 0, 0];
  
  async ngOnInit(): Promise<void> {

  }

  infoClick(){
    this.dialog.open(DialogComponent, {
      data: {
        primaryButtonText: "test",
        text: "hello",
        title: "LEGEND"
      } as DialogData
    })
  }

  async rollClick():Promise<void>{
    if (this.rolling) {
      // Prevent multiple spins while a roll is in progress
      return;
    }
  
    this.rolling = true; // Set rolling to true before starting the spin
  
    // Trigger the roll and wait for completion
    const reelsList = document.querySelectorAll('.slots > .reel');
  
    const deltas = await Promise.all(
      [...reelsList].map((reel, i) => this.roll(reel as HTMLElement, i))
    );
  
    // Update indexes based on the results of the spin
    deltas.forEach((delta: number, i: number) => {
      this.indexes[i] = (this.indexes[i] + delta) % this.num_icons;
    });
    this.resultText = this.indexes.map((i) => this.iconMap[i]).join(' - ');
  
    this.result = this.indexes.map((i) => this.iconMap[i]);
    if (this.indexes[0] == this.indexes[1] && this.indexes[1] == this.indexes[2]) {
      const winCls = this.indexes[0] === this.indexes[2] ? 'win2' : 'win1';
      const slots = document.querySelector('.slots');
      slots?.classList.add(winCls);
      setTimeout(() => {
        this.rolling = false;
        slots?.classList.remove(winCls)
      }, 2000);
    } else {
      this.rolling = false; // Reset the rolling flag after completion
    }
  

    console.log(this.result)
  }

  /*
  * I stole this code from here: https://codepen.io/josfabre/pen/abReBvP?editors=1111
  * Modified it to have types and work in angular
  */
  async roll(reel:HTMLElement, offset = 0) :Promise<number>{
    const delta = (offset + 2) * this.num_icons + Math.round(Math.random() * this.num_icons); 
	
    // Return promise so we can wait for all reels to finish
    return new Promise((resolve, reject) => {
      
      const style = getComputedStyle(reel),
            // Current background position
            backgroundPositionY = parseFloat(style["background-position-y" as any]),
            // Target background position
            targetBackgroundPositionY = backgroundPositionY + delta * this.icon_height,
            // Normalized background position, for reset
            normTargetBackgroundPositionY = targetBackgroundPositionY%(this.num_icons * this.icon_height);
      
      // Delay animation with timeout, for some reason a delay in the animation property causes stutter
      setTimeout(() => { 
        // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
        reel.style.transition = `background-position-y ${(8 + 1 * delta) * this.time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
        // Set background position
        reel.style.backgroundPositionY = `${backgroundPositionY + delta * this.icon_height}px`;
      }, offset * 150);
        
      // After animation
      setTimeout(() => {
        // Reset position, so that it doesn't get higher without limit
        reel.style.transition = `none`;
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        // Resolve this promise
        resolve(delta%this.num_icons);
      }, (8 + 1 * delta) * this.time_per_icon + offset * 150);
      
    });
  }
}