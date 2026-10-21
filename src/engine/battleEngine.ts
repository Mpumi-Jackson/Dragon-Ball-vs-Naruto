import { characters, type Character } from '../data/characters.js';
import { battleProfiles, type BattleForm, type BattleStat, type BattleStats, type EnvironmentTag } from '../data/battleProfiles.js';

export const scoringWeights: Readonly<Record<BattleStat, number>> = {
  speed: 20,
  strength: 25,
  durability: 20,
  abilities: 20,
  experience: 15,
};

export const battleEnvironments = [
  { id: 'open-ground', name: 'Open tournament ground', tag: 'open-ground', description: 'Clear sightlines reward speed, range, and direct engagement.', opening: 'The arena is wide open: no cover, no easy escape, and every approach is visible.' },
  { id: 'woodland', name: 'Dense woodland', tag: 'woodland', description: 'Trees and broken sightlines create room for feints and repositioning.', opening: 'The forest closes around the combatants, turning every shadow and rustle into a possible feint.' },
  { id: 'rocky', name: 'Rocky highlands', tag: 'rocky', description: 'Uneven ground and elevation make footing and durability more relevant.', opening: 'Rugged highland terrain splits the battlefield into exposed ridges and narrow approaches.' },
  { id: 'urban', name: 'Abandoned city', tag: 'urban', description: 'Ruins offer cover, vertical routes, and obstructed lines of attack.', opening: 'An abandoned city offers cover and elevation, but each ruined street can become a trap.' },
] as const satisfies readonly { id: EnvironmentTag; name: string; tag: EnvironmentTag; description: string; opening: string }[];

export type BattleEnvironment = (typeof battleEnvironments)[number];
export type BattleInput = {
  fighterId: string;
  fighterFormId: string;
  opponentId: string;
  opponentFormId: string;
  environmentId: string;
};

export type BattleSide = {
  character: Character;
  form: BattleForm | null;
  stats: BattleStats;
  score: number;
  environmentBonus: number;
  strengths: readonly string[];
  weaknesses: readonly string[];
};

export type StatComparison = {
  id: BattleStat;
  label: string;
  weight: number;
  first: number;
  second: number;
  leader: 'first' | 'second' | 'even';
};

export type BattleResult = {
  first: BattleSide;
  second: BattleSide;
  environment: BattleEnvironment;
  comparisons: readonly StatComparison[];
  winner: 'first' | 'second' | 'draw';
  margin: number;
  introduction: string;
  steps: readonly string[];
  verdict: string;
};

const statLabels: Record<BattleStat, string> = {
  speed: 'Speed',
  strength: 'Strength',
  durability: 'Durability',
  abilities: 'Abilities',
  experience: 'Combat experience',
};

function clampStat(value: number): number {
  return Math.max(1, Math.min(100, value));
}

function getBattleSide(characterId: string, formId: string, environment: BattleEnvironment): BattleSide {
  const character = characters.find((entry) => entry.id === characterId);
  const profile = battleProfiles[characterId];
  if (!character || !profile) throw new Error(`Unknown fighter: ${characterId}`);

  const selectedForm = formId === 'base' ? null : profile.forms.find((entry) => entry.id === formId);
  if (formId !== 'base' && !selectedForm) throw new Error(`Unknown form "${formId}" for ${character.name}`);
  const form = selectedForm ?? null;

  const stats = { ...profile.stats };
  if (form) {
    for (const [stat, modifier] of Object.entries(form.modifiers) as [BattleStat, number][]) {
      stats[stat] = clampStat(stats[stat] + modifier);
    }
  }

  const environmentBonus = profile.environmentTags.includes(environment.tag) ? 4 : 0;
  const weightedTotal = (Object.keys(scoringWeights) as BattleStat[]).reduce(
    (total, stat) => total + stats[stat] * scoringWeights[stat],
    0,
  );
  const score = Math.round(Math.min(100, weightedTotal / 100 + environmentBonus) * 10) / 10;

  return {
    character,
    form,
    stats,
    score,
    environmentBonus,
    strengths: profile.strengths,
    weaknesses: profile.weaknesses,
  };
}

export function simulateBattle(input: BattleInput): BattleResult {
  if (input.fighterId === input.opponentId) throw new Error('Choose two different fighters.');
  const environment = battleEnvironments.find((entry) => entry.id === input.environmentId);
  if (!environment) throw new Error(`Unknown environment: ${input.environmentId}`);

  const first = getBattleSide(input.fighterId, input.fighterFormId, environment);
  const second = getBattleSide(input.opponentId, input.opponentFormId, environment);
  const comparisons = (Object.keys(scoringWeights) as BattleStat[]).map((stat): StatComparison => ({
    id: stat,
    label: statLabels[stat],
    weight: scoringWeights[stat],
    first: first.stats[stat],
    second: second.stats[stat],
    leader: first.stats[stat] === second.stats[stat] ? 'even' : first.stats[stat] > second.stats[stat] ? 'first' : 'second',
  }));
  const margin = Math.round(Math.abs(first.score - second.score) * 10) / 10;
  const winner = margin < 1 ? 'draw' : first.score > second.score ? 'first' : 'second';
  const leadingMetric = [...comparisons].sort((a, b) => Math.abs(b.first - b.second) - Math.abs(a.first - a.second))[0];
  const metricLead = leadingMetric.leader === 'even'
    ? `${leadingMetric.label} is closely matched.`
    : `${leadingMetric.label} is the widest gap in this profile, leaning toward ${leadingMetric.leader === 'first' ? first.character.name : second.character.name}.`;
  const firstForm = first.form ? ` in ${first.form.name}` : '';
  const secondForm = second.form ? ` in ${second.form.name}` : '';
  const introduction = `${first.character.name}${firstForm} faces ${second.character.name}${secondForm} at ${environment.name.toLowerCase()}. This is a fictional matchup, not a canon encounter.`;
  const steps = [
    environment.opening,
    `${first.character.name} looks to use ${first.strengths[0].toLowerCase()}; ${second.character.name} answers with ${second.strengths[0].toLowerCase()}.`,
    metricLead,
    first.environmentBonus === second.environmentBonus
      ? `The setting does not create a profile advantage for either fighter under this model.`
      : `${first.environmentBonus > second.environmentBonus ? first.character.name : second.character.name} receives the model's small terrain-familiarity adjustment.`,
  ];
  const verdict = winner === 'draw'
    ? `The profiles finish within one point, so this model calls it a draw. The selected forms and battlefield could still change the story.`
    : `Under this fan-made rubric, ${winner === 'first' ? first.character.name : second.character.name} leads by ${margin.toFixed(1)} composite points. This is a transparent entertainment estimate, not an objective measurement or official outcome.`;

  return { first, second, environment, comparisons, winner, margin, introduction, steps, verdict };
}