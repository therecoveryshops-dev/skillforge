export type RecordedEvent = {
  id: string;
  timestamp: number;
  action: "navigate" | "click" | "input" | "change";
  url: string;
  selector?: string;
  text?: string;
  value?: string;
  tag?: string;
  inputType?: string;
  name?: string;
  ariaLabel?: string;
  placeholder?: string;
};

export type SkillInput = {
  name: string;
  label: string;
  type: "string" | "number" | "boolean";
  defaultValue?: string | number | boolean;
  required?: boolean;
};

export type SkillStep =
  | { action: "navigate"; url: string }
  | { action: "click"; selector: string; description?: string }
  | { action: "fill"; selector: string; value: string; description?: string }
  | { action: "press"; selector: string; key: string; description?: string }
  | { action: "extract"; selector: string; field: string; multiple?: boolean };

export type Skill = {
  id: string;
  name: string;
  description: string;
  version: "0.1";
  allowedDomains: string[];
  inputs: SkillInput[];
  steps: SkillStep[];
  createdAt: string;
};
