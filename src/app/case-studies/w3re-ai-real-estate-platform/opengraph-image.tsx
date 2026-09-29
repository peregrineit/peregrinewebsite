import { ogImage } from '@/lib/og';
import { getCaseStudy } from '@/data/case-studies';

const study = getCaseStudy('w3re-ai-real-estate-platform');
export const alt = `${study.title}: case study by Peregrine IT Solutions`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return ogImage({ eyebrow: `Case study · ${study.industry}`, title: study.title });
}
