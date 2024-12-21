import { TimerService } from '../services/timer.service';
import { WebSocketService } from '../services/websocket.service';

export class GameModel extends Observable {
  private timer: TimerService;
  private websocket: WebSocketService;
  
  constructor(gameId: string) {
    super();
    this.timer = new TimerService(30); // 30 seconds per turn
    this.websocket = new WebSocketService(gameId);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.timer.on('turnTimeout', () => this.handleTurnTimeout());
    this.websocket.on('move', (data) => this.handleRemoteMove(data));
  }

  private handleTurnTimeout(): void {
    // Auto-draw card and end turn
    this.drawCard();
    this.nextTurn();
  }

  private handleRemoteMove(move: any): void {
    // Handle moves from other players
    if (move.type === 'playCard') {
      this.playCard(move.cardIndex, move.declaredSuit);
    } else if (move.type === 'drawCard') {
      this.drawCard();
    }
    this.nextTurn();
  }

  nextTurn(): void {
    this._currentPlayerIndex = (this._currentPlayerIndex + 1) % this._players.length;
    this.timer.startTurn();
    this.notifyPropertyChange('currentPlayer', this.currentPlayer);
  }

  // ... rest of the existing code
}