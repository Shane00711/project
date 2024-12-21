import { Observable } from '@nativescript/core';
import { Card } from './card';

export class Player extends Observable {
  private _cards: Card[] = [];
  private _name: string;
  private _isAI: boolean;

  constructor(name: string, isAI: boolean = false) {
    super();
    this._name = name;
    this._isAI = isAI;
  }

  get cards(): Card[] {
    return this._cards;
  }

  get name(): string {
    return this._name;
  }

  get isAI(): boolean {
    return this._isAI;
  }

  addCards(cards: Card[]): void {
    this._cards.push(...cards);
    this.notifyPropertyChange('cards', this._cards);
  }

  playCard(index: number): Card {
    const card = this._cards.splice(index, 1)[0];
    this.notifyPropertyChange('cards', this._cards);
    return card;
  }
}