"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { FilterDropdown } from "./filter-dropdown"
import { Button } from "../../ui/button"
import { toast } from "sonner"
import { InventoryItem } from "@/types/inventory"
import { SiteSettings } from "@/types/settings"
import { useTranslation } from "@/hooks/use-translation"

type SearchParameter = "all" | "name" | "sku" | "location" | "description"

interface SearchFilterProps {
    onSearchChange: (value: string, parameter: SearchParameter) => void
    categories: string[]
    statuses: string[]
    selectedCategories: string[]
    selectedStatuses: string[]
    onCategoriesChange: (categories: string[]) => void
    onStatusesChange: (statuses: string[]) => void
    onClearFilters: () => void  // Add this prop
    data: InventoryItem[]
    onVerify: (id: string, source?: 'scan' | 'button') => void
    settings: SiteSettings  // Add this prop
}
  
export function SearchFilter({ 
    onSearchChange, 
    categories,
    statuses,
    selectedCategories,
    selectedStatuses,
    onCategoriesChange,
    onStatusesChange,
    onClearFilters,
    data,
    onVerify,
    settings
}: SearchFilterProps) {
  const { t } = useTranslation(settings || { language: 'en' } as SiteSettings)
  const [searchParam, setSearchParam] = useState<SearchParameter>("all")
  const [searchValue, setSearchValue] = useState<string>("")
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Refs to always have the latest data and verify callback.
  const dataRef = useRef(data);
  const onVerifyRef = useRef(onVerify);
  useEffect(() => {
    dataRef.current = data;
    onVerifyRef.current = onVerify;
  }, [data, onVerify]);

  // Define a scanning state that controls the barcode scanning process.
  // isScanning: indicates an active scan;
  // buffer: accumulates scanned key characters.
  const [scanningState, setScanningState] = useState<{ isScanning: boolean; buffer: string }>({
    isScanning: false,
    buffer: ""
  });
  // A ref to always have the latest scanning state (to avoid stale closures in the event listener).
  const scanningStateRef = useRef(scanningState);
  useEffect(() => {
    scanningStateRef.current = scanningState;
  }, [scanningState]);

  // Use a ref for last key time for measuring pause between keys.
  const lastKeyTimeRef = useRef<number>(Date.now());
  const BUFFER_TIMEOUT = 100;

  // Derive a stable flag for scan verification.
  const isScanVerificationEnabled = !!(
    settings.features?.itemVerification &&
    settings.features?.scanToVerify
  );

  useEffect(() => {
    if (!isScanVerificationEnabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore key presses if focused in an input/textarea.
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        return;

      const currentTime = Date.now();

      // If too much time has elapsed or no scan in progress, start a new scanning session.
      if (currentTime - lastKeyTimeRef.current > BUFFER_TIMEOUT || !scanningStateRef.current.isScanning) {
        setScanningState({ isScanning: true, buffer: e.key });
        scanningStateRef.current = { isScanning: true, buffer: e.key };
      } else if (e.key === 'Enter' && scanningStateRef.current.isScanning) {
        // Finish scanning and process the buffered scanning string.
        const scannedSku = scanningStateRef.current.buffer;
        setScanningState({ isScanning: false, buffer: "" });
        scanningStateRef.current = { isScanning: false, buffer: "" };

        const matchingItem = dataRef.current.find(item => String(item.sku) === scannedSku);
        if (matchingItem) {
          onVerifyRef.current(matchingItem.id, 'scan');
        } else {
          toast.error(`No item found with SKU: ${scannedSku}`);
        }
      } else {
        // Otherwise, continue accumulating keys.
        setScanningState(prev => ({ isScanning: true, buffer: prev.buffer + e.key }));
        scanningStateRef.current.buffer += e.key;
      }
      lastKeyTimeRef.current = currentTime;
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isScanVerificationEnabled]);

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Add keyboard shortcut handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      
      // Press '/' to focus search
      if (e.key === '/') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleSearchChange = (value: string) => {
    // Remove the sanitization or use a more permissive one that allows Hebrew
    setSearchValue(value)
    
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set a new timeout
    typingTimeoutRef.current = setTimeout(() => {
      onSearchChange(value, searchParam)
    }, 200) // 200ms delay
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  const handleParameterChange = (param: SearchParameter) => {
    setSearchParam(param)
    onSearchChange(searchValue, param)
  }

  const handleClearAll = () => {
    setSearchValue("")
    setSearchParam("all")
    onClearFilters()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder={t('general.searchPlaceholder')}
            className="pl-8"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Select value={searchParam} onValueChange={handleParameterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Search by..." />
          </SelectTrigger>
          <SelectContent>
              <SelectItem value="all">{t('filters.all')}</SelectItem>
              <SelectItem value="name">{t('filters.name')}</SelectItem>
              <SelectItem value="sku">{t('filters.sku')}</SelectItem>
              <SelectItem value="location">{t('filters.location')}</SelectItem>
              <SelectItem value="description">{t('filters.description')}</SelectItem>
              </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          onClick={handleClearAll}
          className="flex items-center gap-2"
          disabled={!searchValue && selectedCategories.length === 0 && selectedStatuses.length === 0}
        >
          {t('general.clearFiltersButton')}
        </Button>
      </div>
      <div className="flex gap-2">
        <FilterDropdown
          title={t('table.categoriesTitle')}
          options={categories}
          selectedOptions={selectedCategories}
          onSelectionChange={onCategoriesChange}
        />
        <FilterDropdown
          title={t('table.statusesTitle')}
          options={statuses}
          selectedOptions={selectedStatuses}
          onSelectionChange={onStatusesChange}
        />
      </div>
    </div>
  )
}