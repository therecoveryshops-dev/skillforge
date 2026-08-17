import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Play, Plus, Sparkles, Upload, WandSparkles, Workflow, Chrome, CheckCircle2, CircleDot, Terminal } from "lucide-react";
import "./styles.css";

type RecordedEvent = {
  id: string;
  timestamp: number;
  action: "navigate" | "click" | "input" | "change";
  url: string;
  selector?: string;
  text?: string;
  value?: string;
  tag?: string;
  name?: string;
  ariaLabel?: string;
  placeholder?: string;
};

type Skill = {
  id: string;
  name: string;
  description: string;
  allowedDomains: string[];
  inputs: { name: string; label: string; type: string; defaultValue?: string }[];
  steps: any[];
  createdAt: string;
};

const initialSkill: Skill = {
  id: "demo-find-businesses",
  name: "Find Local Businesses",
  description: "Searches a business directory using a reusable query input.",
  allowedDomains: ["www.google.com"],
  inputs: [{ name: "query", label: "Search query", type: "string", defaultValue: "gyms in Dallas" }],
  steps: [
    { action: "navigate", url: "https://www.google.com" },
    { action: "fill", selector: "textarea[name='q'], input[name='q']", value: "{{query}}", description: "Enter search query" },
    { action: "press", selector: "textarea[name='q'], input[name='q']", key: "Enter", description: "Run search" }
  ],
  createdAt: new Date().toISOString()
};

function localCompile(events: RecordedEvent[]): Skill {
  const firstUrl = events.find(e => e.url)?.url || "https://example.com";
  let domain = "example.com";
  try { domain = new URL(firstUrl).hostname; } catch {}

  const steps: any[] = [];
  const inputs: Skill["inputs"] = [];
  let inputCount = 0;

  if (firstUrl) steps.push({ action: "navigate", url: firstUrl });

  for (const event of events) {
    if (event.action === "input" && event.selector && event.value) {
      inputCount += 1;
      const name = event.name || event.placeholder || event.ariaLabel || `input_${inputCount}`;
      const normalized = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || `input_${inputCount}`;
      inputs.push({ name: normalized, label: name, type: "string", defaultValue: event.value });
      steps.push({ action: "fill", selector: event.selector, value: `{{${normalized}}}`, description: `Fill ${name}` });
    }
    if (event.action === "click" && event.selector) {
      steps.push({ action: "click", selector: event.selector, description: event.text ? `Click ${event.text}` : "Click element" });
    }
  }

  return {
    id: crypto.randomUUID(),
    name: `Learned workflow on ${domain}`,
    description: "Generated from a browser demonstration.",
    allowedDomains: [domain],
    inputs,
    steps,
    createdAt: new Date().toISOString()
  };
}

function App() {
  const [tab, setTab] = useState<"skills" | "teach" | "run">("skills");
  const [skills, setSkills] = useState<Skill[]>([initialSkill]);
  const [recording, setRecording] = useState<RecordedEvent[] | null>(null);
  const [draft, setDraft] = useState<Skill | null>(null);
  const [runSkill, setRunSkill] = useState<Skill>(initialSkill);
  const [runValues, setRunValues] = useState<Record<string, string>>({ query: "dentists in Houston" });
  const [runResult, setRunResult] = useState<string>("");

  const stats = useMemo(() => ({ skills: skills.length, runs: 0, success: "—" }), [skills]);

  async function importRecording(file: File) {
    const raw = await file.text();
    const parsed = JSON.parse(raw);
    const events = Array.isArray(parsed) ? parsed : parsed.events;
    if (!Array.isArray(events)) throw new Error("Recording JSON must contain an events array.");
    setRecording(events);
    setDraft(localCompile(events));
  }

  function saveDraft() {
    if (!draft) return;
    setSkills(prev => [draft, ...prev]);
    setRunSkill(draft);
    const next: Record<string, string> = {};
    for (const input of draft.inputs) next[input.name] = String(input.defaultValue ?? "");
    setRunValues(next);
    setTab("run");
  }

  function simulateRun() {
    setRunResult("Preparing run…");
    setTimeout(() => {
      setRunResult(`Ready to execute ${runSkill.steps.length} steps with ${JSON.stringify(runValues)}. Use the Playwright worker for the real browser run.`);
    }, 450);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Workflow size={20}/></div><span>SkillForge</span></div>
        <nav>
          <button className={tab === "skills" ? "active" : ""} onClick={() => setTab("skills")}><Sparkles size={18}/> My Skills</button>
          <button className={tab === "teach" ? "active" : ""} onClick={() => setTab("teach")}><WandSparkles size={18}/> Teach Skill</button>
          <button className={tab === "run" ? "active" : ""} onClick={() => setTab("run")}><Play size={18}/> Run Skill</button>
        </nav>
        <div className="sidebar-note"><Chrome size={17}/><div><strong>Recorder</strong><span>Load the extension from apps/extension.</span></div></div>
      </aside>

      <main>
        <header>
          <div><h1>{tab === "skills" ? "My Skills" : tab === "teach" ? "Teach a Skill" : "Run a Skill"}</h1><p>{tab === "skills" ? "Reusable workflows your AI can execute." : tab === "teach" ? "Import a browser demonstration and turn it into a parameterized skill." : "Test a compiled skill with new inputs."}</p></div>
          {tab === "skills" && <button className="primary" onClick={() => setTab("teach")}><Plus size={17}/> Teach new skill</button>}
        </header>

        {tab === "skills" && <>
          <section className="stats">
            <div><span>Skills</span><strong>{stats.skills}</strong></div>
            <div><span>Runs</span><strong>{stats.runs}</strong></div>
            <div><span>Success rate</span><strong>{stats.success}</strong></div>
          </section>
          <section className="panel">
            <div className="panel-head"><h2>Skills</h2><span>{skills.length} total</span></div>
            <div className="skill-list">
              {skills.map(skill => <button key={skill.id} className="skill-row" onClick={() => { setRunSkill(skill); setTab("run"); }}>
                <div className="skill-icon"><Workflow size={19}/></div>
                <div className="skill-copy"><strong>{skill.name}</strong><span>{skill.description}</span></div>
                <div className="domain">{skill.allowedDomains[0]}</div>
                <div className="status"><CheckCircle2 size={16}/> Ready</div>
              </button>)}
            </div>
          </section>
        </>}

        {tab === "teach" && <div className="teach-grid">
          <section className="panel recorder-card">
            <div className="step-number">1</div>
            <h2>Record the workflow</h2>
            <p>Use the SkillForge Chrome extension, perform the task normally, then export the recording JSON.</p>
            <div className="recording-hint"><CircleDot size={18}/><span>The recorder captures semantic selectors and form values, not just mouse coordinates.</span></div>
          </section>
          <section className="panel upload-card">
            <div className="step-number">2</div>
            <h2>Import demonstration</h2>
            <label className="dropzone">
              <Upload size={26}/>
              <strong>Choose recording JSON</strong>
              <span>Exported from the Chrome extension</span>
              <input type="file" accept="application/json" onChange={e => e.target.files?.[0] && importRecording(e.target.files[0]).catch(err => alert(err.message))}/>
            </label>
            {recording && <div className="success-line"><CheckCircle2 size={17}/> Imported {recording.length} recorded events.</div>}
          </section>

          {draft && <section className="panel review-card">
            <div className="review-title"><div><div className="step-number">3</div><h2>AI-understood workflow</h2></div><span className="badge">Draft</span></div>
            <label>Skill name<input value={draft.name} onChange={e => setDraft({...draft, name: e.target.value})}/></label>
            <label>Description<input value={draft.description} onChange={e => setDraft({...draft, description: e.target.value})}/></label>
            <h3>Inputs</h3>
            {draft.inputs.length === 0 ? <p className="muted">No reusable inputs detected yet.</p> : draft.inputs.map((input, i) => <div className="input-row" key={input.name}><code>{`{{${input.name}}}`}</code><span>{String(input.defaultValue ?? "")}</span></div>)}
            <h3>Steps</h3>
            <div className="steps-list">{draft.steps.map((step, i) => <div key={i}><span>{i+1}</span><code>{step.action}</code><p>{step.description || step.url || step.selector}</p></div>)}</div>
            <button className="primary full" onClick={saveDraft}><Sparkles size={17}/> Save skill and test</button>
          </section>}
        </div>}

        {tab === "run" && <div className="run-layout">
          <section className="panel">
            <div className="run-heading"><div className="skill-icon large"><Workflow size={22}/></div><div><h2>{runSkill.name}</h2><p>{runSkill.description}</p></div></div>
            <div className="allowed">Allowed domain: <strong>{runSkill.allowedDomains.join(", ")}</strong></div>
            <h3>Inputs</h3>
            {runSkill.inputs.map(input => <label key={input.name}>{input.label}<input value={runValues[input.name] ?? ""} onChange={e => setRunValues(v => ({...v, [input.name]: e.target.value}))}/></label>)}
            <button className="primary full" onClick={simulateRun}><Play size={17}/> Run skill</button>
          </section>
          <section className="panel terminal-panel">
            <div className="terminal-title"><Terminal size={17}/> Execution preview</div>
            <pre>{runResult || `Waiting to run…\n\n${runSkill.steps.map((s, i) => `${i+1}. ${s.action} ${s.description || s.url || s.selector || ""}`).join("\n")}`}</pre>
          </section>
        </div>}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
