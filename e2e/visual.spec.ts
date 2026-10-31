import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const ARTIFACT_MEDIA_DIR = '/Users/mhenry/.gemini/antigravity/brain/2a438a9c-a258-4ade-9833-2855c112d203/media';

test.describe('Visual Showcase & Media Capture', () => {
  test.beforeAll(() => {
    if (!fs.existsSync(ARTIFACT_MEDIA_DIR)) {
      fs.mkdirSync(ARTIFACT_MEDIA_DIR, { recursive: true });
    }
  });

  test('capture showcase tour, custom turnstile and real form submission', async ({ page }, testInfo) => {
    // 1. Visit homepage
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Michael Henry/i })).toBeVisible();

    const projectName = testInfo.project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // 2. Hero screenshot
    await page.screenshot({
      path: path.join(ARTIFACT_MEDIA_DIR, `${projectName}-1-hero.png`),
      fullPage: false,
    });

    // 3. Smooth scroll down to Contact form
    const contactBtn = page.getByRole('button', { name: /Get In Touch/i });
    if (await contactBtn.isVisible()) {
      await contactBtn.click();
      await page.waitForTimeout(1000);
    }

    // 4. Fill out form fields
    await page.locator('#firstName').fill('Alex');
    await page.locator('#lastName').fill('Morgan');
    await page.locator('#email').fill('alex.morgan@example.com');
    await page.locator('#phoneNumber').fill('+1 (555) 234-5678');
    await page.locator('#message').fill('Hello Michael! Testing the end-to-end contact flow with the custom Cloudflare Turnstile card.');

    await page.waitForTimeout(600);

    // 5. Scroll to custom Turnstile card and capture initial state
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    await page.screenshot({
      path: path.join(ARTIFACT_MEDIA_DIR, `${projectName}-2-turnstile-initial.png`),
      fullPage: false,
    });

    // 6. Complete Turnstile verification
    await page.evaluate(() => {
      (window as unknown as { __setTurnstileToken?: (t: string) => void }).__setTurnstileToken?.('mock-turnstile-token');
    });

    await page.waitForTimeout(600);

    // 7. Capture verified Turnstile card with emerald glowing border & verified pill
    await page.screenshot({
      path: path.join(ARTIFACT_MEDIA_DIR, `${projectName}-3-turnstile-verified.png`),
      fullPage: false,
    });

    // 8. Submit the form to actual API endpoint
    const submitBtn = page.getByRole('button', { name: /Send Message/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // 9. Await real API response and successful confirmation screen
    await expect(page.getByText(/Message Sent!/i)).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(800);

    // 10. Capture success confirmation screenshot
    await page.screenshot({
      path: path.join(ARTIFACT_MEDIA_DIR, `${projectName}-4-success-screen.png`),
      fullPage: false,
    });

    // 11. Full page overview
    await page.screenshot({
      path: path.join(ARTIFACT_MEDIA_DIR, `${projectName}-5-fullpage.png`),
      fullPage: true,
    });

    // 12. Save walkthrough video
    const video = page.video();
    if (video) {
      await page.close();
      const videoDestination = path.join(ARTIFACT_MEDIA_DIR, `${projectName}-walkthrough.webm`);
      await video.saveAs(videoDestination);
    }
  });
});
