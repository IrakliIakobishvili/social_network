var Container = {
    renderContainer : function() {
        let container = document.createElement('div');
        container.classList.add('container');
        return container;
    },
    render: function() {
        return Container.renderContainer();
    }
}