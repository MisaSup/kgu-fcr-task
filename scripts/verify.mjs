import { chromium } from "playwright";

const URL = "http://localhost:3000/";

const browser = await chromium.launch();

// --- Сценарий 1: успех ---
{
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: "networkidle" });

  const title = await page.locator("h1").textContent();
  const resultBox = page.locator("section > div").first();
  const initialText = (await resultBox.textContent())?.trim();

  await page.locator("button").click();

  // спиннер появляется, пока идёт запрос
  const spinnerVisible = await page
    .locator("[role='status']")
    .waitFor({ state: "visible", timeout: 5000 })
    .then(() => true)
    .catch(() => false);

  // результат — IP-адрес
  await page.waitForFunction(
    () => {
      const el = document.querySelector("section");
      return el ? /\d{1,3}(\.\d{1,3}){3}/.test(el.textContent) : false;
    },
    { timeout: 20000 },
  );
  const ipText = (await resultBox.textContent())?.trim();

  // CSS-модули: у result-box должен быть тёмный фон из :root-переменной --card
  const resultBg = await resultBox.evaluate((el) =>
    getComputedStyle(el).backgroundColor,
  );
  const buttonBg = await page
    .locator("button")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  const moduleClass = await resultBox.getAttribute("class");

  await page.screenshot({ path: "scripts/artifacts/re-01-success.png" });

  console.log(
    JSON.stringify(
      {
        scenario: "success",
        title,
        initialText,
        spinnerVisible,
        ipText,
        resultBg,
        buttonBg,
        moduleClass,
        pageErrors: errors,
      },
      null,
      2,
    ),
  );
  await page.close();
}

// --- Сценарий 2: ошибка (API недоступен) ---
{
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.route("**/api.ipify.org/**", (route) => route.abort());
  await page.goto(URL, { waitUntil: "networkidle" });

  const resultBox = page.locator("section > div").first();
  await page.locator("button").click();

  await page.waitForFunction(
    () => {
      const el = document.querySelector("section");
      return el ? /ошибка/i.test(el.textContent) : false;
    },
    { timeout: 20000 },
  );
  const errorText = (await resultBox.textContent())?.trim();
  const errorColor = await resultBox.evaluate((el) =>
    getComputedStyle(el).color,
  );

  await page.screenshot({ path: "scripts/artifacts/re-01-error.png" });

  console.log(
    JSON.stringify(
      {
        scenario: "error",
        errorText,
        errorColor,
        pageErrors: errors,
      },
      null,
      2,
    ),
  );
  await page.close();
}

await browser.close();
