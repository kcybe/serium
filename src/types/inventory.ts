export interface InventoryItem {
  id: string
  name: string
  sku: string | number
  quantity: number
  price: number
  category: string
  status: string
  description: string
  location: string
  lastVerified?: Date | null
  isVerified?: boolean
  customFields?: Record<string, string | number | boolean>
}

export interface AddItemFormValues {
  name: string
  sku: string
  quantity: number
  price: number
  category: string
  status: string
  description: string
  location: string
}