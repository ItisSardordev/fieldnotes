import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Check, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    name: 'Individual',
    tagline: 'For independent researchers.',
    price: '$0',
    period: '/month',
    features: [
      'Unlimited documents',
      'Markdown editor with live preview',
      'Focus mode',
      'Personal reference library',
      'Citation formatting (APA, MLA, Chicago, IEEE)',
      'Version history (30 days)',
    ],
    cta: 'Start writing',
    highlighted: false,
  },
  {
    name: 'Lab',
    tagline: 'For research groups and university labs.',
    price: '$12',
    period: '/member / month',
    features: [
      'Everything in Individual',
      'Shared lab workspace',
      'Team reference library',
      'Role-based permissions',
      'Comments & review workflow',
      'Version history (unlimited)',
      'Research graph visualization',
    ],
    cta: 'Start lab trial',
    highlighted: true,
  },
  {
    name: 'Institution',
    tagline: 'For universities and research organizations.',
    price: 'Custom',
    period: '',
    features: [
      'Everything in Lab',
      'Organization-wide deployment',
      'SSO & SAML integration',
      'Audit logs & compliance',
      'Dedicated support & onboarding',
      'Custom citation styles',
      'Data residency options',
    ],
    cta: 'Contact us',
    highlighted: false,
  },
];

export function Pricing() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="pricing" className="py-24 lg:py-32 border-t border-paper-200 bg-paper-100/40">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} text-center max-w-2xl mx-auto mb-16`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-6 bg-ink-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">Pricing</span>
            <div className="h-px w-6 bg-ink-300" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink-900 leading-tight">
            Simple plans. Serious tools.
          </h2>
          <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-md bg-paper-200/60 border border-paper-300/50">
            <button
              onClick={() => setBilling('monthly')}
              className={`text-[12px] px-3 py-1.5 rounded transition-colors ${billing === 'monthly' ? 'bg-paper-50 text-ink-900 shadow-sm' : 'text-ink-400'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`text-[12px] px-3 py-1.5 rounded transition-colors ${billing === 'annual' ? 'bg-paper-50 text-ink-900 shadow-sm' : 'text-ink-400'}`}
            >
              Annual <span className="text-sage-600">−20%</span>
            </button>
          </div>
        </div>

        <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto`}>
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-6 lg:p-8 flex flex-col transition-all ${
                plan.highlighted
                  ? 'border-ink-900 bg-paper-50 shadow-2xl shadow-ink-900/10 lg:scale-[1.02]'
                  : 'border-paper-300/70 bg-paper-50/50 hover:border-paper-400'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink-900 text-paper-50 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}
              <h3 className="font-display text-2xl text-ink-900">{plan.name}</h3>
              <p className="text-[13px] text-ink-400 mt-1.5 leading-relaxed">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl text-ink-900">
                  {plan.price === 'Custom' ? plan.price : billing === 'annual' ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}` : plan.price}
                </span>
                <span className="text-[12px] text-ink-400 font-mono">{plan.period}</span>
              </div>
              <div className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-slate-deep' : 'text-sage-500'}`} strokeWidth={2} />
                    <span className="text-[13px] text-ink-600 leading-snug">{f}</span>
                  </div>
                ))}
              </div>
              <button
                className={`mt-8 flex items-center justify-center gap-2 text-[13px] font-medium px-4 py-3 rounded-md transition-all ${
                  plan.highlighted
                    ? 'bg-ink-900 text-paper-50 hover:bg-ink-800'
                    : 'border border-ink-300 text-ink-700 hover:border-ink-700 hover:bg-paper-100'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
