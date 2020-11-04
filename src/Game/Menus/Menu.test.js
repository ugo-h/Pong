import Menu, { createElement } from './Menu';

beforeEach(() => {
    document.body.innerHTML = '';
})

test('test event', () => {
    const handler = jest.fn()
    let element = createElement('div', { onClick: handler });
    document.body.append(element);
    element.dispatchEvent(new Event('click')); 
    expect(handler).toBeCalledTimes(1);

    element.removeEventListener('click', handler, false)
    document.body.innerHTML = '';
    element.dispatchEvent(new Event('click')); 
    expect(handler).toBeCalledTimes(1);
})

test('menu renders and removes correctly', () => {
    const container = createElement('div', {id:'root'})
    document.body.append(container);
    expect(document.body.innerHTML).toBe('<div id="root"></div>');

    const options = [
        {content: 'start', action: jest.fn()}
    ]
    const startMenu = new Menu('root', 'Main', options)
    startMenu.createMenu();
    expect(container.innerHTML).toBe('<div class="menu"><h2 class="menu__title">Main</h2><ul class="menu__items"><li class="menu__items__el">start</li></ul></div>')

    startMenu.removeMenu();
    expect(document.body.innerHTML).toBe('<div id="root"></div>')
})
