import { Card } from './card';

export class GameRules {
  static isValidMove(playedCard: Card, topCard: Card, declaredSuit?: string): boolean {
    // 8s are wild
    if (playedCard.value === 8) {
      return true;
    }

    // If previous card was an 8, check against declared suit
    if (topCard.value === 8 && declaredSuit) {
      return playedCard.suit === declaredSuit;
    }

    // Match suit or value
    return playedCard.suit === topCard.suit || playedCard.value === topCard.value;
  }

  static getPlayableCards(hand: Card[], topCard: Card, declaredSuit?: string): Card[] {
    return hand.filter(card => this.isValidMove(card, topCard, declaredSuit));
  }
}