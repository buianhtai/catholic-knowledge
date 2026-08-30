import { expect, test } from '@playwright/test';

const criticalRoutes = [
  '/',
  '/kham-pha',
  '/scripture',
  '/doctrine',
  '/places',
  '/ask',
  '/timeline',
  '/liturgy',
  '/kids',
  '/saints/augustine-of-hippo',
  '/hanh-trinh/tu-chua-giesu-den-nixea',
];

const viewportMatrix = [
  { name: 'narrow-mobile', width: 320, height: 568 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

for (const viewport of viewportMatrix) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of criticalRoutes) {
      test(`${route} stays inside the viewport`, async ({ page }) => {
        const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
        expect(response?.ok(), `${route} should return a successful response`).toBeTruthy();

        await expect(page.locator('body')).toBeVisible();

        const metrics = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
          bodyWidth: document.body.scrollWidth,
        }));

        expect(metrics.documentWidth, `${route} document overflow at ${viewport.width}px`).toBeLessThanOrEqual(metrics.viewportWidth + 1);
        expect(metrics.bodyWidth, `${route} body overflow at ${viewport.width}px`).toBeLessThanOrEqual(metrics.viewportWidth + 1);
      });
    }
  });
}
