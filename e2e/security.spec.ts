import { test, expect } from '@playwright/test';

test.describe('Security & Hardening Audits', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('form inputs enforce input constraints and autocomplete tokens', async ({ page }) => {
    const firstName = page.locator('#firstName');
    await expect(firstName).toHaveAttribute('autocomplete', 'given-name');
    await expect(firstName).toHaveAttribute('required');

    const lastName = page.locator('#lastName');
    await expect(lastName).toHaveAttribute('autocomplete', 'family-name');
    await expect(lastName).toHaveAttribute('required');

    const email = page.locator('#email');
    await expect(email).toHaveAttribute('autocomplete', 'email');
    await expect(email).toHaveAttribute('type', 'email');
    await expect(email).toHaveAttribute('required');

    const phone = page.locator('#phoneNumber');
    await expect(phone).toHaveAttribute('autocomplete', 'tel');
    await expect(phone).toHaveAttribute('type', 'tel');
    await expect(phone).toHaveAttribute('required');

    const message = page.locator('#message');
    await expect(message).toHaveAttribute('required');
    await expect(message).toHaveAttribute('minlength', '5');
    await expect(message).toHaveAttribute('maxlength', '1000');
  });

  test('no sensitive secrets or environment keys are leaked into page HTML', async ({ page }) => {
    const content = await page.content();
    // Secret keys should never exist in the client DOM
    if (process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
      expect(content).not.toContain(process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
    }
    expect(content).not.toContain('BREVO_API_KEY');
    expect(content).not.toContain('CLOUDFLARE_TURNSTILE_SECRET_KEY');
  });
});
