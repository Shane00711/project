import { Observable } from '@nativescript/core';

export class WebSocketService extends Observable {
  private socket: any;
  private gameId: string;

  constructor(gameId: string) {
    super();
    this.gameId = gameId;
    this.socket = new WebSocket(`wss://your-game-server.com/game/${gameId}`);
    this.setupListeners();
  }

  private setupListeners(): void {
    this.socket.on('open', () => this.notify({ eventName: 'connected' }));
    this.socket.on('message', (message) => this.handleMessage(JSON.parse(message)));
    this.socket.on('close', () => this.notify({ eventName: 'disconnected' }));
  }

  private handleMessage(message: any): void {
    this.notify({ eventName: message.type, data: message.data });
  }

  sendMove(move: any): void {
    this.socket.send(JSON.stringify({
      type: 'move',
      gameId: this.gameId,
      data: move
    }));
  }
}