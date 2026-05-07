import * as cheerio from "cheerio";
// @ts-ignore
import fetch from "node-fetch";

async function testScrape() {
  const res = await fetch("https://merolagani.com/LatestMarket.aspx");
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const stocks: any[] = [];
  $("table.table-hover tbody tr").each((i, el) => {
    const symbol = $(el).find("td:nth-child(1)").text().trim();
    const ltp = $(el).find("td:nth-child(2)").text().trim();
    const percentageChange = $(el).find("td:nth-child(3)").text().trim();
    const open = $(el).find("td:nth-child(4)").text().trim();
    const high = $(el).find("td:nth-child(5)").text().trim();
    const low = $(el).find("td:nth-child(6)").text().trim();
    const qty = $(el).find("td:nth-child(7)").text().trim();
    
    if (symbol) {
      stocks.push({ symbol, ltp, percentageChange, open, high, low, qty });
    }
  });
  
  const index = $("#ctl00_ContentPlaceHolder1_CompanyDetail1_lblNepseIndex").text().trim() || $(".nepse-index").text().trim();
  const indexValue = $(".live-index-values").first().text().trim();
  const indexChange = $(".live-index-change").first().text().trim();
  
  // Alternative way to find NEPSE index in the header/top bar
  const topNepse = $(".market-summary .index-val").first().text().trim();
  
  console.log("NEPSE Index raw:", index, indexValue, indexChange, topNepse);
  
  // Let's look for any element containing "NEPSE" and a number near it
  $(":contains('NEPSE')").each((i, el) => {
    const text = $(el).text();
    if (text.includes("Index") && /[0-9]/.test(text)) {
      console.log("Potential NEPSE element:", text.substring(0, 50));
    }
  });
}

testScrape().catch(console.error);
