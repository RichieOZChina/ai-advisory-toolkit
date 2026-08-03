const TIERS = [
  { color: "#dc2626", bg: "#fef2f2", label: "Consumer tier", t: "Your chats may train models. Do not paste client data.", ex: "Free ChatGPT · Claude.ai personal" },
  { color: "#d97706", bg: "#fffbeb", label: "Approved business environment", t: "Business terms may exclude training and offer retention controls. Confirm the exact contract and firm policy.", ex: "ChatGPT Enterprise · Claude Enterprise · Azure OpenAI · API with zero-retention terms" },
  { color: "#059669", bg: "#f0fdf4", label: "Self-hosted open weights", t: "Data can remain inside your environment only when the model is genuinely self-hosted. Hosted apps and APIs are different.", ex: "Llama or DeepSeek weights on firm-controlled infrastructure" },
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
      <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm text-blue-950"><b>Afternoon lab:</b> use only the environment and source pack approved by Tenet for the session. Do not add live client material unless Tenet confirms it is permitted.</div>
    </div>
  );
}
