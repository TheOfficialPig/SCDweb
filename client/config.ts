export const SITE = {
  name: "Supreme Clean Detailing",
  city: "Joshua",
  tagline: "Professional Auto Detailing",
  phone: "682-228-8120",
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
    description:
      "Complete interior vacuum, wipe-down, and fabric/leather treatment.",
    startingPrice: 59,
  },
  {
    id: "exterior",
    name: "Exterior Detail",
    description:
      "Exterior Wash, Tire Shine and Wax.",
    startingPrice: 59,
  },
  {
    id: "full",
    name: "Full Detail",
    description: "Combined interior and exterior detail for a showroom finish.",
    startingPrice: 99,
  },
];

export const ADDONS = [
  { id: "oder", name: "Oder Treatment", price: 4.99 },
  { id: "pet", name: "Pet Hair Removal", price: 14.99 },
  { id: "stain", name: "Stain Treatment", price: 29.99 },
];

export const BUSINESS = {
  hours: {
    mon_fri: "8:00 AM - 6:00 PM",
    saturday: "8:00 AM - 5:00 PM",
    sunday: "Closed",
  },
  bookingNotice: "Book 24+ hours in advance for best availability.",
};
