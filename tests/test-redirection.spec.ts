import fs from "fs";
import path from "path";
import { test } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(
  fs.readFileSync(path.join(__dirname, "../", "input.csv")),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

for (const record of records) {
  const [from, to] = Object.values(record);
  test(`From: ${from}, To: ${to}`, async ({ page }) => {
    await page.goto(from as string);
    await page.waitForURL(to as string);
  });
}
