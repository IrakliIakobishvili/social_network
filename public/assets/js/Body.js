const Body = {
    container : Container.render(),
    wrapper   : document.createElement('div'),

    renderBody: function() {
        let body = document.createElement('section');
        Body.wrapper.classList.add('wrapper','wrapper--body');
        body.classList.add('main-section');
        body.appendChild(Body.container);  
        Body.wrapper.appendChild(body);  
        General.root.appendChild(Body.wrapper);
    },

    render: function(){
        (Authorization.authorized) ? Body.renderBody() : true;
    }
}