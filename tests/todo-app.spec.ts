import { goToTodoApp } from "../utils/navigation";
import { test } from "../tests/fixtures";
import todoData from "../test-data/todo-test-data.json";

test.describe("Positive tests for new todo items", () => {
  test.beforeEach(async ({ page, todoPage }) => {
    await goToTodoApp(page);
    await test.step("Add initial todo item", async () => {
      await todoPage.addTodo(todoData.todoText);
      await todoPage.expectTodoCount(1);
    });
  });

  test("verify that the new todo item can be added", async ({ todoPage }) => {
    await todoPage.expectTodoAt(0, todoData.todoText);
  });

  test("verify that the todo item can be edited", async ({ todoPage }) => {
    // Edit the item
    await todoPage.editTodoAt(0, todoData.editedTodoText);

    // Verify the edited value
    await todoPage.expectTodoAt(0, todoData.editedTodoText);
  });

  test("verify that the todo item can be completed", async ({ todoPage }) => {
    // Mark it as completed
    await todoPage.completeTodoAt(0);

    // Verify the item is marked as completed
    await todoPage.isTodoCompleted(0);

    // Navigate to Completed filter
    await todoPage.filterBy("Completed");

    // Verify the completed item appears in the filtered list
    await todoPage.expectVisibleTodosCount(1);
    await todoPage.expectTodoAt(0, todoData.todoText);
  });

  test("verify that the todo item can be deleted", async ({ todoPage }) => {
    // Delete the item
    await todoPage.deleteTodoAt(0);

    // Assert list is empty
    await todoPage.expectTodoCount(0);
  });
});