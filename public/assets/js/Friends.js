const Friends = {
    friendsEl: '',

    renderFriends: function() {
        let friends         = document.createElement('div');
        let friendsList     = document.createElement('ul');        
        friends.classList.add('friends');
        friendsList.classList.add('friends__list');
        friends.appendChild(friendsList);
        //== Ajax Start ==//
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'load-friends', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
            if(xhr.status == 200) {
                let friends = JSON.parse(this.responseText);
                friends.forEach(element => {
                    let friendsListItem = document.createElement('li');
                    let friendImgCont   = document.createElement('div');
                    let friendImg       = document.createElement('img');
                    let friendName      = document.createElement('span');
                    let status          = document.createElement('span');
                    let hand            = document.createElement('span');
                    let friendNameTxt   = document.createTextNode(element['firstName']+' '+element['lastName']);                    
                    friendsListItem.classList.add('friends__list__item');
                    friendImgCont.classList.add('friends__list__item__img-cont');
                    friendImg.classList.add('friends__list__item__img-cont__img');
                    friendName.classList.add('friends__list__item__fullname');
                    status.classList.add('friends__list__item__status');   
                    hand.classList.add('friends__list__item__hand');
                    if(element.profileImg) {
                        friendImg.setAttribute('src',element.profileImg);
                    }else {
                        if(element.gender == 'male') {
                            friendImg.setAttribute('src','./assets/images/facebook-default-male.jpg');
                        }else {
                            friendImg.setAttribute('src','./assets/images/facebook-default-female.jpg');
                        }
                    }
                    if(element['online']) {
                        let active = document.createElement('span');
                        active.classList.add('friends__list__item__status__isOnline');
                        status.appendChild(active);
                    }
                    friendsListItem.setAttribute('token',element["token"]);
                    friendsListItem.appendChild(friendImgCont);
                    friendImgCont.appendChild(friendImg); 
                    friendName.appendChild(friendNameTxt);
                    friendsListItem.appendChild(friendName);                    
                    friendsListItem.appendChild(hand);
                    friendsListItem.appendChild(status);        
                    friendsList.appendChild(friendsListItem);
                    Events.friendsListItemClick();                 
                });
            }                
        }
        let token = localStorage.getItem('FB_TOKEN');
        xhr.send(JSON.stringify({token: token}));
        //== Ajax End ==//

        let friendSearch    = document.createElement('div');
        let search          = document.createElement('input');
        let optionsBtn      = document.createElement('button');
        let newMsgBtn       = document.createElement('button');
        let createGroupBtn  = document.createElement('button');

        friendSearch.classList.add('friends__search');
        search.classList.add('friends__search__input');
        optionsBtn.classList.add('friends__search__btn', 'friends__search__btn--options');
        newMsgBtn.classList.add('friends__search__btn', 'friends__search__btn--new-message');
        createGroupBtn.classList.add('friends__search__btn', 'friends__search__btn--create-group');
        search.setAttribute('id','searchFriendBottomInput');
        search.setAttribute('type','search');
        search.setAttribute('placeholder','Search');
        friendSearch.appendChild(search);
        friendSearch.appendChild(optionsBtn);
        friendSearch.appendChild(newMsgBtn);
        friendSearch.appendChild(createGroupBtn);
        friends.appendChild(friendSearch);
        Friends.listEl   = friendsList
        Friends.statusEl = status;
        Friends.friendsEl = friends;
        Body.wrapper.appendChild(friends);
    },

    render: function() {
        if(Authorization.authorized) {
            Friends.renderFriends();
        }
    }
}