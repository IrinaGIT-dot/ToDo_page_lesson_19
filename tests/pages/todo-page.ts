import {expect, Locator, Page} from "@playwright/test";

export class ToDoPage {
    readonly page: Page
    readonly url = 'https://todo-app.tallinn-learning.ee'
    readonly pageLogo: Locator
    readonly inputField: Locator
    readonly taskCounter: Locator
    readonly filterAll: Locator
    readonly filterCompleted: Locator
    readonly filterActive: Locator
    readonly buttonClearComplTasks: Locator
    readonly footerLink: Locator
    readonly buttonSelectAll: Locator
    readonly todoItemLabel: Locator
    readonly buttonSelectTask: Locator
    readonly buttonDeleteTask: Locator
    readonly footerNavigation: Locator

    constructor(page: Page) {
        this.page = page;
        this.pageLogo = page.getByTestId('header');
        this.inputField = page.getByTestId('text-input');
        this.taskCounter = page.getByTestId('toggle-all');
        this.filterAll = page.getByRole('link', {name: 'All'});
        this.filterCompleted = page.getByRole('link', {name: 'Completed'});
        this.filterActive = page.getByRole('link', {name: 'Active'});
        this.buttonClearComplTasks = page.getByRole('button', {name: 'Clear completed'});
        this.footerLink = page.getByRole('link',{name:'TodoMVC'});
        this.buttonSelectAll =page.getByTestId('toggle-all');
        this.todoItemLabel = page.getByTestId('todo-item-label');
        this.buttonSelectTask = page.getByTestId('todo-item-toggle');
        this.buttonDeleteTask = page.getByTestId('todo-item-button');
        this.footerNavigation = page.locator('span.todo-count');

    }
    async OpenToDoPage() {
        await this.page.goto(this.url)
    }

    async counterToDoItems() {
        return await this.todoItemLabel.count()
    }

    async deleteTaskByName(taskName: string) {
        const taskToDelete = this.page.getByText(taskName)
        await taskToDelete.hover()
        await this.buttonDeleteTask.click()
    }

    async completeToDoByTaskName(taskName: string) {
        await this.page.locator('div').filter({hasText: taskName}).getByTestId('todo-item-toggle').click()
    }

    async checkCompletedTaskByName(taskName: string) {
        const completedTask = await this.page.locator('div').filter({hasText: taskName}).getByTestId('todo-item-toggle')
        const liClass = this.page.getByRole('listitem').filter({ has: completedTask });
        await expect(liClass).toHaveClass("completed")
        //completedTask.locator('..').locator('..') //go to parent 2 times
    }
}