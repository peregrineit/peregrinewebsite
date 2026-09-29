import { ogImage } from '@/lib/og';
import { getGuide } from '@/data/guides';

const guide = getGuide('cost-to-build-a-real-estate-platform');
export const alt = `${guide.title}: a guide by Peregrine IT Solutions`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return ogImage({ eyebrow: 'Guide', title: guide.title });
}
