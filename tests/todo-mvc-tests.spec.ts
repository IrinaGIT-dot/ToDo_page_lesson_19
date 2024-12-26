import {ToDoPage} from "./pages/todo-page";
import {expect, test} from "@playwright/test";

let todoPage: ToDoPage

test.beforeEach(async ({page}) => {
    todoPage = new ToDoPage(page)
    await todoPage.OpenToDoPage()
})

test('Page has title', async ({page}) => {
    await expect(todoPage.pageLogo).toBeVisible()
});

test('Create new task', async ({page}) => {
    await todoPage.inputField.fill('new task')
    await todoPage.inputField.press('Enter')
    expect(await todoPage.counterToDoItems()).toBe(1)
});

test('Delete task by name', async ({page}) => {
    await todoPage.inputField.fill('new task')
    await todoPage.inputField.press('Enter')
    await todoPage.deleteItemByName('new task')
    expect(await todoPage.counterToDoItems()).toBe(0)
});

test('Complete task by name', async ({page}) => {
    await todoPage.inputField.fill('new task')
    await todoPage.inputField.press('Enter')
    await todoPage.completeToDoByTaskName('new task')
    await todoPage.checkCompletedTaskByName('new task')
});

test('Check buttons All, Active, Clear, Completed are visible', async ({page}) => {
    await todoPage.inputField.fill('new task')
    await todoPage.inputField.press('Enter')
    await expect.soft(todoPage.buttonClearComplTasks).toBeVisible()
    await expect.soft(todoPage.filterActive).toBeVisible()
    await expect.soft(todoPage.filterCompleted).toBeVisible()
    await expect.soft(todoPage.filterAll).toBeVisible()
});


