// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes a tag name to a consistent kebab-case format.
 * - Converts to lowercase.
 * - Replaces spaces and underscores with hyphens.
 * - Removes any characters that are not alphanumeric or hyphens.
 * - Trims leading/trailing hyphens.
 * - Collapses multiple consecutive hyphens into a single hyphen.
 *
 * @param tagName The raw tag name string.
 * @returns The normalized tag name.
 *
 * @example
 * normalizeTagName("Tag Name")       // "tag-name"
 * normalizeTagName("Modem")          // "modem"
 * normalizeTagName("Cellular Phone Eclipse") // "cellular-phone-eclipse"
 * normalizeTagName("  LeadingSpaces ") // "leadingspaces" (or "leading-spaces" if you want to keep spaces as separators)
 * normalizeTagName("Tag_Name_With_Underscores") // "tag-name-with-underscores"
 * normalizeTagName("Special!@#Chars") // "special-chars"
 * normalizeTagName("Multiple -- Hyphens") // "multiple-hyphens"
 */
export function normalizeTagName(tagName: string): string {
  if (!tagName || typeof tagName !== "string") {
    return "";
  }

  const normalized = tagName
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace one or more spaces with a single hyphen
    .replace(/_/g, "-") // Replace underscores with hyphens
    .replace(/[^\w-]+/g, "") // Remove any character that is not a word character (alphanumeric) or a hyphen
    // \w is equivalent to [a-zA-Z0-9_], but we already replaced underscores.
    // So this effectively removes non-alphanumeric characters except hyphens.
    .replace(/--+/g, "-"); // Replace multiple hyphens with a single hyphen

  // Optional: Trim leading/trailing hyphens that might result from punctuation at the start/end
  // For example, if input was "!Tag-", it would become "tag-", this would make it "tag"
  // However, "tag-" might be a valid desired output if it was intentional.
  // Decide if this step is necessary based on your requirements.
  // If you want to ensure it never starts or ends with a hyphen:
  return normalized.replace(/^-+|-+$/g, "");
}
