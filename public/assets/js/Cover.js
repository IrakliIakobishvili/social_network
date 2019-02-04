const Cover = {
    coverElement  : '',
    coverTop      : '',
    addFriend     : '',
    messenger     : '',
    fbBtn         : '',
    updateInfoBtn : '',

    renderCover : function() {
        let coverHeader = document.createElement('header');
        coverHeader.classList.add('main-content__header');
        Cover.coverElement = coverHeader;
        Main.main.appendChild(Cover.coverElement);
    },

    renderCoverTop : function() {
        let coverTop = document.createElement('div');
        coverTop.classList.add('main-content__header-top');
        Cover.coverTop = coverTop;
        Cover.coverElement.appendChild(coverTop);
    },
    renderCoverImg: function($coverImg) {
        General.removeElement(Cover.coverTop);
        if($coverImg) {
            let coverImg = document.createElement('img');
            coverImg.classList.add('main-content__header-top__img');
            coverImg.setAttribute('src',$coverImg);
            Cover.coverTop.appendChild(coverImg);
            
        }else {
            let coverTopTitle = document.createElement('h2');
            coverTopTitle.classList.add('main-content__header-top__title');
            let coverTopText = document.createTextNode('replace this cover');
            coverTopTitle.appendChild(coverTopText);
            Cover.coverTop.appendChild(coverTopTitle);
        }
    },
    renderCoverBottom : function() {
        let coverBottom = document.createElement('div');
        coverBottom.classList.add('main-content__header-bottom');

        let addFriend = document.createElement('div');
        addFriend.classList.add('main-content__header-bottom__left');
        Cover.addFriend = addFriend;

        let updateInfoBtn = document.createElement('button');
        updateInfoBtn.classList.add('main-content__header__button', 'main-content__header-bottom__left-button');
    
        let updateInfoBtnText = document.createTextNode('Update Info');
        updateInfoBtn.appendChild(updateInfoBtnText);
        Cover.updateInfoBtn = updateInfoBtn;
        addFriend.appendChild(updateInfoBtn);
        Cover.updateInfoBtn.addEventListener('click', Events.settingsFunc);       
        
        let messenger = document.createElement('div');
        messenger.classList.add('main-content__header-bottom__right');
        Cover.messenger = messenger;

        let fbBtn = document.createElement('button');
        fbBtn.classList.add('main-content__header__button', 'main-content__header-bottom__right-button');
        let messengerIcon = General.renderIcon5('fab fa-facebook');
        let fbBtnTxt = document.createTextNode('Facebook.com');
        fbBtn.appendChild(messengerIcon);
        fbBtn.appendChild(fbBtnTxt);
        fbBtn.style.textTransform = 'lowercase'
        messenger.appendChild(fbBtn);
        Cover.fbBtn = fbBtn;
        Cover.fbBtn.addEventListener('click',function(){
            General.removeElement(document.querySelector('.main-content'));
            Cover.render();
            Timeline.render();
            Aside.render();
            Community.render();
        });

        coverBottom.appendChild(addFriend);
        coverBottom.appendChild(messenger);
        Cover.coverElement.appendChild(coverBottom);
    },
    renderAddRemoveFriendBtn($token) {
        General.removeElement(Cover.addFriend);
        let friendButton = document.createElement('button');
        friendButton.classList.add('main-content__header__button', 'main-content__header-bottom__left-button');
        friendButton.setAttribute('data-user-token',$token);
        let addIcon = '';
        let addButtonText = '';
        if(General.loggedUser.friends[''+$token+''] == undefined) {
            addButtonText = document.createTextNode('add friend');
            addIcon = General.renderIcon5('fas fa-user-plus');
        }else {  
            addButtonText = document.createTextNode('unfriend');
            addIcon = General.renderIcon5('fas fa-user-minus');
        }

        friendButton.appendChild(addIcon);
        friendButton.appendChild(addButtonText);
        Cover.addFriend.appendChild(friendButton);
        Events.addRemoveFriendBtnClick(friendButton);
    },
    renderSendMessageBtn: function($token) {
        General.removeElement(Cover.messenger);
        let messengerButton = document.createElement('button');
        messengerButton.classList.add('main-content__header__button', 'main-content__header-bottom__right-button');
        let messengerIcon = General.renderIcon5('fab fa-facebook-messenger');
        let messengerButtonText = document.createTextNode('send message');
        messengerButton.appendChild(messengerIcon);
        messengerButton.appendChild(messengerButtonText);
        messengerButton.setAttribute('data-user-token',$token);
        Cover.messenger.appendChild(messengerButton);
        Events.sendMessageBtnClick(messengerButton);
    },
    renderCoverBottom2 : function() {
        let coverBottom = document.createElement('div');
        coverBottom.classList.add('main-content__header-bottom');

        let links = document.createElement('ul');
        links.classList.add('main-content__header-bottom__left-list');

        let likeContainer = document.createElement('li');
        likeContainer.classList.add('main-content__header-bottom__left-item');

        let like = document.createElement('a');
        like.classList.add('main-content__header-bottom__left-link', 'link-br-left');
        like.setAttribute('href', '#');
        let likeIcon = General.renderIcon5('fas fa-thumbs-up');
        like.appendChild(likeIcon);
        like.appendChild(document.createTextNode('Like'));
        likeContainer.appendChild(like);

        let followContainer = document.createElement('li');
        followContainer.classList.add('main-content__header-bottom__left-item');

        let follow = document.createElement('a');
        follow.classList.add('main-content__header-bottom__left-link');
        follow.setAttribute('href', '#');
        let followIcon = General.renderIcon5('fas fa-rss');
        follow.appendChild(followIcon);
        follow.appendChild(document.createTextNode('Follow'));
        followContainer.appendChild(follow);

        let shareContainer = document.createElement('li');
        shareContainer.classList.add('main-content__header-bottom__left-item');

        let share = document.createElement('a');
        share.classList.add('main-content__header-bottom__left-link');
        share.setAttribute('href', '#');
        let shareIcon = General.renderIcon5('fas fa-share');
        share.appendChild(shareIcon);
        share.appendChild(document.createTextNode('Share'));
        shareContainer.appendChild(share);

        let toggleContainer = document.createElement('li');
        toggleContainer.classList.add('main-content__header-bottom__left-item');

        let toggle = document.createElement('a');
        toggle.classList.add('main-content__header-bottom__left-link', 'link-br-right');
        toggle.setAttribute('href', '#');
        let toggleIcon = General.renderIcon5('fas fa-ellipsis-h');
        toggleIcon.classList.add('cover-Icon-margin');
        toggle.appendChild(toggleIcon);
        toggleContainer.appendChild(toggle);

        links.appendChild(likeContainer);
        links.appendChild(followContainer);
        links.appendChild(shareContainer);
        links.appendChild(toggleContainer);

        let messenger = document.createElement('div');
        messenger.classList.add('main-content__header-bottom__right');
        let messengerButton = document.createElement('button');
        messengerButton.classList.add('main-content__header__button', 'main-content__header-bottom__right-button', 'align-items-center');
        let messengerIcon = General.renderIcon5('fas fa-pen');
        messengerIcon.classList.add('cover-Icon-margin');
        let messengerButtonText = document.createTextNode('learn more');
        messengerButton.appendChild(messengerButtonText);
        messengerButton.appendChild(messengerIcon);
        messenger.appendChild(messengerButton);

        coverBottom.appendChild(links);
        coverBottom.appendChild(messenger);
        Cover.coverElement.appendChild(coverBottom);
    },

    render : function() {
        if(Authorization.authorized) {
            Cover.renderCover();
            Cover.renderCoverTop();
            Cover.renderCoverImg(General.loggedUser.coverImg);
            Cover.renderCoverBottom();
        }
    }
}