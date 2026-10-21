import type { Universe } from './characters.js';

export type TransformationKind = 'transformation' | 'power-mode' | 'ocular-ability' | 'special-technique';

export type TransformationEntry = {
  id: string;
  name: string;
  universe: Universe;
  associatedCharacters: readonly string[];
  kind: TransformationKind;
  description: string;
  mainAbilities: readonly string[];
  advantages: readonly string[];
  limitations: readonly string[];
  canonNote: string;
  visualMark: string;
  accent: 'orange' | 'blue' | 'gold' | 'crimson' | 'violet' | 'green';
  imageSrc: string | null;
};

export const transformationKinds: readonly { id: TransformationKind | 'all'; label: string }[] = [
  { id: 'all', label: 'All types' },
  { id: 'transformation', label: 'Transformations' },
  { id: 'power-mode', label: 'Power modes' },
  { id: 'ocular-ability', label: 'Ocular abilities' },
  { id: 'special-technique', label: 'Special techniques' },
];

export const transformations: readonly TransformationEntry[] = [
  {
    id: 'super-saiyan', name: 'Super Saiyan', universe: 'Dragon Ball', associatedCharacters: ['Goku'], kind: 'transformation',
    description: 'A legendary Saiyan transformation first reached by Goku in battle with Frieza. It amplifies a Saiyan’s combat power and changes their appearance.',
    mainAbilities: ['Elevated strength and speed', 'Stronger ki projection', 'Access to Super Saiyan variants'],
    advantages: ['Large overall increase in combat capability', 'Can be maintained with training and control'],
    limitations: ['Consumes more energy than a relaxed base state', 'Early users can struggle to manage the form’s emotional intensity'],
    canonNote: 'Main-story manga/anime form. Exact multipliers are omitted because they are inconsistently emphasized across material.',
    visualMark: '超', accent: 'gold', imageSrc: null,
  },
  {
    id: 'super-saiyan-2', name: 'Super Saiyan 2', universe: 'Dragon Ball', associatedCharacters: ['Gohan'], kind: 'transformation',
    description: 'A higher Super Saiyan state associated with Gohan’s breakthrough during the Cell Games, recognizable by sharper energy and lightning-like aura effects.',
    mainAbilities: ['Increased speed and striking force', 'More intense ki output', 'Improved combat pressure'],
    advantages: ['Raises a Saiyan’s offense beyond the standard Super Saiyan state', 'Gohan’s first awakening is paired with a decisive emotional resolve'],
    limitations: ['Higher output can increase stamina demands', 'Emotional triggers are part of Gohan’s specific awakening, not a universal activation rule'],
    canonNote: 'Main-story form. Gohan’s first on-screen awakening occurs in the Cell Games arc.',
    visualMark: 'Ⅱ', accent: 'gold', imageSrc: null,
  },
  {
    id: 'super-saiyan-3', name: 'Super Saiyan 3', universe: 'Dragon Ball', associatedCharacters: ['Goku'], kind: 'transformation',
    description: 'An advanced Saiyan transformation that pushes ki output substantially higher, first demonstrated by Goku during the Majin Buu conflict.',
    mainAbilities: ['Very high strength and speed', 'Powerful sustained ki attacks', 'Extended hair and altered aura'],
    advantages: ['Overwhelming short-term offensive output', 'Can pressure opponents who handle lower forms'],
    limitations: ['Burns through energy quickly, especially in a living body', 'Its upkeep sharply limits time in battle'],
    canonNote: 'Main-story form. Goku explains its severe energy cost during the Buu arc.',
    visualMark: 'Ⅲ', accent: 'orange', imageSrc: null,
  },
  {
    id: 'super-saiyan-blue', name: 'Super Saiyan Blue', universe: 'Dragon Ball', associatedCharacters: ['Goku', 'Vegeta'], kind: 'transformation',
    description: 'Commonly called Super Saiyan Blue, this is Super Saiyan God power combined with the Super Saiyan state and its ki control.',
    mainAbilities: ['God ki-enhanced offense', 'High-speed movement', 'Precise ki control'],
    advantages: ['Combines godly ki with Super Saiyan combat amplification', 'Can be used with refined energy control'],
    limitations: ['High-level ki control is required', 'Maintaining peak output can tax stamina'],
    canonNote: 'Main Dragon Ball Super continuity. The Japanese name is Super Saiyan God Super Saiyan; “Super Saiyan Blue” is the familiar shortened name.',
    visualMark: '蒼', accent: 'blue', imageSrc: null,
  },
  {
    id: 'ultra-instinct', name: 'Ultra Instinct', universe: 'Dragon Ball', associatedCharacters: ['Goku'], kind: 'power-mode',
    description: 'A divine technique and state in which the body reacts independently of conscious thought. Goku’s story depicts distinct stages and visual forms of its use.',
    mainAbilities: ['Automatic defensive reactions', 'Rapid counterattacks', 'Movement without deliberate thought'],
    advantages: ['Reduces the delay between sensing danger and responding', 'Can make defense and countering flow together'],
    limitations: ['Extremely difficult to master and maintain', 'Emotional balance and stamina affect performance'],
    canonNote: 'Classified here as a power mode/technique, not a conventional Super Saiyan transformation. Anime and manga portray its stages differently.',
    visualMark: '兆', accent: 'blue', imageSrc: null,
  },
  {
    id: 'legendary-super-saiyan', name: 'Legendary Super Saiyan', universe: 'Dragon Ball', associatedCharacters: ['Broly (Z-film continuity)'], kind: 'transformation',
    description: 'The title used for Broly’s escalating Saiyan form in the original Dragon Ball Z theatrical films, with overwhelming strength and a volatile aura.',
    mainAbilities: ['Rapidly increasing physical power', 'High durability', 'Large-scale ki attacks'],
    advantages: ['Exceptional raw force and resilience', 'Power can continue to rise during combat'],
    limitations: ['The Z-film portrayal is volatile and difficult to control', 'The immense force can threaten allies and the surrounding area'],
    canonNote: 'Continuity note: this specific “Legendary Super Saiyan” portrayal belongs to the Z theatrical films. The main Dragon Ball Super continuity calls Broly’s related state Full Power Super Saiyan.',
    visualMark: '伝', accent: 'green', imageSrc: null,
  },
  {
    id: 'sage-mode', name: 'Sage Mode', universe: 'Naruto', associatedCharacters: ['Naruto Uzumaki'], kind: 'power-mode',
    description: 'A state achieved by gathering natural energy and balancing it with the user’s physical and spiritual energy to create senjutsu chakra.',
    mainAbilities: ['Enhanced strength and sensory perception', 'Senjutsu-enhanced techniques', 'Sensing otherwise difficult-to-detect targets'],
    advantages: ['Improves physical capability and awareness', 'Can enhance the user’s existing techniques'],
    limitations: ['Natural energy must be gathered and balanced', 'Stillness is traditionally needed to gather energy; poor balance can cause loss of control'],
    canonNote: 'Canon chakra state, not a bloodline transformation. Naruto learns it at Mount Myoboku.',
    visualMark: '仙', accent: 'orange', imageSrc: null,
  },
  {
    id: 'nine-tails-chakra-mode', name: 'Nine-Tails Chakra Mode', universe: 'Naruto', associatedCharacters: ['Naruto Uzumaki'], kind: 'power-mode',
    description: 'A chakra cloak state Naruto accesses through his changing relationship and cooperation with Kurama. The story distinguishes stages of their cooperation.',
    mainAbilities: ['Chakra cloak and enhanced movement', 'Powerful chakra arms', 'Shared sensory and chakra capabilities in later stages'],
    advantages: ['Substantial boost to speed and physical force', 'Can extend chakra to support allies'],
    limitations: ['Access depends on Kurama’s chakra and the degree of cooperation', 'Early versions involve risk when Naruto draws on Kurama’s power without trust'],
    canonNote: 'Canon power mode. Names such as Nine-Tails Chakra Mode and Kurama Chakra Mode vary by stage and translation.',
    visualMark: '九', accent: 'gold', imageSrc: null,
  },
  {
    id: 'six-paths-sage-mode', name: 'Six Paths Sage Mode', universe: 'Naruto', associatedCharacters: ['Naruto Uzumaki'], kind: 'power-mode',
    description: 'A heightened sage state Naruto receives through Hagoromo’s power, combining Six Paths chakra with his existing abilities.',
    mainAbilities: ['Six Paths-enhanced sensing', 'Flight in the relevant portrayal', 'Access to Truth-Seeking Balls in the war arc'],
    advantages: ['Broadens Naruto’s sensory and combat options', 'Works alongside his established chakra techniques'],
    limitations: ['Depends on access to Six Paths power and its continuity context', 'It is distinct from ordinary Mount Myoboku Sage Mode'],
    canonNote: 'Canon power mode in the Fourth Shinobi World War. It is not the same as a Sharingan transformation or a generic “Sage Mode” label.',
    visualMark: '六', accent: 'gold', imageSrc: null,
  },
  {
    id: 'mangekyo-sharingan', name: 'Mangekyo Sharingan', universe: 'Naruto', associatedCharacters: ['Sasuke Uchiha', 'Itachi Uchiha'], kind: 'ocular-ability',
    description: 'An advanced Sharingan dojutsu awakened by profound personal loss. Its specific abilities differ between users.',
    mainAbilities: ['User-specific ocular techniques', 'Enhanced visual perception', 'For Sasuke: Amaterasu and Kagutsuchi'],
    advantages: ['Grants powerful abilities tailored to the individual user', 'Can enable Susanoo for users who awaken that technique'],
    limitations: ['Repeated use can damage eyesight and lead to blindness', 'Abilities consume substantial chakra'],
    canonNote: 'Ocular ability / dojutsu, not a bodily transformation. The awakening conditions are complex; “any trauma automatically unlocks it” would be an oversimplification.',
    visualMark: '写', accent: 'crimson', imageSrc: null,
  },
  {
    id: 'eternal-mangekyo-sharingan', name: 'Eternal Mangekyo Sharingan', universe: 'Naruto', associatedCharacters: ['Sasuke Uchiha', 'Madara Uchiha'], kind: 'ocular-ability',
    description: 'A Mangekyo Sharingan state obtained through transplantation of a close relative’s Mangekyo eyes, exemplified by Sasuke and Madara.',
    mainAbilities: ['Retains the user’s Mangekyo techniques', 'Avoids the progressive blindness associated with ordinary Mangekyo use'],
    advantages: ['Allows sustained use of Mangekyo abilities without the same eyesight deterioration', 'Can further develop the user’s ocular power'],
    limitations: ['Requires a rare and consequential eye transplant', 'Does not remove chakra costs or guarantee victory'],
    canonNote: 'Ocular ability / dojutsu, not a transformation. The canonical examples are specific Uchiha characters, not a general power-up anyone can select.',
    visualMark: '永', accent: 'crimson', imageSrc: null,
  },
  {
    id: 'susanoo', name: 'Susanoo', universe: 'Naruto', associatedCharacters: ['Itachi Uchiha', 'Sasuke Uchiha', 'Madara Uchiha'], kind: 'special-technique',
    description: 'A chakra avatar technique associated with Mangekyo Sharingan users. Its appearance, weapons, and stage of completion vary by user.',
    mainAbilities: ['Chakra avatar for offense and defense', 'User-specific weapons and techniques', 'Expanded reach and protection'],
    advantages: ['Provides both a powerful guard and large-scale attacks', 'Can wield unique tools such as Itachi’s Totsuka Blade and Yata Mirror'],
    limitations: ['Consumes substantial chakra and strains the user', 'Not every Sharingan user manifests it; form and capability vary'],
    canonNote: 'Special technique, not a transformation or a Sharingan eye pattern. It is associated with Mangekyo Sharingan users.',
    visualMark: '須', accent: 'violet', imageSrc: null,
  },
];