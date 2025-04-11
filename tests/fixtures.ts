// fixtures/baseFixture.ts
import { test as base } from "@playwright/test";
import { TodoPage } from "../page-objects/TodoPage";

type TestFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<TestFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await use(todoPage);
  },
});

export { expect } from "@playwright/test";
