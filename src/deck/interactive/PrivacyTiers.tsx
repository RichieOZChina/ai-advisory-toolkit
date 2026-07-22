const TIERS = [
  { color: "#dc2626", bg: "#fef2f2", label: "Consumer tier", t: "Your chats may train models. Do not paste client data.", ex: "Free ChatGPT · Claude.ai personal" },
  { color: "#d97706", bg: "#fffbeb", label: "Business API", t: "Opted out by default, retention limits, audit trails.", ex: "OpenAI enterprise · Anthropic API · Azure OpenAI" },
  { color: "#059669", bg: "#f0fdf4", label: "Open-source / self-hosted", t: "Fully air-gapped, data never leaves your environment.", ex: "Llama 4 on internal GPUs · DeepSeek self-hosted" },
];

export function PrivacyTiers() {
  return (
    <div className="mt-6 space-y-3 max-w-4xl">
      {TIERS.map((t) => (
        <div key={t.label} className="rounded-xl border-l-4 p-5 flex items-start gap-6" style={{ borderLeftColor: t.color, background: t.bg }}>
          <div className="min-w-[180px]">
            <div className="font-semibold" style={{ color: t.color }}>{t.label}</div>
            <div className="slide-caption mt-1">{t.ex}</div>
          </div>
          <div className="slide-body">{t.t}</div>
        </div>
      ))}
    </div>
  );
}
