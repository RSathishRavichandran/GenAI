import { Component, ElementRef,ViewChild, AfterViewInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  messages: { text: string, fromBot: boolean }[] = [];
  newMessageText: string = '';
  displayTable: boolean = false;
  tableData: any[] = [];
  botResponses: string[] = [];
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    // Mock chatbot messages
    this.messages.push({ text: 'How can I help you today?', fromBot: true });
  }

  sendMessage() {
    const userMessage = this.newMessageText.trim();
    if (userMessage) {
      this.messages.push({ text: userMessage, fromBot: false });


      // Check if user requested a table
      if (userMessage.toLowerCase() == 'show table') {
        this.tableData = this.chatService.getTableData();
        this.messages.push({ text: userMessage, fromBot: true });
      }
      else{
        const botResponse = this.chatService.getBotResponse(userMessage);
        this.messages.push({ text: botResponse, fromBot: true });

      }

      // Reset input field
      this.newMessageText = '';
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.messagesContainer) {
          this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        }
      });
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  
}
