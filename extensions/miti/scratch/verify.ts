/**
 * Quick verification of date conversion accuracy.
 * Run with: npx tsx scratch/verify.ts
 */
const { adToBs, bsToAd, getTodayBs, formatBsDate, formatAdDate } = require("../dist/utils/nepali-date");

console.log("═══════════════════════════════════════");
console.log("  Nepali Date Conversion Verification  ");
console.log("═══════════════════════════════════════\n");

// Test 1: Reference point - 1 Baishakh 2000 BS = 14 April 1943 AD
const test1 = adToBs(1943, 4, 14);
console.log("Test 1: Reference point");
console.log(`  AD 14 April 1943 → BS ${formatBsDate(test1)}`);
console.log(`  Expected: 1 Baishakh 2000`);
console.log(`  ${test1.year === 2000 && test1.month === 1 && test1.day === 1 ? "✅ PASS" : "❌ FAIL"}\n`);

// Test 2: 1 Baishakh 2083 BS = 14 April 2026 AD
const test2 = adToBs(2026, 4, 14);
console.log("Test 2: New Year 2083");
console.log(`  AD 14 April 2026 → BS ${formatBsDate(test2)}`);
console.log(`  Expected: 1 Baishakh 2083`);
console.log(`  ${test2.year === 2083 && test2.month === 1 && test2.day === 1 ? "✅ PASS" : "❌ FAIL"}\n`);

// Test 3: Round-trip — today AD → BS → AD should match
const today = new Date();
const todayBs = getTodayBs();
const roundTrip = bsToAd(todayBs.year, todayBs.month, todayBs.day);
const match = today.getFullYear() === roundTrip.getFullYear()
  && today.getMonth() === roundTrip.getMonth()
  && today.getDate() === roundTrip.getDate();
console.log("Test 3: Round-trip (today)");
console.log(`  Today AD: ${formatAdDate(today)}`);
console.log(`  → BS: ${formatBsDate(todayBs)}`);
console.log(`  → AD: ${formatAdDate(roundTrip)}`);
console.log(`  ${match ? "✅ PASS" : "❌ FAIL"}\n`);

// Test 4: BS → AD for a known date
const test4 = bsToAd(2080, 10, 15);
console.log("Test 4: BS 2080-10-15 → AD");
console.log(`  BS 15 Magh 2080 → AD ${formatAdDate(test4)}`);
console.log(`  Expected: 29 January 2024`);
console.log(`  ${test4.getDate() === 29 && test4.getMonth() === 0 && test4.getFullYear() === 2024 ? "✅ PASS" : "❌ FAIL"}\n`);

console.log("═══════════════════════════════════════");
