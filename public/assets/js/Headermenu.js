const Headermenu = {
    headerMenuElement : '',
    container : Container.render(),
    menuItems : ['page', 'inbox', 'notifications', 'insights', 'publishing tools', 'ad center'],

    renderHeaderMenu : function() {
        let menu = document.createElement('section');
        menu.classList.add('main-header__menu');
        Headermenu.headerMenuElement = menu;
        Headermenu.container.classList.add('justify-content-between');
        menu.appendChild(Headermenu.container);
        Header.wrapper.appendChild(Headermenu.headerMenuElement);
    },

    renderHeaderMenuLeft : function() {
        let contentLeft = document.createElement('div');
        contentLeft.classList.add('main-header__menu-left');
        let leftList = document.createElement('ul');
        leftList.classList.add('main-header__menu__list');
        for(i = 0; i < Headermenu.menuItems.length; i++) {
            let item = document.createElement('li');
            item.classList.add('main-header__menu__list-item');
            let link = document.createElement('a');
            link.classList.add('main-header__menu__list-link');
            link.setAttribute('href', '#');
            link.appendChild(document.createTextNode(Headermenu.menuItems[i]));
            item.appendChild(link);
            leftList.appendChild(item);
        }
        contentLeft.appendChild(leftList);
        Headermenu.container.appendChild(contentLeft);
    },

    renderHeaderMenuRight : function() {
        let contentRight = document.createElement('div');
        contentRight.classList.add('main-header__menu-right');
        let rightList = document.createElement('ul');
        rightList.classList.add('main-header__menu__list');
        let item1 = document.createElement('li');
        let item2 = document.createElement('li');
        item1.classList.add('main-header__menu__list-item');
        item2.classList.add('main-header__menu__list-item');
        let link1 = document.createElement('a');
        let link2 = document.createElement('a');
        link1.classList.add('main-header__menu__list-link');
        link2.classList.add('main-header__menu__list-link');
        link1.setAttribute('href', '#');
        link2.setAttribute('href', '#');
        link1.appendChild(document.createTextNode('settings'));
        link2.appendChild(document.createTextNode('help'));
        let linkIcon = General.renderIcon5('fas fa-caret-down');
        link2.appendChild(linkIcon);
        item1.appendChild(link1);
        item2.appendChild(link2);
        rightList.appendChild(item1);
        rightList.appendChild(item2);
        contentRight.appendChild(rightList);
        Headermenu.container.appendChild(contentRight);
    },

    render : function() {
        if(Authorization.authorized == true) {
            Headermenu.renderHeaderMenu();
            Headermenu.renderHeaderMenuLeft();
            Headermenu.renderHeaderMenuRight();
        }
    }
}