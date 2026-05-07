import fetch from "node-fetch";

async function run() {
  try {
    const res = await fetch("https://nepse-data-api.vercel.app/data/todaysprice");
    console.log(res.status);
    const data = await res.text();
    console.log(data.substring(0, 200));
  } catch (e) {
    console.error(e);
  }
}

run();
