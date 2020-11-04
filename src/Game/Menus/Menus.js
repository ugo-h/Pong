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