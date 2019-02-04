const Story = {
    storyElement : '',

    renderStory : function() {
        let storyBody = document.createElement('div');
        storyBody.classList.add('main-content__aside-right__story');
        Story.storyElement = storyBody;
        let storyCover = document.createElement('div');
        storyCover.classList.add('main-content__aside-right__story-cover');
        let bottomSection = document.createElement('div');
        bottomSection.classList.add('main-content__aside-right__story-info');
        let heading = document.createElement('h2');
        heading.classList.add('main-content__aside-right__story-title');
        heading.appendChild(document.createTextNode('our story'));
        let link = document.createElement('a');
        link.classList.add('main-content__aside-right__story-link');
        link.setAttribute('href', '#');
        link.appendChild(document.createTextNode('+Tell people about your business'));
        bottomSection.appendChild(heading);
        bottomSection.appendChild(link);
        storyBody.appendChild(storyCover);
        storyBody.appendChild(bottomSection);
        Aside.asideEl.appendChild(Story.storyElement);
    },
    render: function() {
        if(Authorization.authorized) {
            Story.renderStory();
        }
    }
}