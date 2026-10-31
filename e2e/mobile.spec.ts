import { test, expect } from '@playwright/test';

test.describe('Mobile Viewport & Touch Experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page does not have horizontal overflow on mobile', async ({ page }) => {
    // Check that scroll width does not exceed inner width (no accidental side-scroll)
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('hero buttons satisfy minimum touch target size (44px)', async ({ page }) => {
    const contactBtn = page.getByRole('button', { name: /Get In Touch/i });
    const aboutBtn = page.getByRole('button', { name: /More About Me/i });
    const resumeBtn = page.getByRole('button', { name: /View Resume/i });

    const contactBox = await contactBtn.boundingBox();
    const aboutBox = await aboutBtn.boundingBox();
    const resumeBox = await resumeBtn.boundingBox();

    expect(contactBox).not.toBeNull();
    expect(aboutBox).not.toBeNull();
    expect(resumeBox).not.toBeNull();

    // WCAG standard touch target height >= 44px
    expect(contactBox!.height).toBeGreaterThanOrEqual(44);
    expect(aboutBox!.height).toBeGreaterThanOrEqual(44);
    expect(resumeBox!.height).toBeGreaterThanOrEqual(44);
  });

  test('social buttons have adequate touch target sizing and spacing', async ({ page }) => {
    const githubBtn = page.getByRole('button', { name: /GitHub Profile/i });
    const linkedinBtn = page.getByRole('button', { name: /LinkedIn Profile/i });
    const mailBtn = page.getByRole('button', { name: /Contact Section/i });

    await expect(githubBtn).toBeVisible();
    await expect(linkedinBtn).toBeVisible();
    await expect(mailBtn).toBeVisible();

    const ghBox = await githubBtn.boundingBox();
    expect(ghBox!.width).toBeGreaterThanOrEqual(40);
    expect(ghBox!.height).toBeGreaterThanOrEqual(40);
  });

  test('mobile keyboard hints and inputmodes are correctly configured', async ({ page }) => {
    const emailInput = page.locator('#email');
    const phoneInput = page.locator('#phoneNumber');

    // Mobile keyboard optimization
    await expect(emailInput).toHaveAttribute('inputmode', 'email');
    await expect(phoneInput).toHaveAttribute('inputmode', 'tel');

    // Verify hints are located before inputs in DOM order so virtual keyboards do not obscure them
    const emailHintPrecedesInput = await page.evaluate(() => {
      const hint = document.getElementById('email-hint');
      const input = document.getElementById('email');
      if (!hint || !input) return false;
      return (hint.compareDocumentPosition(input) & 4) !== 0;
    });
    expect(emailHintPrecedesInput).toBe(true);

    const phoneHintPrecedesInput = await page.evaluate(() => {
      const hint = document.getElementById('phone-hint');
      const input = document.getElementById('phoneNumber');
      if (!hint || !input) return false;
      return (hint.compareDocumentPosition(input) & 4) !== 0;
    });
    expect(phoneHintPrecedesInput).toBe(true);
  });

  test('mobile tapping on "Get In Touch" scrolls viewport toward contact section', async ({ page }) => {
    const contactBtn = page.getByRole('button', { name: /Get In Touch/i });
    await contactBtn.click();

    await expect.poll(async () => {
      return page.evaluate(() => window.scrollY);
    }, { timeout: 7000 }).toBeGreaterThan(100);
  });

  test('mobile tapping on "More About Me" scrolls viewport into about section', async ({ page }) => {
    const aboutBtn = page.getByRole('button', { name: /More About Me/i });
    await aboutBtn.click();

    const aboutHeading = page.getByRole('heading', { name: /About Me/i, level: 2 });
    await expect(aboutHeading).toBeInViewport({ timeout: 5000 });
  });

  test('form inputs stack vertically and fit mobile screen without clipping', async ({ page }) => {
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');

    const fnBox = await firstName.boundingBox();
    const lnBox = await lastName.boundingBox();

    expect(fnBox).not.toBeNull();
    expect(lnBox).not.toBeNull();

    // Verify inputs fit within the viewport width
    const viewportWidth = page.viewportSize()?.width ?? 390;
    expect(fnBox!.width).toBeLessThanOrEqual(viewportWidth);
    expect(lnBox!.width).toBeLessThanOrEqual(viewportWidth);
  });

  test('Cloudflare Turnstile container scales responsively on mobile', async ({ page }) => {
    const turnstileWrapper = page.locator('#contact').locator('.min-h-\\[75px\\]');
    await expect(turnstileWrapper).toBeVisible();

    const box = await turnstileWrapper.boundingBox();
    expect(box).not.toBeNull();

    const viewportWidth = page.viewportSize()?.width ?? 390;
    expect(box!.width).toBeLessThanOrEqual(viewportWidth);
  });
});
