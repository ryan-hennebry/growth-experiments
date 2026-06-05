export type LineKind =
  | "command"
  | "assistant"
  | "user"
  | "option"
  | "section"
  | "status"
  | "reset";

export type ScriptLine = {
  kind: LineKind;
  text: string;
  start: number;
  typingSpeed?: number;
};

const typingDuration = (line: ScriptLine): number => {
  if (line.kind !== "command" && line.kind !== "user") {
    return 24;
  }

  const speed = line.typingSpeed ?? 2;
  return Math.max(20, line.text.length * speed);
};

export const CLI_LINES: ScriptLine[] = [
  {
    kind: "command",
    text: "$ git clone https://github.com/ryan-hennebry/growth-experiments.git && cd growth-experiments && claude --dangerously-skip-permissions",
    start: 6,
    typingSpeed: 0.85,
  },
  {
    kind: "assistant",
    text: "I turn your campaign metrics into one clear growth experiment to run next.",
    start: 176,
  },
  {
    kind: "assistant",
    text: "What's your website or company name?",
    start: 236,
  },
  {
    kind: "user",
    text: "cursor.com",
    start: 286,
    typingSpeed: 2.8,
  },
  {
    kind: "assistant",
    text: "Based on cursor.com: AI-native code editor for software engineers and technical teams.",
    start: 340,
  },
  { kind: "section", text: "Discovery", start: 392 },
  {
    kind: "option",
    text: "Positioning: AI-native code editing with agent workflows",
    start: 420,
  },
  {
    kind: "option",
    text: "Audience: Software engineers and technical teams",
    start: 450,
  },
  {
    kind: "assistant",
    text: "Proposed phrases to reinforce:",
    start: 490,
  },
  { kind: "option", text: "• Feels like a real coding partner, not autocomplete", start: 520 },
  { kind: "option", text: "• Helps engineers move faster in real codebases", start: 550 },
  { kind: "option", text: "• Reduces friction between idea and shipped code", start: 580 },
  {
    kind: "assistant",
    text: "Do these capture what you want to be known for? I'll use them to guide all content.",
    start: 620,
  },
  { kind: "user", text: "Yes", start: 690, typingSpeed: 5.5 },
  {
    kind: "assistant",
    text: "Channels found: X (@cursor_ai), LinkedIn, and blog/newsletter. Which channels should I track?",
    start: 740,
  },
  { kind: "user", text: "Track X and the blog/newsletter", start: 812, typingSpeed: 2.4 },
  { kind: "section", text: "First Recommendation", start: 890 },
  {
    kind: "status",
    text: "Reviewing recent campaign performance and building baselines...",
    start: 926,
  },
  {
    kind: "assistant",
    text: "Performance signal: trial-start rate is down from 3.4% to 2.6% over the last two weeks. That looks meaningful, not random.",
    start: 992,
  },
  {
    kind: "assistant",
    text: "This looks like a real change, not just week-to-week noise.",
    start: 1050,
  },
  {
    kind: "option",
    text: "Goal: drive trial starts",
    start: 1110,
  },
  {
    kind: "option",
    text: "Audience: software engineers",
    start: 1140,
  },
  {
    kind: "option",
    text: "Channels: X and newsletter",
    start: 1170,
  },
  {
    kind: "option",
    text: "Creative direction: one real workflow win",
    start: 1200,
  },
  {
    kind: "option",
    text: "Customer story: As an engineer, I want one concrete workflow win I can picture in my own stack.",
    start: 1230,
  },
  {
    kind: "assistant",
    text: "Recommendation: test one short X post and one newsletter intro built around a real workflow win.",
    start: 1300,
  },
  {
    kind: "assistant",
    text: "Example X post: \"From bug report to ready-to-review PR in one workflow.\"",
    start: 1360,
  },
  {
    kind: "assistant",
    text: "Newsletter hook: \"Show one workflow win engineers can picture in their own stack.\"",
    start: 1420,
  },
  {
    kind: "assistant",
    text: "Great, here's your recommendation. Want me to email future recommendations to you automatically?",
    start: 1560,
  },
  { kind: "option", text: "Select one: email, Slack, both, or no thanks", start: 1630 },
  { kind: "user", text: "Both", start: 1686, typingSpeed: 3.2 },
  { kind: "section", text: "Delivery", start: 1734 },
  {
    kind: "assistant",
    text: "For email: open Resend, create an API key, and paste it here.",
    start: 1766,
  },
  {
    kind: "user",
    text: "re_live_1234",
    start: 1832,
    typingSpeed: 2.4,
  },
  {
    kind: "assistant",
    text: "What sender email should I use?",
    start: 1890,
  },
  {
    kind: "user",
    text: "hello@cursor.com",
    start: 1940,
    typingSpeed: 2.1,
  },
  {
    kind: "assistant",
    text: "What email should I send recommendations to?",
    start: 2008,
  },
  { kind: "user", text: "team@cursor.com", start: 2068, typingSpeed: 2.1 },
  {
    kind: "assistant",
    text: "For Slack: create an Incoming Webhook for the channel you want, then paste the URL here.",
    start: 2138,
  },
  {
    kind: "user",
    text: "https://hooks.slack.com/services/...",
    start: 2218,
    typingSpeed: 1.6,
  },
  {
    kind: "assistant",
    text: "What Slack channel should I notify?",
    start: 2298,
  },
  { kind: "user", text: "#growth", start: 2356, typingSpeed: 3.4 },
  {
    kind: "assistant",
    text: "7:00 AM is the default delivery time. Keep it?",
    start: 2414,
  },
  { kind: "user", text: "Yes", start: 2472, typingSpeed: 5.5 },
  {
    kind: "status",
    text: "You're set. If you want to change delivery later, just tell me here in chat.",
    start: 2530,
  },
  {
    kind: "reset",
    text: "",
    start: 2616,
  },
];

const finalFrame = CLI_LINES.reduce((max, line) => {
  return Math.max(max, line.start + typingDuration(line));
}, 0);

export const CLI_DURATION_IN_FRAMES = finalFrame + 45;
