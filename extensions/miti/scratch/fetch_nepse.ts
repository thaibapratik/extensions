import fetch from "node-fetch";

async function run() {
  try {
    const res = await fetch("https://nepsealpha.com/api/smx9156631/v1/garuda/real-time/live");
    console.log(res.status);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

run();
