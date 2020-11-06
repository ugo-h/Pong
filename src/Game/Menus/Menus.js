import Menu from './Menu';

export function createGameOverMenu(msg, restartHandler) {
    const options = [
        {
            title: 'Restart',
            action: restartHandler,
            close: true
        }
    ];
    const menu = new Menu('menu', msg, options);
    menu.createMenu();
}

export function createMainMenu(startGameHandler, controlSchemeSwitcher) {
    const options = [
        {
            title: 'Start',
            action: startGameHandler,
            close: true
        },
        {
            title: 'Keyboard',
            action: (ev) => {
                ev.target.innerText = controlSchemeSwitcher();
            }
        }
    ];
    const menu = new Menu('menu', 'PONG', options);
    menu.createMenu();
}