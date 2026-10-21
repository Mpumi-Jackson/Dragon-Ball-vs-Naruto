import type { Character } from './characters.js';

export type BattleStat = 'speed' | 'strength' | 'durability' | 'abilities' | 'experience';
export type BattleStats = Record<BattleStat, number>;
export type BattleForm = {
  id: string;
  name: string;
  modifiers: Partial<BattleStats>;
};
export type EnvironmentTag = 'open-ground' | 'woodland' | 'rocky' | 'urban';
export type BattleProfile = {
  stats: BattleStats;
  strengths: readonly string[];
  weaknesses: readonly string[];
  forms: readonly BattleForm[];
  environmentTags: readonly EnvironmentTag[];
};

export const battleProfiles: Readonly<Record<Character['id'], BattleProfile>> = {
  goku: {
    stats: { speed: 94, strength: 98, durability: 95, abilities: 94, experience: 96 },
    strengths: ['Adaptation during a prolonged fight', 'Broad martial arts and ki toolkit'],
    weaknesses: ['May allow a rival time to reveal their full strength', 'Can over-rely on direct contests'],
    forms: [
      { id: 'super-saiyan', name: 'Super Saiyan', modifiers: { strength: 3, speed: 2, durability: 2 } },
      { id: 'ultra-instinct', name: 'Ultra Instinct', modifiers: { speed: 8, abilities: 5, durability: 2 } },
    ], environmentTags: ['open-ground', 'rocky'],
  },
  vegeta: {
    stats: { speed: 92, strength: 96, durability: 93, abilities: 92, experience: 95 },
    strengths: ['Highly disciplined offense', 'Strong ki control and tactical focus'],
    weaknesses: ['Pride can prolong a contest', 'Often favors decisive head-on pressure'],
    forms: [
      { id: 'super-saiyan-blue', name: 'Super Saiyan Blue', modifiers: { strength: 4, speed: 3, abilities: 3 } },
      { id: 'ultra-ego', name: 'Ultra Ego', modifiers: { strength: 7, durability: 4, experience: 2 } },
    ], environmentTags: ['open-ground', 'rocky'],
  },
  gohan: {
    stats: { speed: 88, strength: 92, durability: 89, abilities: 88, experience: 84 },
    strengths: ['Exceptional latent potential', 'Combines study with strong combat instincts'],
    weaknesses: ['May not prioritize training when at peace', 'Power can depend on emotional circumstances'],
    forms: [
      { id: 'ultimate', name: 'Ultimate / Potential Unleashed', modifiers: { strength: 5, abilities: 4, speed: 2 } },
      { id: 'beast', name: 'Beast', modifiers: { strength: 8, speed: 5, durability: 4 } },
    ], environmentTags: ['open-ground', 'rocky'],
  },
  piccolo: {
    stats: { speed: 82, strength: 85, durability: 88, abilities: 91, experience: 94 },
    strengths: ['Resourceful strategist', 'Regeneration and versatile techniques'],
    weaknesses: ['Lower raw output than the strongest Saiyans', 'Can take risks to protect allies'],
    forms: [
      { id: 'orange-piccolo', name: 'Orange Piccolo', modifiers: { strength: 7, durability: 6, speed: 2 } },
    ], environmentTags: ['rocky', 'woodland'],
  },
  broly: {
    stats: { speed: 85, strength: 98, durability: 97, abilities: 82, experience: 68 },
    strengths: ['Power can escalate quickly during combat', 'Exceptional physical resilience'],
    weaknesses: ['Less practiced control in some portrayals', 'Emotional escalation can affect judgment'],
    forms: [
      { id: 'wrathful', name: 'Wrathful state', modifiers: { strength: 5, durability: 4 } },
      { id: 'full-power', name: 'Full Power Super Saiyan', modifiers: { strength: 8, durability: 6, speed: 3 } },
    ], environmentTags: ['open-ground', 'rocky'],
  },
  frieza: {
    stats: { speed: 91, strength: 94, durability: 92, abilities: 91, experience: 91 },
    strengths: ['Precise ranged attacks', 'Resourceful and naturally powerful'],
    weaknesses: ['Arrogance can cloud tactical judgment', 'May underestimate a persistent opponent'],
    forms: [
      { id: 'golden', name: 'Golden Frieza', modifiers: { strength: 5, speed: 5, abilities: 3 } },
      { id: 'black', name: 'Black Frieza', modifiers: { strength: 8, speed: 7, durability: 5 } },
    ], environmentTags: ['open-ground', 'urban'],
  },
  trunks: {
    stats: { speed: 86, strength: 87, durability: 84, abilities: 84, experience: 82 },
    strengths: ['Decisive and adaptable under pressure', 'Combines sword skill with ki attacks'],
    weaknesses: ['A more limited combat history than veteran rivals', 'Can be driven by urgency to protect others'],
    forms: [
      { id: 'super-saiyan', name: 'Super Saiyan', modifiers: { strength: 4, speed: 3, durability: 2 } },
      { id: 'super-saiyan-rage', name: 'Super Saiyan Rage (anime continuity)', modifiers: { strength: 7, speed: 4, durability: 5 } },
    ], environmentTags: ['open-ground', 'urban'],
  },
  'naruto-uzumaki': {
    stats: { speed: 90, strength: 89, durability: 92, abilities: 96, experience: 91 },
    strengths: ['Shadow clones enable feints and parallel tactics', 'Large and versatile chakra toolkit'],
    weaknesses: ['Some high-cost techniques require substantial reserves', 'Direct approach can expose him to counterattacks'],
    forms: [
      { id: 'sage-mode', name: 'Sage Mode', modifiers: { speed: 4, strength: 4, abilities: 5 } },
      { id: 'six-paths', name: 'Six Paths Sage Mode', modifiers: { speed: 7, strength: 6, durability: 5, abilities: 5 } },
      { id: 'baryon-mode', name: 'Baryon Mode', modifiers: { speed: 9, strength: 9, durability: 5 }, },
    ], environmentTags: ['woodland', 'open-ground'],
  },
  'sasuke-uchiha': {
    stats: { speed: 91, strength: 86, durability: 83, abilities: 97, experience: 92 },
    strengths: ['Sharingan supports observation and prediction', 'Versatile ninjutsu and space-time techniques'],
    weaknesses: ['High-tier ocular techniques can be taxing', 'Can become isolated when acting alone'],
    forms: [
      { id: 'mangekyo', name: 'Mangekyo Sharingan', modifiers: { abilities: 5, experience: 2 } },
      { id: 'rinnegan', name: 'Rinnegan', modifiers: { abilities: 8, speed: 3, experience: 2 } },
    ], environmentTags: ['woodland', 'urban'],
  },
  'sakura-haruno': {
    stats: { speed: 78, strength: 88, durability: 82, abilities: 87, experience: 82 },
    strengths: ['Fine chakra control and medical skill', 'Powerful, precise close-range strikes'],
    weaknesses: ['Less emphasis on long-range attacks', 'Needs an opening to apply close-combat strength'],
    forms: [
      { id: 'hundred-seal', name: 'Strength of a Hundred Seal', modifiers: { strength: 5, durability: 5, abilities: 4 } },
    ], environmentTags: ['woodland', 'rocky'],
  },
  'kakashi-hatake': {
    stats: { speed: 84, strength: 78, durability: 77, abilities: 94, experience: 96 },
    strengths: ['Exceptional tactical analysis', 'Broad learned technique set'],
    weaknesses: ['Some signature techniques consume considerable chakra', 'Physical reserves can limit prolonged high-output use'],
    forms: [
      { id: 'dual-mangekyo', name: 'Dual Mangekyo Sharingan (temporary)', modifiers: { speed: 6, abilities: 8, durability: 3 } },
    ], environmentTags: ['woodland', 'urban'],
  },
  'madara-uchiha': {
    stats: { speed: 92, strength: 94, durability: 94, abilities: 98, experience: 98 },
    strengths: ['Vast battle experience and analytical skill', 'Wide range of ocular and large-scale techniques'],
    weaknesses: ['Confidence may lead to underestimating an opponent', 'Capabilities depend strongly on the selected era/form'],
    forms: [
      { id: 'eternal-mangekyo', name: 'Eternal Mangekyo Sharingan', modifiers: { abilities: 5, experience: 2 } },
      { id: 'ten-tails', name: 'Ten-Tails jinchuriki', modifiers: { strength: 7, durability: 8, abilities: 7, speed: 4 } },
    ], environmentTags: ['woodland', 'rocky'],
  },
  'itachi-uchiha': {
    stats: { speed: 86, strength: 78, durability: 73, abilities: 95, experience: 93 },
    strengths: ['Genjutsu and misdirection', 'Efficient tactical decision-making'],
    weaknesses: ['Illness affected stamina in the original story', 'Some Mangekyo techniques carry physical costs'],
    forms: [
      { id: 'mangekyo', name: 'Mangekyo Sharingan', modifiers: { abilities: 6, experience: 2 } },
    ], environmentTags: ['woodland', 'urban'],
  },
  'obito-uchiha': {
    stats: { speed: 88, strength: 87, durability: 89, abilities: 96, experience: 92 },
    strengths: ['Kamui creates unusual defensive and positional options', 'Adapts tactics across different battle phases'],
    weaknesses: ['Kamui timing and use create exploitable windows', 'Power set varies considerably by era/form'],
    forms: [
      { id: 'mangekyo', name: 'Mangekyo Sharingan', modifiers: { abilities: 6, speed: 3 } },
      { id: 'ten-tails', name: 'Ten-Tails jinchuriki', modifiers: { strength: 7, durability: 8, abilities: 6 } },
    ], environmentTags: ['woodland', 'urban'],
  },
};