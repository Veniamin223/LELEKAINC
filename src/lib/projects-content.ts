export type ProjectContent = {
  id: string;
  title: string;
  category: 'new-build' | 'remodel' | 'adu' | 'deck';
  categoryLabel: string;
  location: string;
  image: string;
  description: string;
  specs: {
    duration: string;
    size: string;
    features: string[];
  };
};

export const PROJECTS_CONTENT: ProjectContent[] = [
  {
    id: 'adu-sacramento',
    title: 'Modern ADU Addition',
    category: 'adu',
    categoryLabel: 'ADU / Addition',
    location: 'Sacramento, CA',
    image: '/projects/adu_addition.png',
    description: 'A custom detached accessory dwelling unit in a Sacramento backyard. It has high-efficiency windows, standing-seam detailing, wood accents, and a private kitchen and bathroom.',
    specs: {
      duration: '5 Months',
      size: '750 sq ft',
      features: ['Independent power meter', 'Compact space planning', 'Wood-style cladding', 'Energy-efficient insulation'],
    },
  },
  {
    id: 'remodel-roseville',
    title: 'Contemporary Home Remodeling',
    category: 'remodel',
    categoryLabel: 'Full Remodel',
    location: 'Roseville, CA',
    image: '/projects/home_remodel.png',
    description: 'A 1990s Roseville floor plan opened into a light-filled layout. The work removed three non-structural walls, set a steel load-bearing header, added recessed lighting, and installed engineered oak flooring.',
    specs: {
      duration: '3.5 Months',
      size: '2,100 sq ft',
      features: ['Load-bearing wall demolition', 'Engineered oak flooring', 'Recessed lighting', 'Dual-zone HVAC control'],
    },
  },
  {
    id: 'deck-folsom',
    title: 'Custom Backyard Deck',
    category: 'deck',
    categoryLabel: 'Landscape / Deck',
    location: 'Folsom, CA',
    image: '/projects/backyard_deck.png',
    description: 'A multi-level composite deck in Folsom built over a backyard slope, with built-in seating, paver borders, step lighting, and a pergola.',
    specs: {
      duration: '4 Weeks',
      size: '950 sq ft',
      features: ['Composite decking', 'Stair lighting', 'Concrete pier footings', 'Cedar pergola'],
    },
  },
  {
    id: 'kitchen-elkgrove',
    title: 'Kitchen Remodel in Elk Grove',
    category: 'remodel',
    categoryLabel: 'Kitchen Remodel',
    location: 'Elk Grove, CA',
    image: '/projects/kitchen_remodel.png',
    description: 'An Elk Grove kitchen rebuilt with walnut cabinets, a double waterfall quartz island, commercial appliances, under-cabinet lighting, and a built-in pantry.',
    specs: {
      duration: '6 Weeks',
      size: '320 sq ft',
      features: ['Waterfall quartz island', 'Walnut cabinets', 'Commercial range and hood', 'Hidden outlets'],
    },
  },
];

export function getProject(slug: string) {
  return PROJECTS_CONTENT.find((project) => project.id === slug);
}
