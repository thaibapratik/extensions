# Miti

**Miti** is a Raycast extension for **Bikram Sambat (Nepali) calendar** workflows on **macOS**: today’s BS date, month navigation, AD ↔ BS conversion, optional Apple Reminders, and NEPSE stock lookup.

> **Platform:** macOS only. Reminders integration uses Apple’s Reminders app (not available on Windows).

---

## Features

### Free (no license required)

| Feature              | Description                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Today & calendar** | Current BS date (English + Devanagari), weekday, interactive month grid                                         |
| **Browse dates**     | Type a day number (e.g. `15`) to jump within the visible month                                                  |
| **Convert dates**    | AD → BS and BS → AD (`DD/MM/YYYY`)                                                                              |
| **Copy dates**       | Copy Nepali date strings to the clipboard                                                                       |
| **Set reminder**     | Create a dated reminder in the macOS **Reminders** app (requires Reminders)                                     |
| **NEPSE Market tab** | Search listed symbols, view LTP/change, favorites, open symbols on [Nepal Stock](https://www.nepalstock.com.np) |

### Miti Pro (paid license)

Some capabilities are **locked behind Miti Pro**. Pro is a **separate product** from the author—not sold through the Raycast Store. You purchase a license elsewhere and enter your **license key** in Raycast to unlock Pro features in this extension.

| Pro feature             | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| **NEPSE live tracker**  | Enhanced live index and market tooling on the dashboard        |
| **Market summary**      | Turnover, volume, transactions, market cap snapshot            |
| **Gold & silver rates** | Daily bullion rates                                            |
| **Menu bar date extra** | Additional menu bar date utilities (when enabled in a release) |

The free **Market** tab may still show stock search and prices without Pro; Pro focuses on the advanced dashboard tools above. If a item shows a lock icon or prompts you to get a license, you need Pro.

---

## Do I need to pay?

**No**, for everyday calendar use (today’s date, conversion, reminders, basic market search).

**Yes**, if you want **Miti Pro** features listed above. The Raycast extension itself is free to install from the Store; Pro is an optional paid upgrade from the developer.

---

## How to activate Miti Pro

1. **Purchase** a license from **Miti Pro** (Gumroad). You’ll receive a license key (often shown as `PATRO-PRO-…` or similar).
2. Open **Raycast** → **Settings** → **Extensions** → **Miti**.
3. Paste your key into **Pro API Key**.
4. Re-open the **Miti** command. The extension validates the key with Gumroad and caches validation locally.

To remove Pro access, clear the key in extension preferences (or use your OS tools to reset Raycast extension data).

---

## Requirements

- **macOS** with [Raycast](https://raycast.com)
- **Reminders** (for “Set Reminder” only)
- **Internet** (for live NEPSE data; calendar math works offline)
- **Miti Pro license** (only for Pro-gated features)

---

## Usage tips

- **Dashboard** — Main calendar, convert date, set reminder; use `⌘` + arrow keys (actions) to change month, `⌘ T` for today.
- **NEPSE Market** — From the dashboard, choose **NEPSE Market** (or use the **NEPSE Market** row under Main). You can also switch views from the dropdown on the right side of the search bar (`⌘ P` focuses it). Star symbols with `⌘ ⇧ F` to add favorites.
- **Set Reminder** — `⌘ ⇧ R` on today or a selected day; pick time in `9:30 AM` style.

---

## Data & privacy

- **Calendar data** is computed locally from a BS lookup table (no account required).
- **NEPSE quotes** are fetched from third-party public pages (e.g. Merolagani) when online; failures may show placeholder values.
- **Pro license keys** are sent to [Gumroad’s license API](https://api.gumroad.com) for verification only; they are stored in Raycast’s encrypted preference storage when configured as a password field.
- This extension does not include third-party analytics.

**Tithi** shown in the almanac section is approximate for display; do not rely on it for religious scheduling without a proper panchang source.

---

## Troubleshooting

| Issue                     | What to try                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| Pro features still locked | Confirm the key in **Extensions → Miti**; re-open the command; check internet for Gumroad validation |
| Reminder failed           | Enable Reminders for Raycast in **System Settings → Privacy & Security**                             |
| Stock prices show `-`     | Network or source site unavailable; try again later                                                  |
| Invalid license           | Ensure you copied the full key from your purchase email or Gumroad library                           |

---

## License

Extension source is **MIT**
