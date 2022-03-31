const fs = require("fs");
const process = require("process");
const axios = require("axios");
const { createCipheriv } = require("crypto");

function cat(path) {
  fs.readFile(path, "utf8", function(err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`File contents: ${data}`);
  });
}

async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.log(`Could not fetch: ${err}`);
    process.exit(1);
  }
}

let path = process.argv[2];

console.log(path);

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
