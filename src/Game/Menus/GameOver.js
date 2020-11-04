

export function openGameOverMenu(msg, restartCallback) {
    const menu = document.getElementById('menu-gameover');
    const title = menu.querySelector('.menu__title');
    title.textContent = msg.title;
    initGameOverMenu(menu, restartCallback)

    menu.classList.remove('invisible')
  };

function initGameOverMenu(menu, restartCallback) {
    menu.addEventListener('click', listener, {once: true});
    function listener(ev) {
        if(!ev.target.classList.contains('menu__el')) return;
        ev.currentTarget.classList.add('invisible');
        restartCallback();
    }
};