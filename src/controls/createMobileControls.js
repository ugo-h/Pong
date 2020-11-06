import { createElement } from '../Game/Menus/Menu';

export function createMobileControls() {

    const containerLeft = document.getElementById('joystick')
    const containerRight = document.getElementById('btns')

    const ctrlLeft = createElement('div', {className: "ctrl-left", id: "ctrl-left"});
    const ctrlRight = createElement('div', {className: "ctrl-right", id: "ctrl-right"});

    containerLeft.append(ctrlLeft);
    containerRight.append(ctrlRight);

    return { 
        ctrlLeft,
        ctrlRight
    }
}   