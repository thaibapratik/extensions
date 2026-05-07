import fetch from "node-fetch";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false
});

async function run() {
  try {
    const res = await fetch("https://www.nepalstock.com.np/api/nots/nepse-index", { agent });
    console.log(res.status);
    const data = await res.text();
    console.log(data.substring(0, 500));
  } catch (e) {
    console.error(e);
  }
}

run();
