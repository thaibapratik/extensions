import fs from "fs";
// @ts-ignore
import fetch from "node-fetch";

async function run() {
  try {
    const res = await fetch("https://raw.githubusercontent.com/surajrimal07/NepseAPI-Unofficial/main/stockmap.json");
    const data: Record<string, any> = await res.json();
    
    const stocks = [];
    for (const symbol in data) {
      if (symbol === "NEPSE" || symbol.includes("Promoter") || data[symbol].sector === "Promoter Share" || data[symbol].name.includes("Debenture") || data[symbol].name.includes("Bond")) {
        continue; // skip indices, promoters, debentures, bonds for cleaner UI
      }
      
      // Random price between 100 and 3000
      const price = Math.floor(Math.random() * 2900) + 100;
      // Random change between -10% and +10%
      const pChange = (Math.random() * 20 - 10).toFixed(2);
      // Random points
      const pointChange = (parseFloat(pChange) * price / 100).toFixed(2);
      
      stocks.push(`  {
    symbol: "${symbol}",
    name: "${data[symbol].name.replace(/"/g, '\\"')}",
    ltp: "${price}.00",
    pointChange: "${pointChange}",
    percentageChange: "${pChange}",
    high: "${(price * 1.02).toFixed(2)}",
    low: "${(price * 0.98).toFixed(2)}",
    open: "${(price - parseFloat(pointChange)).toFixed(2)}",
    qty: "${Math.floor(Math.random() * 10000)}",
  }`);
    }

    const fileContent = `// Mock data for development
export interface StockData {
  symbol: string;
  name: string;
  ltp: string;
  pointChange: string;
  percentageChange: string;
  high: string;
  low: string;
  open: string;
  qty: string;
}

export const MOCK_DATA: StockData[] = [
${stocks.join(",\n")}
];
`;

    // Replace MOCK_DATA in use-nepse.ts
    const targetFile = "/Users/pratik/Developer/calender/src/utils/use-nepse.ts";
    let content = fs.readFileSync(targetFile, "utf-8");
    
    // Replace everything up to the useNepseStocks definition
    const hookStart = content.indexOf("export function useNepseStocks()");
    if (hookStart !== -1) {
      content = fileContent + "\n" + content.slice(hookStart);
      fs.writeFileSync(targetFile, content);
      console.log("Successfully generated MOCK_DATA with " + stocks.length + " stocks.");
    } else {
      console.log("Could not find hook start.");
    }
  } catch (err) {
    console.error(err);
  }
}

run();
