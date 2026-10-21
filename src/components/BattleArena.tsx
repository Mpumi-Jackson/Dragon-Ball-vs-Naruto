import { useState, type FormEvent } from 'react';
import { characters } from '../data/characters';
import { battleProfiles } from '../data/battleProfiles';
import { battleEnvironments, simulateBattle, type BattleInput, type BattleResult } from '../engine/battleEngine';
import { BattleReport } from './BattleReport';

const defaultInput: BattleInput = {
  fighterId: 'goku',
  fighterFormId: 'base',
  opponentId: 'naruto-uzumaki',
  opponentFormId: 'base',
  environmentId: 'open-ground',
};

function fighterOptions() {
  return (['Dragon Ball', 'Naruto'] as const).map((universe) => ({
    universe,
    characters: characters.filter((character) => character.universe === universe),
  }));
}

const groupedFighters = fighterOptions();

function formName(characterId: string, formId: string): string {
  return formId === 'base' ? 'Base form' : battleProfiles[characterId].forms.find((form) => form.id === formId)?.name ?? 'Base form';
}

export function BattleArena() {
  const [input, setInput] = useState(defaultInput);
  const [result, setResult] = useState<BattleResult | null>(null);
  const [error, setError] = useState('');

  function updateInput(nextInput: BattleInput) {
    setInput(nextInput);
    setResult(null);
    setError('');
  }

  function runBattle(nextInput: BattleInput) {
    try {
      const nextResult = simulateBattle(nextInput);
      setResult(nextResult);
      setError('');
      window.requestAnimationFrame(() => document.getElementById('battle-report-title')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }));
      return true;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to simulate this matchup. Check the fighter selections.');
      setResult(null);
      return false;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runBattle(input);
  }

  function changeFighter(side: 'fighter' | 'opponent', characterId: string) {
    updateInput({ ...input, [side === 'fighter' ? 'fighterId' : 'opponentId']: characterId, [side === 'fighter' ? 'fighterFormId' : 'opponentFormId']: 'base' });
  }

  function switchFighters() {
    const switched = {
      ...input,
      fighterId: input.opponentId,
      fighterFormId: input.opponentFormId,
      opponentId: input.fighterId,
      opponentFormId: input.fighterFormId,
    };
    setInput(switched);
    runBattle(switched);
  }

  const firstForms = battleProfiles[input.fighterId].forms;
  const secondForms = battleProfiles[input.opponentId].forms;
  const selectedEnvironment = battleEnvironments.find((environment) => environment.id === input.environmentId) ?? battleEnvironments[0];

  return (
    <div className="battle-arena" aria-labelledby="arena-page-title">
      <div className="battle-page-heading">
        <div><p className="battle-eyebrow">05 / Interactive matchup lab</p><h2 id="arena-page-title">Set the terms.<br /><span>Run the fight.</span></h2></div>
        <p>Choose any two fighters, a form, and a setting. The local simulation uses a visible fan-made scoring rubric, not an AI service or canon verdict.</p>
      </div>

      <form className="battle-config" onSubmit={handleSubmit}>
        <div className="battle-config__fighters">
          <fieldset className="battle-pick battle-pick--first">
            <legend><span>FIGHTER 01</span><span>ORANGE SIDE</span></legend>
            <label htmlFor="battle-fighter">Choose a fighter</label>
            <select id="battle-fighter" value={input.fighterId} aria-invalid={input.fighterId === input.opponentId} onChange={(event) => changeFighter('fighter', event.target.value)}>
              {groupedFighters.map((group) => <optgroup label={group.universe} key={group.universe}>{group.characters.map((character) => <option value={character.id} key={character.id}>{character.name}</option>)}</optgroup>)}
            </select>
            <label htmlFor="battle-fighter-form">Form or transformation</label>
            <select id="battle-fighter-form" value={input.fighterFormId} onChange={(event) => updateInput({ ...input, fighterFormId: event.target.value })}>
              <option value="base">Base form</option>
              {firstForms.map((form) => <option value={form.id} key={form.id}>{form.name}</option>)}
            </select>
          </fieldset>

          <div className="battle-config__versus" aria-hidden="true">VS</div>

          <fieldset className="battle-pick battle-pick--second">
            <legend><span>FIGHTER 02</span><span>BLUE SIDE</span></legend>
            <label htmlFor="battle-opponent">Choose an opponent</label>
            <select id="battle-opponent" value={input.opponentId} aria-invalid={input.fighterId === input.opponentId} onChange={(event) => changeFighter('opponent', event.target.value)}>
              {groupedFighters.map((group) => <optgroup label={group.universe} key={group.universe}>{group.characters.map((character) => <option value={character.id} key={character.id}>{character.name}</option>)}</optgroup>)}
            </select>
            <label htmlFor="battle-opponent-form">Form or transformation</label>
            <select id="battle-opponent-form" value={input.opponentFormId} onChange={(event) => updateInput({ ...input, opponentFormId: event.target.value })}>
              <option value="base">Base form</option>
              {secondForms.map((form) => <option value={form.id} key={form.id}>{form.name}</option>)}
            </select>
          </fieldset>
        </div>

        <div className="battle-config__footer">
          <label className="battle-environment" htmlFor="battle-environment">
            <span>Battle environment</span>
            <select id="battle-environment" value={input.environmentId} onChange={(event) => updateInput({ ...input, environmentId: event.target.value })}>
              {battleEnvironments.map((environment) => <option value={environment.id} key={environment.id}>{environment.name}</option>)}
            </select>
            <small>{selectedEnvironment.description}</small>
          </label>
          <button className="battle-button battle-button--primary battle-simulate" type="submit">Simulate Battle <span aria-hidden="true">↗</span></button>
        </div>
        {(error || (input.fighterId === input.opponentId ? 'Choose two different fighters to run a matchup.' : '')) && (
          <p className="battle-form-error" role="alert">{error || 'Choose two different fighters to run a matchup.'}</p>
        )}
      </form>

      <div className="battle-rules-note">
        <span aria-hidden="true">i</span>
        <p><strong>How this simulation scores:</strong> Speed 20%, strength 25%, durability 20%, abilities 20%, and combat experience 15%. Selected forms apply capped stat modifiers; matching terrain affinity adds 4 points. The model is deterministic and illustrative, not an objective power scale.</p>
      </div>

      {result ? (
        <BattleReport result={result} onRematch={() => runBattle(input)} onSwitchFighters={switchFighters} />
      ) : (
        <div className="battle-idle" aria-live="polite">
          <div className="battle-idle__marks"><span>{characters.find((character) => character.id === input.fighterId)?.mark}</span><b>VS</b><span>{characters.find((character) => character.id === input.opponentId)?.mark}</span></div>
          <p>READY WHEN YOU ARE</p>
          <span>{formName(input.fighterId, input.fighterFormId)} / {formName(input.opponentId, input.opponentFormId)} · {selectedEnvironment.name}</span>
        </div>
      )}
    </div>
  );
}