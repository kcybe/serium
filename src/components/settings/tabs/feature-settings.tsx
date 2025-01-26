"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { SettingsSection } from "../settings-layout"
import { SiteSettings } from "@/types/settings"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Sparkles, Barcode, QrCode, History, Bell, CheckCircle } from "lucide-react"

interface FeatureSettingsProps {
  settings: SiteSettings
  onSubmit: (values: SiteSettings) => void
}

export function FeatureSettings({ settings, onSubmit }: FeatureSettingsProps) {
  const features = [
    {
      id: "barcodeScanning",
      label: "Barcode Scanning",
      description: "Enable barcode scanning for quick item lookup",
      icon: Barcode,
    },
    {
      id: "qrCodeSupport",
      label: "QR Code Support",
      description: "Generate and scan QR codes for inventory items",
      icon: QrCode,
    },
    {
      id: "historyTracking",
      label: "History Tracking",
      description: "Track changes and maintain audit logs",
      icon: History,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Get alerts for low stock and important updates",
      icon: Bell,
    },
    {
      id: "itemVerification",
      label: "Item Verification",
      description: "Track when items were last verified in inventory",
      icon: CheckCircle,
      subFeatures: [
        {
          id: "scanToVerify",
          label: "Scan to Verify",
          description: "Enable barcode scanning for quick item verification"
        }
      ]
    },
  ]

  const handleFeatureToggle = (featureId: string, checked: boolean, subFeatureId?: string) => {
    onSubmit({
      ...settings,
      features: {
        ...settings.features,
        [featureId]: subFeatureId ? settings.features?.[featureId] : checked,
        ...(subFeatureId && {
          [subFeatureId]: checked
        })
      },
    })
  }

  return (
    <form className="space-y-6">
      <SettingsSection
        icon={Sparkles}
        title="Features"
        description="Enable or disable various features"
      >
        <div className="space-y-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.id} className="flex flex-col space-y-4 rounded-lg border p-4">
                <div className="flex items-start space-x-4">
                  <Icon className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={feature.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {feature.label}
                      </label>
                      <Checkbox
                        id={feature.id}
                        checked={settings.features?.[feature.id] || false}
                        onCheckedChange={(checked) => 
                          handleFeatureToggle(feature.id, checked as boolean)
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {feature.subFeatures && settings.features?.[feature.id] && (
                  <div className="ml-9 space-y-3 border-l pl-4">
                    {feature.subFeatures.map(subFeature => (
                      <div key={subFeature.id} className="flex items-center justify-between">
                        <div>
                          <label
                            htmlFor={subFeature.id}
                            className="text-sm font-medium leading-none"
                          >
                            {subFeature.label}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {subFeature.description}
                          </p>
                        </div>
                        <Checkbox
                          id={subFeature.id}
                          checked={settings.features?.[subFeature.id] || false}
                          onCheckedChange={(checked) => 
                            handleFeatureToggle(feature.id, checked as boolean, subFeature.id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </SettingsSection>
    </form>
  )
}