import { TarotCard, ReadingResult } from "../types";

export const fetchFortuneReading = async (card1: TarotCard, card2: TarotCard): Promise<ReadingResult> => {
  // Use the static images for the cards. 
  // We no longer need the Gemini AI synthesis for this version.
  return {
    card1Image: card1.staticImage,
    card2Image: card2.staticImage,
  };
};
