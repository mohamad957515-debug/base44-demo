import { unsplash } from "../lib/images";

/** Global brand & contact constants. */
export const BRAND = {
  name: "Horizon Properties",
  phone: "(555) 246-7890",
  phoneHref: "tel:+15552467890",
  email: "hello@horizonproperties.com",
  emailHref: "mailto:hello@horizonproperties.com",
  address: "410 Horizon Avenue, Suite 1200",
  address2: "Austin, TX 78701",
  hours: "Mon – Sat · 9:00 AM – 6:00 PM",
};

export const NAV_LINKS = [
  { label: "Home", to: "/", kind: "route" },
  { label: "Properties", to: "/properties", kind: "route" },
  { label: "About Us", to: "about", kind: "section" },
  { label: "Services", to: "services", kind: "section" },
  { label: "Team", to: "team", kind: "section" },
  { label: "Contact", to: "/contact", kind: "route" },
];

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com", key: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com", key: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com", key: "linkedin" },
  { label: "X", href: "https://www.x.com", key: "x" },
];

export const SERVICES = [
  {
    number: "01",
    title: "Luxury Home Sales",
    text: "Curated marketing and private representation for exceptional homes, from first showing to final signature.",
  },
  {
    number: "02",
    title: "Property Investment",
    text: "Data-driven guidance to identify, evaluate, and grow a resilient property portfolio with confidence.",
  },
  {
    number: "03",
    title: "Property Marketing",
    text: "Editorial photography, staging, and targeted campaigns that present each residence at its absolute best.",
  },
  {
    number: "04",
    title: "Real Estate Advisory",
    text: "Strategic counsel through every stage of buying, selling, and negotiating — discreet and exacting.",
  },
  {
    number: "05",
    title: "Property Valuation",
    text: "Precise, market-informed valuations prepared by senior analysts, not automated estimates.",
  },
  {
    number: "06",
    title: "Relocation Services",
    text: "End-to-end support for seamless moves — schools, staffing, and settling in, near or far.",
  },
];

export const TEAM = [
  {
    id: "daniel-morgan",
    name: "Daniel Morgan",
    role: "Managing Director",
    photo: unsplash("1500648767791-00dcc994a43e", 700),
  },
  {
    id: "olivia-carter",
    name: "Olivia Carter",
    role: "Luxury Property Advisor",
    photo: unsplash("1573496359142-b8d87734a5a2", 700),
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    role: "Investment Consultant",
    photo: unsplash("1472099645785-5658abf4ff4e", 700),
  },
  {
    id: "sophia-bennett",
    name: "Sophia Bennett",
    role: "Senior Property Specialist",
    photo: unsplash("1494790108377-be9c29b29330", 700),
  },
];

export const WHY_POINTS = [
  "Off-market access to exceptional listings",
  "Data-driven investment guidance",
  "Discreet, end-to-end representation",
  "A trusted network of architects, designers & lenders",
];

export const STATS = [
  { value: "15+", label: "Years of Excellence" },
  { value: "$1.2B+", label: "In Property Sales" },
  { value: "500+", label: "Families Placed" },
  { value: "98%", label: "Client Satisfaction" },
];
