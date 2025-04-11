import { expect, Page, Locator } from "@playwright/test";
import { step } from "../utils/steps-configuration";

export class TodoPage {
  readonly page: Page;
  readonly inputNewTodo: Locator;
  readonly todoItems: Locator;
  readonly toggle: Locator;
  readonly deleteItemIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputNewTodo = page.getByPlaceholder("What needs to be done?");
    this.todoItems = page.locator(".todo-list li");
    this.toggle = page.locator("input.toggle");
    this.deleteItemIcon = page.locator("button.destroy");
  }

  @step("Filter todos by: {0}")
  async filterBy(name: "All" | "Active" | "Completed") {
    await this.page.getByRole("link", { name }).click();
  }

  @step("Add todo: {0}")
  async addTodo(todoText: string) {
    await expect(this.inputNewTodo).toBeVisible({ timeout: 1000 });
    await this.inputNewTodo.fill(todoText);
    await this.page.keyboard.press("Enter");
  }

  @step("Expect total todo count to be: {0}")
  async expectTodoCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }

  @step("Expect visible todos count to be: {0}")
  async expectVisibleTodosCount(count: number) {
    const visibleItems = this.todoItems.filter({
      has: this.page.locator("label"),
    });
    await expect(visibleItems).toHaveCount(count);
  }

  @step("Expect todo at index {0} to contain text: {1}")
  async expectTodoAt(index: number, expectedText: string) {
    await expect(this.todoItems.nth(index)).toContainText(expectedText);
  }

  @step("Edit todo at index {0} with new text: {1}")
  async editTodoAt(index: number, newText: string) {
    const todoItem = this.todoItems.nth(index);
    await todoItem.dblclick();

    const editInput = todoItem.locator(".edit");
    await editInput.fill(newText);
    await editInput.press("Enter");
  }

  @step("Complete todo at index: {0}")
  async completeTodoAt(index: number) {
    const checkbox = this.todoItems.nth(index).locator(this.toggle);
    await checkbox.check();
  }

  @step("Verify todo at index {0} is marked as completed")
  async isTodoCompleted(index: number) {
    const todo = this.todoItems.nth(index);
    await expect(todo).toHaveClass(/completed/);
  }

  @step("Delete todo at index: {0}")
  async deleteTodoAt(index: number) {
    const item = this.todoItems.nth(index);
    await item.hover(); // Required to make the delete button visible

    const deleteButton = item.locator(this.deleteItemIcon);
    await deleteButton.click();
  }
}
