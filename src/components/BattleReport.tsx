import type { CSSProperties } from 'react';
import type { BattleResult, StatComparison } from '../engine/battleEngine';

type BattleReportProps = {
  result: BattleResult;
  onRematch: () => void;
  onSwitchFighters: () => void;
};

function MetricBar({ comparison }: { comparison: StatComparison }) {
  return (
    <div className="battle-metric">
      <div className="battle-metric__labels">
        <span>{comparison.first}</span>
        <strong>{comparison.label}<small> / {comparison.weight}% weight</small></strong>
        <span>{comparison.second}</span>
      </div>
      <div className="battle-metric__track" aria-label={`${comparison.label}: ${comparison.first} to ${comparison.second}`}>
        <span className="battle-metric__fill battle-metric__fill--first" style={{ '--metric-width': `${comparison.first}%` } as CSSProperties} />
        <span className="battle-metric__fill battle-metric__fill--second" style={{ '--metric-width': `${comparison.second}%` } as CSSProperties} />
      </div>
    </div>
  );
}

function CombatantPanel({ side, label, color }: { side: BattleResult['first']; label: string; color: 'orange' | 'blue' }) {
  return (
    <article className={`battle-combatant battle-combatant--${color}`}>
      <div className="battle-combatant__portrait" role="img" aria-label={`Abstract placeholder portrait for ${side.character.name}`}>
        <span>{side.character.mark}</span>
        <small>ART PLACEHOLDER</small>
      </div>
      <div className="battle-combatant__body">
        <p className="battle-combatant__label">{label} / {side.character.universe}</p>
        <h3>{side.character.name}</h3>
        <p className="battle-combatant__form">{side.form?.name ?? 'Base form'}</p>
        <p className="battle-combatant__score"><strong>{side.score.toFixed(1)}</strong><span> FAN SCORE / 100</span></p>
        <div className="battle-traits">
          <div><h4>Strengths</h4><ul>{side.strengths.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h4>Weaknesses</h4><ul>{side.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </div>
    </article>
  );
}

export function BattleReport({ result, onRematch, onSwitchFighters }: BattleReportProps) {
  return (
    <section className="battle-report" aria-labelledby="battle-report-title">
      <div className="battle-report__header">
        <div><p className="battle-eyebrow">SIMULATION COMPLETE / FICTIONAL ENTERTAINMENT</p><h2 id="battle-report-title">Battle report</h2></div>
        <span className="battle-report__setting">{result.environment.name}</span>
      </div>

      <p className="battle-introduction">{result.introduction}</p>
      <div className="battle-combatants">
        <CombatantPanel side={result.first} label="FIGHTER 01" color="orange" />
        <div className="battle-report__versus" aria-hidden="true">VS</div>
        <CombatantPanel side={result.second} label="FIGHTER 02" color="blue" />
      </div>

      <div className="battle-report__grid">
        <section className="battle-comparison" aria-labelledby="battle-comparison-title">
          <div className="battle-section-heading"><p className="battle-eyebrow">01 / Profile comparison</p><h3 id="battle-comparison-title">Combat attributes</h3></div>
          <div className="battle-comparison__key"><span><i className="battle-dot battle-dot--first" />{result.first.character.name}</span><span><i className="battle-dot battle-dot--second" />{result.second.character.name}</span></div>
          {result.comparisons.map((comparison) => <MetricBar key={comparison.id} comparison={comparison} />)}
        </section>

        <section className="battle-scenario" aria-labelledby="battle-scenario-title">
          <div className="battle-section-heading"><p className="battle-eyebrow">02 / Local narrative engine</p><h3 id="battle-scenario-title">The scenario</h3></div>
          <ol>{result.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
        </section>
      </div>

      <div className={`battle-verdict${result.winner === 'draw' ? ' battle-verdict--draw' : ''}`}>
        <div className="battle-verdict__topline"><span>FINAL VERDICT / FAN-MADE ESTIMATE</span><span>{result.winner === 'draw' ? 'CLOSE MATCH' : `${result.margin.toFixed(1)} PT EDGE`}</span></div>
        <h3>{result.winner === 'draw' ? 'Too close to call.' : `${result.winner === 'first' ? result.first.character.name : result.second.character.name} takes this model.`}</h3>
        <p>{result.verdict}</p>
        <p className="battle-verdict__disclaimer">This deterministic profile is fictional entertainment, not scientific analysis, canon, or a prediction of an official result.</p>
      </div>

      <div className="battle-report__actions">
        <button type="button" className="battle-button battle-button--primary" onClick={onRematch}>Rematch <span aria-hidden="true">↻</span></button>
        <button type="button" className="battle-button battle-button--secondary" onClick={onSwitchFighters}>Switch fighters <span aria-hidden="true">⇄</span></button>
      </div>
    </section>
  );
}