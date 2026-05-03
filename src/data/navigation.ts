// ─────────────────────────────────────────────────────────────────────────────
// Navigation data — single source of truth for all links used in Header,
// Footer, and any other component that needs site navigation.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  label: string;
  href: string;
}

export interface ServiceDivision {
  division: string;
  href: string;
  description: string;
  items: ServiceItem[];
}

export interface SocialLink {
  label: string;
  href: string;
  external?: boolean;
}

// ── Primary nav links (used in Header & mobile menu) ─────────────────────────
export const primaryNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  // Services is handled separately via the mega menu
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// ── Quick links (used in Footer) ──────────────────────────────────────────────
export const quickLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// ── Footer legal / bottom-bar links ──────────────────────────────────────────
// Add links here once the corresponding pages exist (e.g. Privacy Policy, Terms)
export const legalLinks: NavLink[] = [];

// ── Developer / agency credit ─────────────────────────────────────────────────
export const developer = {
  name: 'Apex Web Solutions',
  href: 'https://www.apexwebsolutions.co.za/',
  external: true,
};

// ── Service divisions — full mega-menu data ───────────────────────────────────
export const serviceDivisions: ServiceDivision[] = [
  {
    division: 'Construction & Civil Engineering',
    href: '/services/construction',
    description: 'Building, roads, renovations & safety management',
    items: [
      { label: 'General Building & Maintenance', href: '/services/construction#building' },
      { label: 'New Builds & Renovations', href: '/services/construction#renovations' },
      { label: 'Road Construction', href: '/services/construction#road-construction' },
      { label: 'Road Maintenance', href: '/services/construction#road-maintenance' },
      { label: 'Structural & Civil Works', href: '/services/construction#structural' },
      { label: 'Road Safety Management', href: '/services/construction#safety' },
    ],
  },
  {
    division: 'Mechanical Engineering',
    href: '/services/mechanical',
    description: 'Design, manufacturing, maintenance & commissioning',
    items: [
      { label: 'Design & Development', href: '/services/mechanical#design' },
      { label: 'Manufacturing & Production', href: '/services/mechanical#manufacturing' },
      { label: 'Maintenance & Reliability', href: '/services/mechanical#maintenance' },
      { label: 'System Analysis', href: '/services/mechanical#analysis' },
      { label: 'Installation & Commissioning', href: '/services/mechanical#installation' },
      { label: 'Project Management', href: '/services/mechanical#project-management' },
    ],
  },
  {
    division: 'Cleaning & Waste Management',
    href: '/services/cleaning',
    description: 'Commercial, industrial & hazardous waste solutions',
    items: [
      { label: 'Commercial & Contract Cleaning', href: '/services/cleaning#commercial' },
      { label: 'Industrial Cleaning', href: '/services/cleaning#industrial' },
      { label: 'Hygiene & Sanitation', href: '/services/cleaning#hygiene' },
      { label: 'Hazardous Materials (Hazmat)', href: '/services/cleaning#hazmat' },
      { label: 'Waste Collection & Transport', href: '/services/cleaning#collection' },
      { label: 'Recycling & Sorting', href: '/services/cleaning#recycling' },
    ],
  },
  {
    division: 'Plant Hire',
    href: '/services/plant-hire',
    description: 'Heavy equipment rental for construction & industry',
    items: [
      { label: 'TLB (Tractor Loader Backhoe)', href: '/services/plant-hire#tlb' },
      { label: 'Tipper Trucks', href: '/services/plant-hire#tipper-trucks' },
      { label: 'Water Carts', href: '/services/plant-hire#water-carts' },
      { label: 'Excavators', href: '/services/plant-hire#excavators' },
      { label: 'Bulldozers', href: '/services/plant-hire#bulldozers' },
      { label: 'Generators & Tools', href: '/services/plant-hire#generators' },
    ],
  },
  {
    division: 'Security',
    href: '/services/security',
    description: 'Guarding, access control & risk management solutions',
    items: [
      { label: 'Manned Guarding', href: '/services/security#guarding' },
      { label: 'Access Control', href: '/services/security#access-control' },
      { label: 'CCTV & Surveillance', href: '/services/security#cctv' },
      { label: 'Risk Assessment', href: '/services/security#risk-assessment' },
      { label: 'Event Security', href: '/services/security#events' },
      { label: 'Site Security', href: '/services/security#site-security' },
    ],
  },
];

// ── Flat service links derived from divisions (used in Footer) ────────────────
export const serviceLinks: NavLink[] = serviceDivisions.map((s) => ({
  label: s.division,
  href: s.href,
}));

// ── Social media links ────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { label: 'Follow us on Facebook', href: '#' },
  { label: 'Follow us on Instagram', href: '#' },
  { label: 'Connect on LinkedIn', href: '#' },
  { label: 'Chat on WhatsApp', href: 'https://wa.me/27792947635', external: true },
];
