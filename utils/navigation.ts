// utils/navigation.ts
import { Page } from "@playwright/test";

export async function goToTodoApp(page: Page): Promise<void> {
  await page.goto('');
}
