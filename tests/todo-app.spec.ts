import { goToTodoApp } from "../utils/navigation";
import { test } from "../tests/fixtures";
import todoData from "../test-data/todo-test-data.json";

test.describe("Positive tests for new todo items", { tag: ['@positive', '@smoke'] }, () => {
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
    await todoPage.editTodoAt(0, todoData.editedTodoText);
    await todoPage.expectTodoAt(0, todoData.editedTodoText);
  });

  test("verify that the todo item can be completed", async ({ todoPage }) => {
    await todoPage.completeTodoAt(0);
    await todoPage.isTodoCompleted(0);
    await todoPage.filterBy("Completed");
    await todoPage.expectVisibleTodosCount(1);
    await todoPage.expectTodoAt(0, todoData.todoText);
  });

  test("verify that the todo item can be deleted", async ({ todoPage }) => {
    await todoPage.deleteTodoAt(0);
    await todoPage.expectTodoCount(0);
  });
});

test.describe("Negative cases - Todo App", { tag: ['@negative', '@regression'] }, () => {
  test.beforeEach(async ({ page }) => {
    await goToTodoApp(page);
  });

  test("verify that an empty todo is not added when pressing Enter", async ({ todoPage }) => {
    await todoPage.addTodo("");
    await todoPage.expectTodoCount(0);
  });

  test('verify that todo cannot be added with only whitespace', async ({ todoPage }) => {
    await todoPage.addTodo('   ');
    await todoPage.expectTodoCount(0);
  });

  test('verify that todo cannot be edited with an empty text', async ({ todoPage }) => {
    await todoPage.addTodo(todoData.todoText);
    await todoPage.editTodoAt(0, '');
    await todoPage.expectTodoAt(0, todoData.todoText);
  });

  test('verify that completed todo is not in active filter', async ({ todoPage }) => {
    await todoPage.addTodo(todoData.todoText);
    await todoPage.completeTodoAt(0);
    await todoPage.filterBy('Active');
    await todoPage.expectVisibleTodosCount(0);
  });
});
