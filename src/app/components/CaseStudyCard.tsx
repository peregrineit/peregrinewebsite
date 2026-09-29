import Link from 'next/link';
import type { CaseStudy, CaseStudyTheme } from '@/data/case-studies';

// Class strings are written out in full so Tailwind can find them.
const themes: Record<CaseStudyTheme, {
  card: string; gradient: string; badge: string; title: string; arrow: string;
  iconBox: string; icon: string; flow: string;
}> = {
  cyan: {
    card: 'hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10',
    gradient: 'linear-gradient(135deg, #0c1222 0%, #1a2847 40%, #0f1a2e 100%)',
    badge: 'bg-cyan-600/90', title: 'group-hover:text-cyan-400', arrow: 'text-cyan-400',
    iconBox: 'border-cyan-500/30 bg-cyan-500/10', icon: 'text-cyan-400', flow: 'text-cyan-300/60',
  },
  blue: {
    card: 'hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10',
    gradient: 'linear-gradient(135deg, #0c1222 0%, #1a2847 40%, #0f1a2e 100%)',
    badge: 'bg-blue-600/90', title: 'group-hover:text-blue-400', arrow: 'text-blue-400',
    iconBox: 'border-blue-500/30 bg-blue-500/10', icon: 'text-blue-400', flow: 'text-blue-300/60',
  },
  purple: {
    card: 'hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1854 40%, #1a0a2e 100%)',
    badge: 'bg-purple-600/90', title: 'group-hover:text-purple-400', arrow: 'text-purple-400',
    iconBox: 'border-purple-500/30 bg-purple-500/10', icon: 'text-purple-400', flow: 'text-purple-300/60',
  },
  orange: {
    card: 'hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10',
    gradient: 'linear-gradient(135deg, #1a0e00 0%, #3d2200 40%, #1a0e00 100%)',
    badge: 'bg-orange-600/90', title: 'group-hover:text-orange-400', arrow: 'text-orange-400',
    iconBox: 'border-orange-500/30 bg-orange-500/10', icon: 'text-orange-400', flow: 'text-orange-300/60',
  },
  teal: {
    card: 'hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/10',
    gradient: 'linear-gradient(135deg, #002220 0%, #003d38 40%, #002220 100%)',
    badge: 'bg-teal-600/90', title: 'group-hover:text-teal-400', arrow: 'text-teal-400',
    iconBox: 'border-teal-500/30 bg-teal-500/10', icon: 'text-teal-400', flow: 'text-teal-300/60',
  },
  green: {
    card: 'hover:border-green-500/50 transition-all hover:shadow-xl hover:shadow-green-500/10',
    gradient: 'linear-gradient(135deg, #002210 0%, #003d1a 40%, #002210 100%)',
    badge: 'bg-green-600/90', title: 'group-hover:text-green-400', arrow: 'text-green-400',
    iconBox: 'border-green-500/30 bg-green-500/10', icon: 'text-green-400', flow: 'text-green-300/60',
  },
  amber: {
    card: 'hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/10',
    gradient: 'linear-gradient(135deg, #1a1400 0%, #3d3000 40%, #1a1400 100%)',
    badge: 'bg-amber-600/90', title: 'group-hover:text-amber-400', arrow: 'text-amber-400',
    iconBox: 'border-amber-500/30 bg-amber-500/10', icon: 'text-amber-400', flow: 'text-amber-300/60',
  },
};

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { card } = study;
  const t = themes[card.theme];
  const i = themes[card.iconTheme ?? card.theme];
  return (
    <Link href={`/case-studies/${study.slug}`}
      className={`article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 ${t.card} cursor-pointer !no-underline`}
      data-category={card.category}>
      <div className="relative h-56 w-full overflow-hidden" style={{ background: t.gradient }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center px-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              {card.icons.map((icon) => (
                <div key={icon} className={`w-12 h-12 rounded-xl border ${i.iconBox} flex items-center justify-center`}>
                  <i className={`${icon} text-xl ${i.icon}`}></i>
                </div>
              ))}
            </div>
            <p className={`${i.flow} text-xs font-mono tracking-wider`}>{card.flow}</p>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 ${t.badge} text-white rounded-full text-xs font-semibold backdrop-blur-sm`}>Case Study</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5"><i className={card.industryIcon}></i><span>{card.industry ?? study.industry}</span></div>
          <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>{card.duration}</span></div>
        </div>
        <h3 className={`text-xl font-bold text-white mb-3 ${t.title} transition-colors line-clamp-2`}>{study.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">{card.summary}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {card.badges.map((badge) => (
                <span key={badge} className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">{badge}</span>
              ))}
            </div>
          </div>
          <i className={`ri-arrow-right-line ${t.arrow} group-hover:translate-x-1 transition-transform`}></i>
        </div>
      </div>
    </Link>
  );
}
