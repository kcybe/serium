import Link from "next/link";
import { Logo } from "./nav/logo"; // Assuming you have a Logo component
import { Github, Twitter, Linkedin } from "lucide-react";

const footerNavs = [
  { href: "/about", name: "About Us" },
  { href: "/contact", name: "Contact" },
  { href: "/privacy-policy", name: "Privacy Policy" },
  { href: "/terms-of-service", name: "Terms of Service" },
];

const socialLinks = [
  {
    href: "https://github.com/kcybe/serium",
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
  },
  {
    href: "https://twitter.com/serium",
    icon: <Twitter className="w-5 h-5" />,
    label: "Twitter",
  },
  {
    href: "https://linkedin.com/company/serium",
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
  },
];

export default function FooterSection() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Free, open-source, offline-first inventory management. Your data,
              your control.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {footerNavs.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Serium. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
