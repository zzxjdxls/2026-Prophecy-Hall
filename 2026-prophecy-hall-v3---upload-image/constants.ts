
import { TarotCard } from './types';

export const CARD_LIBRARY: TarotCard[] = [
  {
    id: 1,
    name: "Morning Star",
    theme: "Career/Leadership",
    keywords: ["Leadership", "New Beginnings", "Purpose"],
    baseMeaning: "A signal of professional sovereignty and rising to one's true purpose.",
    fixedVisual: "A radiant, solitary star rising above a misty, dark mountain range at dawn.",
    fixedMeaning: "The Morning Star rises to signal the end of a long night. You are entering a period of professional sovereignty. The fog is lifting, revealing a path of leadership that has been waiting for you. 2026 is not merely about a promotion; it is an ascension to your true purpose.",
    staticImage: "https://i.postimg.cc/cLnww0jR/morning-star.jpg"
  },
  {
    id: 2,
    name: "Golden Fruit",
    theme: "Wealth/Abundance",
    keywords: ["Harvest", "Reward", "Stability"],
    baseMeaning: "The energy of harvest and tangible rewards for past efforts.",
    fixedVisual: "A glowing golden tree or pomegranate hanging from a silver branch.",
    fixedMeaning: "This card embodies the energy of the Harvest. The universe is aligning to repay your past efforts with tangible rewards. Resources will no longer be a struggle, but a tool. You are entering a cycle of material stability where opportunity ripens on the branch, waiting only for your hand.",
    staticImage: "https://i.postimg.cc/DfSrnrgL/golden-fruit.jpg"
  },
  {
    id: 3,
    name: "Evergreen",
    theme: "Health/Vitality",
    keywords: ["Resilience", "Healing", "Equilibrium"],
    baseMeaning: "Deep restorative healing and enduring resilience.",
    fixedVisual: "An ancient pine tree with glowing emerald needles standing strong in a snowy twilight.",
    fixedMeaning: "Like the ancient pine that withstands the winter, your spirit possesses an enduring resilience. The Evergreen speaks of deep, restorative healing. You will find a grounding energy that anchors your physical vessel. It is a time of equilibrium, where your energy reserves are replenished by the earth itself.",
    staticImage: "https://i.postimg.cc/Kc1hy8HT/evergreen.jpg"
  },
  {
    id: 4,
    name: "Warm Hearth",
    theme: "Family/Belonging",
    keywords: ["Sanctuary", "Protection", "Harmony"],
    baseMeaning: "The sacred center of the world and protection of loved ones.",
    fixedVisual: "A stone fireplace with a magical violet and orange fire.",
    fixedMeaning: "The Hearth represents the sacred center of your world. It signifies a protection circle drawn around your loved ones. Old discords will melt away in the warmth of shared understanding. This year, your home becomes a true sanctuary—a place where the chaotic energies of the outside world cannot enter.",
    staticImage: "https://i.postimg.cc/0ydLCMz1/warm-hearth.jpg"
  },
  {
    id: 5,
    name: "Spring of Muse",
    theme: "Creativity/Insight",
    keywords: ["Inspiration", "Flow", "Brilliance"],
    baseMeaning: "Becoming a channel for divine inspiration and fluid brilliance.",
    fixedVisual: "A glowing blue stream of water pouring from a floating silver cup in the sky.",
    fixedMeaning: "You have drawn the card of pure flow. The Muse whispers that you are becoming a channel for divine inspiration. The mental blocks that once held you back are dissolving into fluid brilliance. You will birth ideas that feel larger than yourself, as the waters of intuition rush freely through your mind.",
    staticImage: "https://i.postimg.cc/rFK8w9Zt/spring-of-muse-crop.jpg"
  },
  {
    id: 6,
    name: "Red Knot",
    theme: "Love/Destiny",
    keywords: ["Karma", "Connection", "Soulmate"],
    baseMeaning: "A Karmic contract fulfilled and a destined alignment.",
    fixedVisual: "Two hands reaching towards each other connected by a glowing red thread.",
    fixedMeaning: "The Red Knot symbolizes a Karmic contract being fulfilled. Threads of destiny are tightening, pulling a significant soul closer to your orbit. This is not a fleeting romance but a destined alignment. The connection will feel recognized by your soul, ancient, inevitable, and profoundly safe.",
    staticImage: "https://i.postimg.cc/j2tfPFm5/red-knot.jpg"
  },
  {
    id: 7,
    name: "Metamorphosis",
    theme: "Growth",
    keywords: ["Change", "Evolution", "Rebirth"],
    baseMeaning: "The Great Alchemical Change and emerging fundamentally changed.",
    fixedVisual: "A prismatic butterfly emerging from a cracked golden stone shell.",
    fixedMeaning: "You are in the chrysalis phase no longer. This card signifies the Great Alchemical Change. The trials of the past were merely the fire necessary to forge your wings. You are emerging into 2026 not just improved, but fundamentally changed—lighter, freer, and vibrant with colors you didn't know you possessed.",
    staticImage: "https://i.postimg.cc/mgJdx7tS/metamorphosis-crop.jpg"
  },
  {
    id: 8,
    name: "Star Guidance",
    theme: "Wishes/Dreams",
    keywords: ["Synchronicity", "Destiny", "Alignment"],
    baseMeaning: "The Heavens charting a specific course for you.",
    fixedVisual: "An antique compass floating in the void, pointing towards a bright nebula.",
    fixedMeaning: "The Heavens are charting a course specifically for you. This card serves as a cosmic compass. It indicates that the reality of your desires is vanishing. Synchronicity will become your daily language; follow the signs, for the universe is conspiring to place you exactly where you belong.",
    staticImage: "https://i.postimg.cc/xTb5vcsN/star-guidance.jpg"
  }
];

export const TIMEOUT_MS = 25000;
export const API_KEY = process.env.API_KEY || '';
