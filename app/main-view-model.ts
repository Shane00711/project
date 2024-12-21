import { Observable } from '@nativescript/core';
import { GameModel } from './models/game';
import { GameRules } from './models/rules';

export class MainViewModel extends Observable {
  private game: GameModel;
  private _selectedSuit: string | undefined;

  constructor() {
    super();
    this.game = new GameModel();
  }

  playCard(args: any) {
    const index = args.index;
    const card = this.currentPlayer.cards[index];

    if (card.value === 8) {
      // Show suit selection dialog for 8s
      // For now, defaulting to hearts
      this._selectedSuit = 'hearts';
    }

    if (this.game.playCard(index, this._selectedSuit)) {
      this._selectedSuit = undefined;
      this.game.nextTurn();
      this.notifyPropertyChange('currentPlayer', this.currentPlayer);
    }
  }

  drawCard() {
    this.game.drawCard();
    this.game.nextTurn();
    this.notifyPropertyChange('currentPlayer', this.currentPlayer);
  }

  // ... existing methods and getters
}