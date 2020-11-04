class Menu {
    constructor() {

    }
    static initMenu() {
        const menu = document.getElementById('menu');  
        const startBtn = document.getElementById('btn-start');
        startBtn.addEventListener('touchstart', () => {
            this.run = !this.run;
            menu.classList.toggle('invisible')
        })
        document.addEventListener('keydown', ev => {
            if(ev.code === 'Escape' && !this.isGameOver) {
              this.run = !this.run;
              menu.classList.toggle('invisible')
            }
        })
        menu.addEventListener('click', ev => {
            if(!ev.target.classList.contains('menu__el')) return;
            if(ev.target.id === 'start') {
              this.run = true;
              ev.currentTarget.classList.add('invisible');
            }
        })
    }
}

export default Menu;