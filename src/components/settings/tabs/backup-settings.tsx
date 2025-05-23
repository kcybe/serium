"use client"

import { Button } from "@/components/ui/button"
import { SettingsSection } from "../settings-layout"
import { Download, Upload, Save, RotateCcw } from "lucide-react"
import { db } from "@/lib/services/db"
import { exportToJson } from "@/lib/services/utils/export-to-json"
import { importFromJson } from "@/lib/services/utils/import-from-json"
import { toast } from "sonner"
import { useRef, useState } from "react"
import { SiteSettings, defaultSettings } from "@/types/settings"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { useTranslation } from "@/hooks/use-translation"

interface BackupSettingsProps {
  settings: SiteSettings
  onSettingsImported: (settings: SiteSettings) => void
}

export function BackupSettings({ settings, onSettingsImported }: BackupSettingsProps) {
  const { t } = useTranslation(settings)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showResetDialog, setShowResetDialog] = useState(false)

  const handleExportAll = async () => {
    try {
      const [inventory, historyLogs] = await Promise.all([
        db.inventory.toArray(),
        db.history.toArray()
      ])
      exportToJson(
        { settings, inventory, history: historyLogs },
        `inventory-backup-${new Date().toISOString().split('T')[0]}.json`
      )
      toast.success(t('toast.backupExportSuccess'))
    } catch (error) {
      toast.error(t('toast.backupExportError'))
      console.error(error)
    }
  }

  const handleImportAll = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    try {
      const backup = await importFromJson(file)
      
      // Clear existing data first
      await Promise.all([
        db.inventory.clear(),
        db.history.clear()
      ])

      // Import inventory
      if (backup.inventory) {
        await db.inventory.bulkAdd(backup.inventory)
      }

      // Import history
      if (backup.history) {
        await db.history.bulkAdd(backup.history)
      }

      // Update settings
      if (backup.settings) {
        await db.settings.update('site-settings', {
          ...backup.settings,
          customColumns: backup.settings.customColumns || [],
          categories: backup.settings.categories || [],
          statuses: backup.settings.statuses || []
        })
      }
      
      toast.success(t('toast.fullBackupRestored'))
    } catch (error) {
      toast.error(t('toast.invalidBackupFile') + error)
    }
  }

  const handleFactoryReset = async () => {
    try {
      await Promise.all([
        db.inventory.clear(),
        db.history.clear(),
        db.settings.put({ ...defaultSettings, id: 'site-settings' })
      ])
      onSettingsImported(defaultSettings)
      toast.success(t('toast.factoryResetSuccess'))
    } catch (error) {
      toast.error(t('toast.factoryResetError'))
      console.error(error)
    }
    setShowResetDialog(false)
  }

  return (
    <div className="space-y-6">
      <SettingsSection
        icon={Save}
        title={t('backup.backupRestoreTitle')}
        description={t('backup.backupRestoreDescription')}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".json"
          className="hidden"
          onChange={handleImportAll}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button type="button" className="w-full flex items-center justify-center gap-2" onClick={handleExportAll}>
            <Download className="h-4 w-4" />
            {t('buttons.export')}
          </Button>
          <Button variant={"outline"} type="button" className="w-full flex items-center justify-center gap-2" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4" />
            {t('buttons.import')}
          </Button>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={RotateCcw}
        title={t('backup.factoryResetTitle')}
        description={t('backup.factoryResetDescription')}
      >
        <div className="w-full">
          <Button type="button" variant="destructive" className="w-full flex items-center justify-center gap-2" onClick={() => setShowResetDialog(true)}>
            <RotateCcw className="h-4 w-4" />
            {t('backup.factoryResetButton')}
          </Button>
        </div>
      </SettingsSection>

      <ConfirmationDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onConfirm={handleFactoryReset}
        title={t('confirmation.resetTitle')}
        description={t('confirmation.resetDescription')}
        confirmLabel={t('buttons.resetEverything')}
        cancelLabel={t('buttons.cancel')}
      />
    </div>
  )
}