import { AfterViewInit, Component, Input, ViewChild, OnInit, ElementRef } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from './../auth/auth.component';
// declare jquery as any
declare const $: any;


@Component({
  selector: 'wager-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss', './slide.mobile.scss']
})
export class SlideComponent implements OnInit, AfterViewInit {

  @ViewChild("textElement") textElement: ElementRef;
  @ViewChild("blinkElement") blinkElement: ElementRef;
  @Input() wordArray: string[] = [
    " we bear the risk of loosing the bet.    ",
    " we share winning percentage with you.     ",
    //" Get help with accademic work from fellow students.     ",
    //" Get links to helpful  academic resources.     ",
    //" Get links to income generating resources.     ",
    //" Give help with accademic work to fellow students.     ",
  ];

  private i = 0;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAuthComponent() {
    this.dialog.open(AuthComponent);
  }


  ngAfterViewInit(): void {
    this.typingEffect();
  }

  private typingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        this.deletingEffect();
        return;
      }
      setTimeout(loopTyping, 300);
    };
    loopTyping();
  }

  private deletingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement.nativeElement.innerHTML = word.join("");
      } else {
        if (this.wordArray.length > this.i + 1) {
          this.i++;
        } else {
          this.i = 0;
        }
        this.typingEffect();
        return;
      }
      setTimeout(loopDeleting, 100);
    };
    loopDeleting();
  }





}
