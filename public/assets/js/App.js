var App = {
    components: function() {
        General.removeAll();
        Head.render();
        Header.render();
        // Headermenu.render();
        Body.render();
        Navigation.render();
        // Navigation2.render();
        Main.render();
        Cover.render();
        Timeline.render();
        Chat.render();
        Aside.render();
        // Rating.render();
        // Story.render();
        Community.render();
        Friends.render();
        Register.render();
        // About.render();
        // Photos.render();
        // Videos.render();
        // Recover.render();
        // Settings.render();
        Footer.render();
        Events.add();
    },
    render: function() {
        Authorization.check();
        let interval = setInterval(() => {
            if(Authorization.checking == false) {
                clearInterval(interval);                
                App.components();
            }
        },0);
    },
}
App.render();