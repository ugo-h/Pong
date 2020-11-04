export function createElement(type, props, ...children) {
    const element = document.createElement(type.toUpperCase());
    for(const key in props) {
        if(key.includes('on') && props[key]!==null) {
            const event = key.split('on')[1].toLowerCase();
            element.addEventListener(event, props[key], false);
            continue;
        }
        element[key] = props[key];
    };
    children.forEach(child => {
        element.append(child);
    });
    return element;
}
export default class Menu {
    constructor(id, title, options) {
        this.id = id;
        this.title = title;
        this.options = options;
    }
    createMenu() {
        const items = this.options.map(option => {
            return createElement('li', {className:'menu__items__el', onClick: option.action}, option.content)
        })
        const container = document.getElementById(this.id);
        const menu = createElement('div', {className:'menu'}, 
            createElement('h2', {className:'menu__title'}, this.title),
            createElement('ul', {className:'menu__items'}, ...items),
        );
        container.append(menu)
    }
    removeMenu() {
        const container = document.getElementById(this.id);
        container.querySelectorAll('li').forEach((item, index) => {
            item.removeEventListener('click', this.options[index].action, false)
        });
        container.innerHTML = '';
    }
}


