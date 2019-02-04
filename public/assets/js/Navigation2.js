const Navigation2 = {
    navElement : '',
    
    renderNav : function() {
        let nav = document.createElement('nav');
        nav.classList.add('left-navigation', 'left-nav');
        Navigation2.navElement = nav;
        Body.container.appendChild(nav);
    },

    renderProfileImage : function() {
        let imgContainer = document.createElement('div');
        imgContainer.classList.add('left-nav__img-cont');
        let img = document.createElement('img');
        img.classList.add('left-nav__img-cont__img');
        img.setAttribute('src', './assets/images/Asylab.png');
        imgContainer.appendChild(img);
        Navigation2.navElement.appendChild(imgContainer);
    },

    renderPageName : function() {
        let pageName = document.createElement('h2');
        pageName.classList.add('left-navigation__page-name');
        pageName.appendChild(document.createTextNode('Asylab'));
        let hashTag = document.createElement('span');
        hashTag.classList.add('left-navigation__hashtag');
        hashTag.innerText = '@asylabOfficial';
        Navigation2.navElement.appendChild(pageName);
        Navigation2.navElement.appendChild(hashTag);
    },

    renderNavList : function() {
        let navList = document.createElement('ul');
        navList.classList.add('left-navigation__list');
        let texts = ['home', 'events', 'reviews', 'about', 'videos', 'photos', 'posts', 'jobs', 'community', 'Info and Ads'];
        for(i = 0; i < texts.length; i++) {
            let item = document.createElement('li');
            item.classList.add('left-navigation__list__item');
            let buttons = document.createElement('buttons');
            buttons.classList.add('left-navigation__list__item__btn');
            buttons.setAttribute('onclick', 'Events.leftNavItemsClickFn2(this)')
            if(i == 0) {
                buttons.classList.add('left-navigation__list__item__btn--active');
            }
            buttons.innerText = texts[i];
            item.appendChild(buttons);
            navList.appendChild(item);
        }
        Navigation2.navElement.appendChild(navList);
    },

    renderNavPromotions : function() {
        let navPromotionsSection = document.createElement('div');
        navPromotionsSection.classList.add('left-navigation__promotions');
        let promoteBtn = document.createElement('button');
        promoteBtn.classList.add('left-navigation__promotions__button');
        promoteBtn.innerText = 'Promote';
        let promotionManage = document.createElement('a');
        promotionManage.classList.add('left-navigation__promotions__link');
        promotionManage.setAttribute('href', '#');
        promotionManage.innerText = 'manage promotions';
        navPromotionsSection.appendChild(promoteBtn);
        navPromotionsSection.appendChild(promotionManage);
        Navigation2.navElement.appendChild(navPromotionsSection);
    },

    render : function() {
        if(Authorization.authorized == true) {
            Navigation2.renderNav();
            Navigation2.renderProfileImage();
            Navigation2.renderPageName();
            Navigation2.renderNavList();
            Navigation2.renderNavPromotions();
            // Events.leftNavItemsClick2();
        }
    }
}