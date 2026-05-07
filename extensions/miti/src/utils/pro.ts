/**
 * Freemium Gating — Pro API Key Validation
 *
 * Placeholder functions that simulate a backend check.
 * In production, validateProApiKey would hit a real endpoint.
 */

import { LocalStorage, getPreferenceValues } from "@raycast/api";

const PRO_STORAGE_KEY = "nepali-patro-pro-validated";

/**
 * Gumroad Product ID for Miti Pro
 */
const GUMROAD_PRODUCT_ID = "Z7zIVUP1mNCpro3WyK4Mtw==";

/**
 * Validate a Pro API key against the Gumroad License API.
 */
export async function validateProApiKey(key: string): Promise<boolean> {
  try {
    const response = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: GUMROAD_PRODUCT_ID,
        license_key: key.trim(),
      }),
    });

    const data = (await response.json()) as { success: boolean };

    if (data.success) {
      // Mark as validated in cache so we don't hit the API on every single keystroke/render
      await LocalStorage.setItem(PRO_STORAGE_KEY, "true");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Failed to validate Gumroad license:", error);
    return false;
  }
}

/**
 * Check if the current user has a validated Pro key.
 * First checks LocalStorage cache, then validates the preference key.
 */
export async function isProUser(): Promise<boolean> {
  // Check cache first
  const cached = await LocalStorage.getItem<string>(PRO_STORAGE_KEY);
  if (cached === "true") return true;

  // Check preferences
  try {
    const prefs = getPreferenceValues<{ proApiKey?: string }>();
    if (prefs.proApiKey) {
      return await validateProApiKey(prefs.proApiKey);
    }
  } catch {
    // Preferences not available
  }

  return false;
}

/** Clear the Pro validation cache (for testing/logout). */
export async function clearProCache(): Promise<void> {
  await LocalStorage.removeItem(PRO_STORAGE_KEY);
}
