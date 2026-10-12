export type ServiceContent = {
  id: string;
  title: string;
  subtitle: string;
  scope: string[];
  details: string;
  faq: { q: string; a: string }[];
};

export const SERVICES_CONTENT: ServiceContent[] = [
  {
    id: 'new-construction',
    title: 'New Construction',
    subtitle: 'Custom homes built from the ground up in Sacramento County',
    scope: [
      'Site preparation, soil testing and excavation',
      'Structural foundation pouring and steel reinforcing',
      'Timber and steel framing and roof truss install',
      'Plumbing, electrical and HVAC rough-ins',
      'Drywall, premium paint, insulation and interiors',
      'Exterior cladding and landscaping integration',
    ],
    details: 'Leleka Builder Inc. builds custom homes in Sacramento County from site work through final finishes. We coordinate structural engineering, city and county permits, construction phases, and California Building Code inspections.',
    faq: [
      { q: 'How long does a new custom home build take in Sacramento?', a: 'A custom home usually takes 8 to 14 months. Timing depends on size, site conditions, permit review, and architectural complexity.' },
      { q: 'Do you work with architects?', a: 'Yes. We partner with local architects or build from plans you already have.' },
    ],
  },
  {
    id: 'adu-additions',
    title: 'ADU and Home Additions',
    subtitle: 'Backyard accessory dwelling units and home additions',
    scope: [
      'Detached and attached ADU construction',
      'Garage conversions into living studios',
      'Bedroom, family room, and second-story additions',
      'Utility trenching and independent meters',
      'Compact layouts for rental or family use',
    ],
    details: 'We build accessory dwelling units and home additions in Sacramento County for rental income or multi-generational living. California ADU rules allow detached units up to 1,200 square feet, subject to the lot and local setbacks. We handle permits and can connect the unit to the main house utilities or a separate meter.',
    faq: [
      { q: 'What is the maximum size for an ADU in Sacramento?', a: 'State law allows detached ADUs up to 1,200 square feet. Lot coverage, setbacks, and the existing house can reduce that size.' },
      { q: 'Do ADUs require separate utility connections?', a: 'They can share the main house utilities or have separate meters. We compare both options against the budget before construction.' },
    ],
  },
  {
    id: 'full-remodel',
    title: 'Full Home Remodel',
    subtitle: 'Structural and finish remodels across Sacramento County',
    scope: [
      'Open-concept layout changes',
      'Load-bearing wall removal and steel headers',
      'Hardwood, engineered, and luxury vinyl flooring',
      'Subfloor leveling and structural reinforcement',
      'Electrical service panel upgrades',
    ],
    details: 'A full remodel by Leleka Builder Inc. changes the structure and the finishes of an older Sacramento-area house. We remove walls, reset the floor plan, upgrade lighting and insulation, and leave one consistent interior.',
    faq: [
      { q: 'Can we live in the house during a full remodel?', a: 'If the work includes structural walls, plumbing shutoffs, or floor-to-ceiling finishes, plan on temporary lodging. We will say so before work starts.' },
    ],
  },
  {
    id: 'kitchens',
    title: 'Kitchen Remodeling',
    subtitle: 'Custom kitchens in Sacramento, Elk Grove, Folsom, and Roseville',
    scope: [
      'Custom cabinetry design and installation',
      'Quartz, granite, and porcelain waterfall countertops',
      'Under-cabinet, toe-kick, and pendant lighting',
      'Appliance layout and gas line adjustments',
      'Undermount sinks and cabinet hardware',
    ],
    details: 'Leleka Builder Inc. remodels kitchens in Sacramento County with custom cabinets, stone counters, islands, and lighting. A typical kitchen takes 4 to 8 weeks, depending on whether the footprint and appliance locations stay the same.',
    faq: [
      { q: 'How long does a kitchen remodel take?', a: 'Most kitchen remodels take 4 to 8 weeks. Changing the footprint or moving plumbing and gas lines takes longer than a finish-only update.' },
    ],
  },
  {
    id: 'bathrooms',
    title: 'Bathroom Renovation',
    subtitle: 'Walk-in showers, tubs, and vanities for Sacramento homes',
    scope: [
      'Walk-in showers with custom tile',
      'Frameless glass enclosures',
      'Freestanding soaking tubs',
      'Floating vanities with dual basins',
      'Heated tile floors',
    ],
    details: 'We renovate bathrooms with Schluter-style waterproofing, linear drains, quiet ventilation, and tile that stays dry. The goal is a bathroom that holds up in daily use, not only on the day it is finished.',
    faq: [
      { q: 'How do you prevent mold in a new bathroom?', a: 'We use vapor-tight backer board, a continuous waterproof membrane, and a high-CFM quiet exhaust fan.' },
    ],
  },
  {
    id: 'roofing',
    title: 'Roofing',
    subtitle: 'Shingle, metal, and flat roofs in Sacramento County',
    scope: [
      'Architectural composition shingles',
      'Standing-seam metal roofing',
      'Flat roof TPO and EPDM membranes',
      'Underlayment and roof deck repair',
      'Attic and ridge ventilation',
    ],
    details: 'Leleka Builder Inc. replaces residential and light commercial roofs in Sacramento County. Composition shingles typically last 20 to 30 years. Standing-seam metal often lasts more than 50 years with little maintenance.',
    faq: [
      { q: 'How often should a roof be replaced?', a: 'Composition shingle roofs usually last 20 to 30 years. Metal roofs often last more than 50 years if the flashing and fasteners stay sound.' },
    ],
  },
  {
    id: 'siding',
    title: 'Siding and Facades',
    subtitle: 'Fiber cement, cedar, and stucco for California houses',
    scope: [
      'James Hardie fiber cement siding',
      'Cedar accent panels',
      'Stucco patch and full re-stucco',
      'House wrap and weather barrier',
      'Exterior paint and trim',
    ],
    details: 'We replace siding to improve curb appeal and the wall’s weather barrier. Fiber cement such as James Hardie is a common choice in California because it resists fire, rot, and insects better than wood in a dry climate.',
    faq: [
      { q: 'What is the best siding for California homes?', a: 'Fiber cement siding, including James Hardie, is a strong default in this climate because of fire resistance and long service life.' },
    ],
  },
  {
    id: 'landscape-decks',
    title: 'Decks and Landscape',
    subtitle: 'Composite decks, pergolas, and patios in Sacramento County',
    scope: [
      'Multi-level composite and redwood decks',
      'Pergolas and covered patio structures',
      'Stamped concrete and paver patios',
      'Built-in barbecue islands and fire pits',
      'Yard lighting and privacy fencing',
    ],
    details: 'We build decks and patios on pier footings with composite or redwood boards. In California, a deck more than 30 inches above grade, or one with a roof, generally needs a building permit. We submit that paperwork.',
    faq: [
      { q: 'Does a deck require a building permit?', a: 'Decks more than 30 inches off the ground, and decks with a roof or pergola cover, generally need a permit in California. We prepare and submit the plans.' },
    ],
  },
  {
    id: 'electrical-plumbing',
    title: 'Electrical and Plumbing',
    subtitle: 'Panel upgrades, EV circuits, and water-line repipes',
    scope: [
      '200-amp main service panel upgrades',
      'EV charger circuits',
      'Recessed LED layouts and smart controls',
      'Copper-to-PEX water line repipes',
      'Tankless water heater upgrades',
    ],
    details: 'Older 100-amp panels often cannot carry a modern kitchen, air conditioning, and an EV charger together. We upgrade panels to 200 amps and replace aging water lines and tank water heaters when the house needs it.',
    faq: [
      { q: 'Why should I upgrade my electrical panel?', a: 'A 100-amp panel is often too small for current appliances, HVAC, and EV charging. A 200-amp upgrade adds capacity and replaces outdated breakers.' },
    ],
  },
  {
    id: 'other-services',
    title: 'Custom and Light Commercial',
    subtitle: 'Tenant improvements, carpentry, and structural repairs',
    scope: [
      'Tenant improvements and commercial remodeling',
      'Custom timber framing and carpentry',
      'Retaining walls',
      'Structural inspection and earthquake retrofits',
    ],
    details: 'Besides houses, Leleka Builder Inc. takes light commercial work in the Sacramento region: office remodels, retail layouts, tenant improvements, retaining walls, and structural repairs.',
    faq: [
      { q: 'Do you handle light commercial renovations?', a: 'Yes. We remodel offices, retail layouts, and tenant spaces in Sacramento County.' },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES_CONTENT.find((service) => service.id === slug);
}
