import Menu from './Menu';

export function menuGameOver(msg, restartHandler) {
    const options = [
        {title: restart},
        {action: restartHandler}
    ];
    return new Menu('menu', msg, options);
}