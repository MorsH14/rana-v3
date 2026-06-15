import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = { name: 'rana-session', value: 'preview', domain: 'localhost', path: '/' };

const worker = JSON.stringify({ name: "Ayodele Oluwaseyi", location: "Ilorin, Kwara State", profileImage: "", notifications: 5, role: "UX/UI Designer", email: "a@a.com", phone: "0804", verified: true, verifiedDate: "2025-01-01T00:00:00.000Z", jobsPosted: 12, coinsLeft: 300, accountType: "worker" });
const client = JSON.stringify({ name: "Tunde Adeyemi", location: "Lagos, Lagos State", profileImage: "", notifications: 2, role: "Product Manager", email: "t@t.com", phone: "0802", verified: false, verifiedDate: "", jobsPosted: 0, coinsLeft: 0, accountType: "client" });

// Worker mobile
const workerCtx = await browser.newContext();
await workerCtx.addCookies([base]);
const wp = await workerCtx.newPage();
await wp.setViewportSize({ width: 390, height: 844 });
await wp.goto('http://localhost:3000').catch(() => {});
await wp.evaluate((d) => localStorage.setItem('rana-user-profile', d), worker);
await wp.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
await wp.screenshot({ path: 'C:/tmp/role-worker-mobile.png' });

// Worker desktop
const wdp = await workerCtx.newPage();
await wdp.setViewportSize({ width: 1280, height: 800 });
await wdp.goto('http://localhost:3000').catch(() => {});
await wdp.evaluate((d) => localStorage.setItem('rana-user-profile', d), worker);
await wdp.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
await wdp.screenshot({ path: 'C:/tmp/role-worker-desktop.png' });

// Client mobile
const clientCtx = await browser.newContext();
await clientCtx.addCookies([base]);
const cp = await clientCtx.newPage();
await cp.setViewportSize({ width: 390, height: 844 });
await cp.goto('http://localhost:3000').catch(() => {});
await cp.evaluate((d) => localStorage.setItem('rana-user-profile', d), client);
await cp.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
await cp.screenshot({ path: 'C:/tmp/role-client-mobile.png' });

await browser.close();
