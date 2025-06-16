import Link from "next/link";
import { Logo } from "./nav/logo";
import { Github } from "lucide-react";
import { Button } from "../ui/button";

export default function FooterSection() {
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Column 1: Logo and Brand Statement */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-base max-w-xs text-muted-foreground">
              Free, open-source, offline-first inventory management.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="https://github.com/kcybe/serium"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Button variant="outline" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Column 2 & 3: Navigation Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/kcybe/serium/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Community
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="https://github.com/kcybe/serium/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Discussions
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/kcybe/serium/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Report a Bug
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/kcybe/serium/pulls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contribute
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Serium. Built by Noam. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
