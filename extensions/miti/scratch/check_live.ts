
// @ts-ignore
import fetch from "node-fetch";
import * as cheerio from "cheerio";

async function test() {
  try {
    const indexRes = await fetch("https://merolagani.com/Indices.aspx");
    const indexHtml = await indexRes.text();
    const $index = cheerio.load(indexHtml);
    const table = $index("table");
    console.log("Table rows:", table.find("tr").length);
    
    const firstRow = $index("table tr").eq(1).find("td");
    const indexData = {
      name: firstRow.eq(0).text().trim(),
      index: firstRow.eq(2).text().trim(),
      change: firstRow.eq(3).text().trim(),
      percentageChange: firstRow.eq(4).text().trim(),
      date: firstRow.eq(1).text().trim(),
    };
    console.log("Index Data:", indexData);

    const summaryRes = await fetch("https://merolagani.com/handlers/webrequesthandler.ashx?type=market_summary");
    const summaryJson = await summaryRes.json() as any;
    console.log("Summary overall:", summaryJson.overall);
  } catch (e) {
    console.error(e);
  }
}

test();
