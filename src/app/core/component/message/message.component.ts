import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../service/message/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message: any = null;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  close(): void {
    this.messageService.clear();
  }

  get messageClass(): string {
    if (!this.message) return '';
    return `message-${this.message.type}`;
  }
}
