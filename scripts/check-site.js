// Checks that the status page's site files exist and are not empty.
const fs = require("fs");
const parseArgs = require("minimist");

const args = parseArgs(process.argv.slice(2), { string: ["dir"], default: { dir: "site" } });
const required = ["index.html", "app.js"];
let failed = false;

for (const file of required) {
  const path = `${args.dir}/${file}`;
  if (!fs.existsSync(path) || fs.statSync(path).size === 0) {
    console.error(`missing or empty: ${path}`);
    failed = true;
  } else {
    console.log(`ok: ${path}`);
  }
}

process.exit(failed ? 1 : 0);
