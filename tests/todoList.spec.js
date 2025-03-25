import { test, expect } from '@playwright/test';

test('TodoMVC - Adicionar, concluir e remover uma tarefa', async ({ page }) => {
    // Acessa o site TodoMVC
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    // Adiciona uma nova tarefa
    await page.locator('.new-todo').fill('Automate with Playwright');
    await page.keyboard.press('Enter');

    // Verifica se a tarefa foi adicionada
    const todoItem = page.locator('.todo-list li');
    await expect(todoItem).toHaveText('Automate with Playwright');
      await page.screenshot({ path: `screenshots/01_task_added.png` });

    // Marca a tarefa como concluída
    await todoItem.locator('.toggle').click();
    await expect(todoItem).toHaveClass(/completed/);
    await page.screenshot({ path: `screenshots/02_task_completed.png`});


    // Filtra apenas as tarefas ativas
    await page.locator('text=Active').click();
    await expect(todoItem).not.toBeVisible();

    // Volta para a lista completa
    //await page.getByRole('link', { name: 'All' }).click();
    await page.locator('text=All').click();
    await expect(todoItem).toBeVisible();

    // Remove a tarefa
    await todoItem.locator('.destroy').hover();
    await todoItem.locator('.destroy').click();

    // Verifica se a lista está vazia
    await expect(page.locator('.todo-list')).not.toBeVisible();
});
