import type { JourneyStep } from '@/types';

import { lifestyleImage } from './images';

/** The five-step process band, in the order drawn in the comp. */
export const JOURNEY_STEPS: readonly JourneyStep[] = [
  {
    id: 'women-farmers',
    icon: 'farmer',
    title: 'Women Farmers',
    description: 'Sourcing the finest produce with care and respect.',
    image: lifestyleImage(
      'journey-1',
      'A woman farmer harvesting fresh leafy greens in a field',
      640,
      427,
      '#e9dfcc',
      1280,
    ),
  },
  {
    id: 'careful-processing',
    icon: 'processing',
    title: 'Careful Processing',
    description: 'Hygienically cleaned and naturally dried to retain nutrients.',
    image: lifestyleImage(
      'journey-2',
      'A worker in protective clothing sorting fresh produce for processing',
      640,
      427,
      '#e9dfcc',
      1280,
    ),
  },
  {
    id: 'quality-testing',
    icon: 'testing',
    title: 'Quality Testing',
    description: 'Every batch is lab tested for purity and safety.',
    image: lifestyleImage(
      'journey-3',
      'A laboratory technician examining a powder sample under a microscope',
      640,
      427,
      '#e9dfcc',
      1280,
    ),
  },
  {
    id: 'finest-packaging',
    icon: 'packaging',
    title: 'Finest Packaging',
    description: "Packed with care by women for your family's wellness.",
    image: lifestyleImage(
      'journey-4',
      'Three women carefully sealing natural food pouches at a clean packaging table',
      640,
      427,
      '#e9dfcc',
      1280,
    ),
  },
  {
    id: 'from-our-hands',
    icon: 'hands',
    title: 'From Our Hands',
    description: 'To your home, bringing health, trust & goodness.',
    image: lifestyleImage(
      'journey-5',
      'A woman holding a finished Natural Lite pouch in a home kitchen',
      640,
      427,
      '#e9dfcc',
      1280,
    ),
  },
];
