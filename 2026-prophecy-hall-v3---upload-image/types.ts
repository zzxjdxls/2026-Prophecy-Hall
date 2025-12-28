export interface TarotCard {
  id: number;
  name: string;
  theme: string;
  keywords: string[];
  baseMeaning: string;
  fixedVisual: string;
  fixedMeaning: string;
  staticImage: string;
}

export interface ReadingResult {
  card1Image: string; // Base64 or URL
  card2Image: string; // Base64 or URL
}

export enum AppState {
  INTRO = 'INTRO',
  SELECTION = 'SELECTION',
  FETCHING = 'FETCHING',
  REVEAL = 'REVEAL',
  ERROR = 'ERROR' 
}
