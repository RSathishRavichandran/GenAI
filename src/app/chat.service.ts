import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  getTableData(): any[] {
    return [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 25 },
      { id: 3, name: 'Doe', age: 35 }
    ];
  }

  getBotResponse(userMessage: string): string {
    const message = userMessage.trim().toLowerCase();

    switch (message) {
      case 'hello':
      case 'hi':
        return 'Hello! How can I assist you?';
      case 'how are you?':
        return 'Im doing well, thank you!';
      case 'bye':
      case 'goodbye':
        return 'Goodbye! Have a great day!';
      default:
        return 'Sorry, I didn\'t understand that.';
    }
  }
}
