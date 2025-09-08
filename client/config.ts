export const SITE = {
  name: "Supreme Clean Detailing",
  city: "Joshua",
  tagline: "Professional Auto Detailing",
  phone: "6822288120",
  email: "SCDquotes@gmail.com",
  // Primary service areas
  areaServed: ["Joshua", "Cleburne", "Burleson"],
  // Copyright year will be used in footer
  copyrightYear: 2025,
};

export const NAV = [
  { label: "Services & Pricing", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    id: "interior",
    name: "Interior Detail",
    description: "Complete interior vacuum, wipe-down, and fabric/leather treatment.",
    startingPrice: 149,
  },
  {
    id: "exterior",
    name: "Exterior Detail",
    description: "Hand wash, clay bar, polish, and protectant for exterior surfaces.",
    startingPrice: 129,
  },
  {
    id: "full",
    name: "Full Detail",
    description: "Combined interior and exterior detail for a showroom finish.",
    startingPrice: 249,
  },
];

export const ADDONS = [
  { id: "wax", name: "Ceramic Coat / Wax", price: 99 },
  { id: "pet", name: "Pet Hair Removal", price: 49 },
  { id: "stain", name: "Stain Treatment", price: 59 },
];

export const BUSINESS = {
  hours: {
    mon_fri: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  bookingNotice: "Book 48+ hours in advance for best availability.",
};
