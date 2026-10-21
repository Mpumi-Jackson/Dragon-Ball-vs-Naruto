export type Universe = 'Dragon Ball' | 'Naruto';
export type CharacterAccent = 'orange' | 'gold' | 'blue' | 'crimson' | 'violet' | 'green';

export type Character = {
  id: string;
  name: string;
  universe: Universe;
  role: string;
  description: string;
  signature: string;
  abilities: readonly string[];
  transformations: readonly string[];
  accent: CharacterAccent;
  mark: string;
  imageSrc: string | null;
  fanPowerEstimate: number;
};

export const characters: readonly Character[] = [
  {
    id: 'goku', name: 'Goku', universe: 'Dragon Ball', role: 'Saiyan martial artist',
    description: 'A Saiyan raised on Earth whose love of training and competition continually drives him toward new limits.',
    signature: 'Ki control and close-combat adaptation',
    abilities: ['Kamehameha', 'Instant Transmission', 'Spirit Bomb', 'Kaioken'],
    transformations: ['Super Saiyan', 'Super Saiyan God', 'Super Saiyan Blue', 'Ultra Instinct'],
    accent: 'orange', mark: '悟', imageSrc: null, fanPowerEstimate: 99,
  },
  {
    id: 'vegeta', name: 'Vegeta', universe: 'Dragon Ball', role: 'Saiyan prince',
    description: 'The proud Prince of all Saiyans, known for relentless self-discipline, fierce rivalry, and tactical resolve.',
    signature: 'Precision ki attacks and relentless pressure',
    abilities: ['Galick Gun', 'Final Flash', 'Big Bang Attack', 'Forced Spirit Fission'],
    transformations: ['Super Saiyan', 'Super Saiyan God', 'Super Saiyan Blue', 'Ultra Ego'],
    accent: 'blue', mark: '王', imageSrc: null, fanPowerEstimate: 97,
  },
  {
    id: 'gohan', name: 'Gohan', universe: 'Dragon Ball', role: 'Saiyan-Earthling scholar',
    description: 'Goku’s son balances a scholarly life with extraordinary latent potential that can surface under pressure.',
    signature: 'Explosive potential and hybrid Saiyan power',
    abilities: ['Masenko', 'Kamehameha', 'Special Beam Cannon'],
    transformations: ['Super Saiyan 2', 'Ultimate / Potential Unleashed', 'Beast'],
    accent: 'gold', mark: '飯', imageSrc: null, fanPowerEstimate: 96,
  },
  {
    id: 'piccolo', name: 'Piccolo', universe: 'Dragon Ball', role: 'Namekian warrior',
    description: 'A disciplined Namekian strategist whose mentorship, regeneration, and evolving strength make him a versatile defender.',
    signature: 'Tactical ki control and regeneration',
    abilities: ['Special Beam Cannon', 'Hellzone Grenade', 'Regeneration', 'Giant Form'],
    transformations: ['Potential Unleashed', 'Orange Piccolo'],
    accent: 'green', mark: '魔', imageSrc: null, fanPowerEstimate: 90,
  },
  {
    id: 'broly', name: 'Broly', universe: 'Dragon Ball', role: 'Saiyan survivor',
    description: 'A Saiyan whose immense power grows rapidly during combat, making control and adaptation central to his story.',
    signature: 'Rapidly escalating Saiyan power',
    abilities: ['Gigantic Roar', 'Eraser Cannon', 'Adaptive close combat'],
    transformations: ['Wrathful state', 'Super Saiyan', 'Full Power Super Saiyan'],
    accent: 'green', mark: '怒', imageSrc: null, fanPowerEstimate: 98,
  },
  {
    id: 'frieza', name: 'Frieza', universe: 'Dragon Ball', role: 'Galactic tyrant',
    description: 'A ruthless galactic ruler with exceptional natural talent, precision ki control, and several forms.',
    signature: 'Precise ranged ki attacks and transformation',
    abilities: ['Death Beam', 'Death Ball', 'Telekinesis', 'Psychokinesis'],
    transformations: ['Final Form', 'Golden Frieza', 'Black Frieza'],
    accent: 'violet', mark: 'F', imageSrc: null, fanPowerEstimate: 97,
  },
  {
    id: 'trunks', name: 'Trunks', universe: 'Dragon Ball', role: 'Saiyan swordsman',
    description: 'A courageous fighter from a devastated future, combining Saiyan power with swordsmanship and decisive tactics.',
    signature: 'Swordsmanship and focused ki attacks',
    abilities: ['Burning Attack', 'Final Flash', 'Swordsmanship'],
    transformations: ['Super Saiyan', 'Super Saiyan 2', 'Super Saiyan Rage (anime continuity)'],
    accent: 'blue', mark: '剣', imageSrc: null, fanPowerEstimate: 91,
  },
  {
    id: 'naruto-uzumaki', name: 'Naruto Uzumaki', universe: 'Naruto', role: 'Seventh Hokage',
    description: 'A determined shinobi who earns recognition through perseverance, bonds, and a remarkable command of chakra.',
    signature: 'Shadow clones and adaptable chakra techniques',
    abilities: ['Shadow Clone Technique', 'Rasengan', 'Rasenshuriken', 'Sage techniques'],
    transformations: ['Sage Mode', 'Nine-Tails Chakra Mode', 'Six Paths Sage Mode', 'Baryon Mode'],
    accent: 'orange', mark: '忍', imageSrc: null, fanPowerEstimate: 97,
  },
  {
    id: 'sasuke-uchiha', name: 'Sasuke Uchiha', universe: 'Naruto', role: 'Uchiha shinobi',
    description: 'A gifted Uchiha whose pursuit of strength and truth shapes a path defined by powerful ocular abilities and rivalry.',
    signature: 'Sharingan insight and lightning-style ninjutsu',
    abilities: ['Chidori', 'Amaterasu', 'Susanoo', 'Space-time ninjutsu'],
    transformations: ['Sharingan', 'Mangekyo Sharingan', 'Eternal Mangekyo Sharingan', 'Rinnegan'],
    accent: 'blue', mark: '写', imageSrc: null, fanPowerEstimate: 96,
  },
  {
    id: 'sakura-haruno', name: 'Sakura Haruno', universe: 'Naruto', role: 'Medical ninja',
    description: 'A precise medical ninja and formidable close-range fighter trained by Tsunade, with exceptional chakra control.',
    signature: 'Chakra-enhanced strength and medical ninjutsu',
    abilities: ['Chakra-enhanced strength', 'Medical ninjutsu', 'Creation Rebirth', 'Mitotic Regeneration'],
    transformations: ['Strength of a Hundred Seal'],
    accent: 'crimson', mark: '桜', imageSrc: null, fanPowerEstimate: 84,
  },
  {
    id: 'kakashi-hatake', name: 'Kakashi Hatake', universe: 'Naruto', role: 'Copy Ninja',
    description: 'A famed shinobi and teacher, recognized for calm tactical judgment and a broad repertoire of copied techniques.',
    signature: 'Tactical analysis and lightning-style ninjutsu',
    abilities: ['Lightning Blade', 'Kamui', 'Earth Style Wall', 'Copy Technique'],
    transformations: ['Sharingan (formerly)', 'Dual Mangekyo Sharingan (temporary)'],
    accent: 'violet', mark: '雷', imageSrc: null, fanPowerEstimate: 88,
  },
  {
    id: 'madara-uchiha', name: 'Madara Uchiha', universe: 'Naruto', role: 'Uchiha clan leader',
    description: 'A legendary Uchiha whose vision for peace and immense skill make him one of the shinobi world’s defining figures.',
    signature: 'Sharingan mastery and large-scale techniques',
    abilities: ['Susanoo', 'Limbo', 'Wood Release', 'Fire Release'],
    transformations: ['Eternal Mangekyo Sharingan', 'Rinnegan', 'Ten-Tails jinchuriki'],
    accent: 'crimson', mark: '斑', imageSrc: null, fanPowerEstimate: 99,
  },
  {
    id: 'itachi-uchiha', name: 'Itachi Uchiha', universe: 'Naruto', role: 'Uchiha shinobi',
    description: 'A prodigy remembered for composure, genjutsu, and a complicated history shaped by sacrifice and secrecy.',
    signature: 'Genjutsu and Mangekyo Sharingan techniques',
    abilities: ['Tsukuyomi', 'Amaterasu', 'Susanoo', 'Shurikenjutsu'],
    transformations: ['Sharingan', 'Mangekyo Sharingan'],
    accent: 'crimson', mark: '鼬', imageSrc: null, fanPowerEstimate: 91,
  },
  {
    id: 'obito-uchiha', name: 'Obito Uchiha', universe: 'Naruto', role: 'Uchiha shinobi',
    description: 'A shinobi whose idealism is transformed by war, wielding space-time ninjutsu and a layered combat style.',
    signature: 'Kamui space-time ninjutsu',
    abilities: ['Kamui', 'Wood Release', 'Fire Release', 'Six Paths techniques'],
    transformations: ['Mangekyo Sharingan', 'Ten-Tails jinchuriki'],
    accent: 'violet', mark: '虚', imageSrc: null, fanPowerEstimate: 95,
  },
];