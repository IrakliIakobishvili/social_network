const Community = {
    communityElement : '',

    totalLike: function() {
        let result = 0;
        General.loggedUser.photos.forEach(photo => {
            result += photo.likes.length;
        });
        return result;
    },
    totalFriend: function() {
        return Object.keys(General.loggedUser.friends).length;
    },
    totalPhoto: function() {
        return General.loggedUser.photos.length;
    },
    renderList: function() {
        let communityBody = document.createElement('div');
        communityBody.classList.add('main-content__community');
        Community.communityElement = communityBody;
        Aside.asideEl.appendChild(Community.communityElement);

        let communityHeader = document.createElement('header');
        communityHeader.classList.add('main-content__community-header');

        let communityTitle = document.createElement('h2');
        communityTitle.classList.add('main-content__community-header__title');
        communityTitle.appendChild(document.createTextNode('Community'));

        let seeAll = document.createElement('a');
        seeAll.classList.add('main-content__community-header__link');
        seeAll.setAttribute('href', '#');
        seeAll.appendChild(document.createTextNode('See All'));

        communityHeader.appendChild(communityTitle);
        communityHeader.appendChild(seeAll);

        let communityList = document.createElement('ul');
        communityList.classList.add('main-content__community-list');

        let listItem1 = document.createElement('li');
        let listItem2 = document.createElement('li');
        let listItem3 = document.createElement('li');

        listItem1.classList.add('main-content__community-item');
        listItem2.classList.add('main-content__community-item');
        listItem3.classList.add('main-content__community-item');

        let likeIcon = General.renderIcon5('fas fa-thumbs-up');
        listItem1.appendChild(likeIcon);
        let subscribeIcon = General.renderIcon5('fas fa-camera');
        listItem2.appendChild(subscribeIcon);
        let friendIcon = General.renderIcon5('fas fa-user-friends');
        listItem3.appendChild(friendIcon);

        let likes = document.createElement('span');
        likes.setAttribute('id', 'totalLike');
        likes.classList.add('main-content__community-item__totals');
        likes.appendChild(document.createTextNode(Community.totalLike()));
        listItem1.appendChild(likes);

        let photos = document.createElement('span');
        photos.setAttribute('id', 'totalPhoto');
        photos.classList.add('main-content__community-item__totals');
        photos.appendChild(document.createTextNode(Community.totalPhoto()));
        listItem2.appendChild(photos);

        let friends = document.createElement('span');
        friends.setAttribute('id', 'totalFriend');
        friends.classList.add('main-content__community-item__totals');
        friends.appendChild(document.createTextNode(Community.totalFriend()));
        listItem3.appendChild(friends);

        listItem1.appendChild(document.createTextNode('Like'));
        listItem2.appendChild(document.createTextNode('photo'));
        listItem3.appendChild(document.createTextNode('Friend'));

        communityList.appendChild(listItem1);
        communityList.appendChild(listItem2);
        communityList.appendChild(listItem3);

        communityBody.appendChild(communityHeader);
        communityBody.appendChild(communityList);
    },
    render : function() {
        if(Authorization.authorized) {
            Community.renderList();
        }
    }
}