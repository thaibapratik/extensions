import fetch from "node-fetch";

async function run() {
  try {
    const res = await fetch("https://www.sharesansar.com/live-trading");
    console.log(res.status);
  } catch (e) {
    console.error(e);
  }
}
run();
