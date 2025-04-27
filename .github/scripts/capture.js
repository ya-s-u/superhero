import fs from 'fs';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

// 1. イベントpayloadからissueタイトルを取得
const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const url = event.issue.title.trim();

if (!url.startsWith('http')) {
  console.error('Issue title must be a valid URL.');
  process.exit(1);
}

// 2. data.jsonを読み込んで、既に存在するかチェック
const dataPath = 'data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

if (data.some(item => item.url === url)) {
  console.log('URL already exists in data.json, skipping.');
  process.exit(0);
}

// 3. ScreenshotOneでスクショを取得（通常）
const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY;
const captureUrl = `https://api.screenshotone.com/take?access_key=${accessKey}&url=${encodeURIComponent(url)}&format=jpg&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=0&timeout=60&dark_mode=false&response_type=by_format&image_quality=80`;
const captureDarkUrl = `https://api.screenshotone.com/take?access_key=${accessKey}&url=${encodeURIComponent(url)}&format=jpg&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=0&timeout=60&dark_mode=true&response_type=by_format&image_quality=80`;

const host = new URL(url).host;
const savePath = `captures/${host}`;

fs.mkdirSync(savePath, { recursive: true });

const captureImage = async (targetUrl, outputPath) => {
  const res = await fetch(targetUrl);
  if (!res.ok) throw new Error(`Failed to fetch screenshot: ${res.statusText}`);
  const buffer = await res.buffer();
  fs.writeFileSync(outputPath, buffer);
};

// 通常スクショ
await captureImage(captureUrl, `${savePath}/light.jpeg`);
// ダークモードスクショ
await captureImage(captureDarkUrl, `${savePath}/dark.jpeg`);

// 5. URLからtitleとdescriptionを取得
const htmlRes = await fetch(url);
if (!htmlRes.ok) throw new Error(`Failed to fetch page: ${htmlRes.statusText}`);
const htmlText = await htmlRes.text();

const dom = new JSDOM(htmlText);
const title = dom.window.document.querySelector('title')?.textContent?.trim() ?? '';
const description = dom.window.document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

// 6. data.jsonの先頭に追加
const newEntry = { title, description, url };
const updatedData = [newEntry, ...data];
fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));

console.log('Successfully updated data.json and saved screenshots.');
