const Navigation = {
    navElement : '',
    imgCont: '',

    renderNav: function() {
        let nav = document.createElement('nav');
        nav.classList.add('left-nav');
        Navigation.navElement = nav;
        Body.container.appendChild(nav);
    },
    renderProfileImgCont() {
        let imgCont = document.createElement('div');
        imgCont.classList.add('left-nav__img-cont');
        Navigation.imgCont = imgCont;
        Navigation.navElement.appendChild(imgCont);
    },
    renderProfileImg: function() {
        let profImg = document.createElement('img');
        profImg.classList.add('left-nav__img-cont__img');
        if(General.loggedUser.profileImg) {
            profImg.setAttribute('src',General.loggedUser.profileImg);
        }else {
            if(General.loggedUser.gender == 'male') {
                profImg.setAttribute('src','./assets/images/facebook-default-male.jpg');
            }else {
                profImg.setAttribute('src','./assets/images/facebook-default-female.jpg');
            }
        }
        General.removeElement(Navigation.imgCont);
        Navigation.imgCont.appendChild(profImg);
    },
    renderFullName: function() {
        let fullName  = document.createElement('h2');
        let firstName = document.createElement('span');
        let lastName  = document.createElement('span');
        firstName.innerText = General.loggedUser.firstName +' ';
        lastName.innerText = General.loggedUser.lastName;
        fullName.classList.add('left-nav__full-name');
        firstName.classList.add('left-nav__full-name__first-name');
        lastName.classList.add('left-nav__full-name__last-name');
        fullName.appendChild(firstName);
        fullName.appendChild(lastName);
        Navigation.navElement.appendChild(fullName);
    },
    renderNavList: function() {
        let navList = document.createElement('ul');
            navList.classList.add('left-nav__list');
        let navItem = '';
        let IDs  = ['leftBtnHome','leftBtnPosts','leftBtnPhotos','leftBtnVideos','leftBtnAbout'];
        let txts = ['home','posts','photos','videos','about'];
        for(let i = 0; i < IDs.length; i++) {
            navItem = document.createElement('li');
            navBtn  = document.createElement('button');
            navItem.classList.add('left-nav__list__item');
            navBtn.classList.add('left-nav__list__item__btn');
            (i == 0) ? navBtn.classList.add('left-nav__list__item__btn--active') : true;
            navBtn.id = IDs[i];
            navBtn.innerText = txts[i];
            navItem.appendChild(navBtn);
            navList.appendChild(navItem);
        }
        Navigation.navElement.appendChild(navList);
    },

    render: function(){
        if(Authorization.authorized) {
            Navigation.renderNav();
            Navigation.renderProfileImgCont();
            Navigation.renderProfileImg();
            Navigation.renderFullName();
            Navigation.renderNavList();
        }
    }
}