import fetch from "node-fetch";

async function testApi() {
  try {
    const res = await fetch("https://nepsealpha.com/api/sm/market-watch");
    const data = await res.json();
    console.log("Success! Found " + data.length + " stocks.");
    console.log("First stock:", data[0]);
  } catch (err) {
    console.error("Failed to fetch:", err.message);
  }
}

testApi();
