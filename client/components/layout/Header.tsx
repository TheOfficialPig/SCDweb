import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SITE, NAV } from "@/config";
import { cn } from "@/lib/utils";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">SC</span>
          <span className="text-xl">{SITE.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-foreground/90",
                  isActive || pathname.startsWith(item.href)
                    ? "text-foreground"
                    : "text-foreground/60",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/contact">Book a Free Quote</Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link to="/login?role=client">Client Login</Link>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/login?role=staff">Staff Login</Link>
          </Button>

          <Button asChild variant="outline" size="icon" className="md:hidden">
            <Link to="/contact">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h15c1.243 0 2.25 1.007 2.25 2.25v10.5c0 1.243-1.007 2.25-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75Zm7.784 2.41a.75.75 0 0 0-1.068 1.053l2.25 2.286a.75.75 0 0 0 1.075.01l4.5-4.5a.75.75 0 0 0-1.06-1.061l-3.964 3.964-1.733-1.752Z" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
