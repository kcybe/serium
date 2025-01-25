"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import SettingsButton from "./settings/settings-button"
import InventoryButton from "./inventory/inventory-button"
import { AnimatedLogo } from "./ui/animated-logo"

export function Navbar() {
  return (
    <div className="sticky top-4 z-50 flex justify-center">
      <nav className="border rounded-lg bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full max-w-7xl mx-4 p-2">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <AnimatedLogo />
          </Link>
          <div className="flex space-x-2">
            <InventoryButton />
            <SettingsButton />
          </div>
        </div>
      </nav>
    </div>
  )
}