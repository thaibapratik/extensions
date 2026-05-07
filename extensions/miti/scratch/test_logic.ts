
import { getTodayBs, formatBsDate, parseBs, differenceInBsYMD } from "../src/utils/nepali-date";

try {
  const today = getTodayBs();
  console.log("Today:", formatBsDate(today));
  
  const testParse = parseBs("Baishakh 12 2072");
  console.log("Parsed:", testParse);
  
  if (testParse) {
    const diff = differenceInBsYMD(testParse, today);
    console.log("Diff:", diff);
  }
} catch (e) {
  console.error("Crash during logic test:", e);
  process.exit(1);
}
