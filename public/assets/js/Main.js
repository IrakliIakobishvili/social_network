const Main = {
    main : '',
    renderMain: function() {
        let main = document.createElement('main');
        main.classList.add('main-content');
        Main.main = main;
        Body.container.appendChild(Main.main);
    },
    
    render: function(){
        if(Authorization.authorized) {
            Main.renderMain();
        }
    }
}