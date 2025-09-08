import { Link } from "react-router-dom";
import { SITE } from "@/config";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="mb-2 text-lg font-bold">{SITE.name}</div>
          <p className="text-sm text-muted-foreground">
            Premium mobile auto detailing in {SITE.city}. Shine that lasts.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-3 font-semibold">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link className="hover:text-foreground" to="/about">About Us</Link></li>
            <li><Link className="hover:text-foreground" to="/gallery">Gallery</Link></li>
            <li><Link className="hover:text-foreground" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="mb-3 font-semibold">Services</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>Interior Detailing</li>
            <li>Exterior Detailing</li>
            <li>Full Detail</li>
            <li>Add-ons & Coatings</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
