import { test, expect } from '@playwright/test';

test.describe('Portfolio Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct page title and meta attributes', async ({ page }) => {
    await expect(page).toHaveTitle(/Michael Henry \| Full Stack Engineer/i);
  });

  test('renders hero section with profile and headings', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Michael Henry/i, level: 1 });
    await expect(heading).toBeVisible();

    const profileImg = page.getByAltText(/Michael Henry - Full Stack Software Engineer/i);
    await expect(profileImg).toBeVisible();
  });

  test('renders navigation action buttons and smoothly scrolls', async ({ page }) => {
    const aboutBtn = page.getByRole('button', { name: /More About Me/i });
    await expect(aboutBtn).toBeVisible();

    const resumeBtn = page.getByRole('button', { name: /View Resume/i });
    await expect(resumeBtn).toBeVisible();

    const contactBtn = page.getByRole('button', { name: /Get In Touch/i });
    await expect(contactBtn).toBeVisible();

    // Clicking "Get In Touch" triggers scroll toward contact section
    await contactBtn.click();
    await expect.poll(async () => {
      return page.evaluate(() => window.scrollY);
    }, { timeout: 7000 }).toBeGreaterThan(50);
  });

  test('renders skills and about sections', async ({ page }) => {
    await expect(page.locator('#about')).toBeAttached();
    await expect(page.getByText(/About Me/i).first()).toBeVisible();
  });
});
