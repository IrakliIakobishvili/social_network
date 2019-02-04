const Aside = {
    asideEl: '',

    renderAside: function() {
        let aside = document.createElement('aside');
        aside.classList.add('main-content__aside-right');
        Aside.asideEl = aside;
        Main.main.appendChild(Aside.asideEl);
    },
    render: function() {
        if(Authorization.authorized) {
            Aside.renderAside();
        }
    }
}