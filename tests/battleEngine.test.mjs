import assert from 'node:assert/strict';
import test from 'node:test';
import { battleEnvironments, scoringWeights, simulateBattle } from '../.test-build/engine/battleEngine.js';
import { transformations } from '../.test-build/data/transformations.js';

const gokuVsNaruto = {
  fighterId: 'goku',
  fighterFormId: 'base',
  opponentId: 'naruto-uzumaki',
  opponentFormId: 'base',
  environmentId: 'open-ground',
};

test('scoring weights sum to 100 and all requested attributes are weighted', () => {
  assert.equal(Object.values(scoringWeights).reduce((sum, value) => sum + value, 0), 100);
  assert.deepEqual(Object.keys(scoringWeights), ['speed', 'strength', 'durability', 'abilities', 'experience']);
});

test('simulation is deterministic and returns bounded scores and five comparisons', () => {
  const first = simulateBattle(gokuVsNaruto);
  const repeated = simulateBattle(gokuVsNaruto);
  assert.deepEqual(first, repeated);
  assert.equal(first.comparisons.length, 5);
  assert.ok(first.first.score >= 0 && first.first.score <= 100);
  assert.ok(first.second.score >= 0 && first.second.score <= 100);
  assert.match(first.verdict, /fan-made rubric/i);
});

test('selected forms modify only their fighter profile and stay capped', () => {
  const baseResult = simulateBattle(gokuVsNaruto);
  const transformedResult = simulateBattle({ ...gokuVsNaruto, fighterFormId: 'ultra-instinct' });
  assert.ok(transformedResult.first.stats.speed > baseResult.first.stats.speed);
  assert.equal(transformedResult.first.form.name, 'Ultra Instinct');
  assert.ok(Object.values(transformedResult.first.stats).every((value) => value <= 100));
});

test('same-universe matchups are supported', () => {
  const result = simulateBattle({
    fighterId: 'goku',
    fighterFormId: 'super-saiyan',
    opponentId: 'vegeta',
    opponentFormId: 'ultra-ego',
    environmentId: 'rocky',
  });
  assert.equal(result.first.character.universe, 'Dragon Ball');
  assert.equal(result.second.character.universe, 'Dragon Ball');
  assert.equal(result.first.form.name, 'Super Saiyan');
  assert.equal(result.second.form.name, 'Ultra Ego');
});

test('matching environment affinity adds a fixed four points', () => {
  const openGround = simulateBattle(gokuVsNaruto);
  const woodland = simulateBattle({ ...gokuVsNaruto, environmentId: 'woodland' });
  assert.equal(openGround.first.environmentBonus, 4);
  assert.equal(woodland.first.environmentBonus, 0);
  assert.equal(openGround.first.score - woodland.first.score, 4);
  assert.equal(battleEnvironments.length, 4);
});

test('near-equal profiles produce a draw instead of a forced winner', () => {
  const result = simulateBattle({
    fighterId: 'kakashi-hatake',
    fighterFormId: 'base',
    opponentId: 'itachi-uchiha',
    opponentFormId: 'base',
    environmentId: 'woodland',
  });
  assert.equal(result.winner, 'draw');
  assert.match(result.verdict, /draw/i);
});

test('invalid matchups, forms, and environments are rejected', () => {
  assert.throws(() => simulateBattle({ ...gokuVsNaruto, opponentId: 'goku' }), /different fighters/i);
  assert.throws(() => simulateBattle({ ...gokuVsNaruto, fighterFormId: 'made-up-form' }), /unknown form/i);
  assert.throws(() => simulateBattle({ ...gokuVsNaruto, environmentId: 'made-up-place' }), /unknown environment/i);
});

test('transformation library keeps ocular abilities and techniques distinct from forms', () => {
  const entry = (id) => transformations.find((item) => item.id === id);
  assert.equal(entry('ultra-instinct').kind, 'power-mode');
  assert.equal(entry('mangekyo-sharingan').kind, 'ocular-ability');
  assert.equal(entry('eternal-mangekyo-sharingan').kind, 'ocular-ability');
  assert.equal(entry('susanoo').kind, 'special-technique');
  assert.match(entry('legendary-super-saiyan').canonNote, /Z theatrical films/i);
  assert.equal(entry('six-paths-sage-mode').associatedCharacters[0], 'Naruto Uzumaki');
});