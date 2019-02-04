const Header = {
    wrapper            : document.createElement('div'),
    headerElement      : '',
    container          : Container.render(),
    homeListLeft       : document.createElement('ul'),
    homeListRight      : document.createElement('ul'),
    resultItem         : '',
    friendsRequestItem : '',
    messengerItem      : '',
    notificationsItem  : '',
    helpItem           : '',
    dropDownItem       : '',
    imgCont            : '',

    renderHeader : function() {
        let header = document.createElement('header');
        header.classList.add('main-header');
        header.id = 'mainHeader';
        header.appendChild(Header.container);       
        Header.headerElement = header;
    },
    renderLoginHeader : function() {
        Header.renderHeader();
        Header.headerElement.classList.add('login-header');
        Header.renderLogo(); 
        Header.renderLoginForm();  
        General.root.appendChild(Header.headerElement);   
    },
    renderLogo: function() {
        let loginLogo = document.createElement('h1');
        let logoText = document.createTextNode('Facebook');
        loginLogo.classList.add('login-header__logo');
        loginLogo.appendChild(logoText);
        Header.container.appendChild(loginLogo);
    },
    renderLoginForm: function() {     
        let form              = document.createElement('form');
        let table             = document.createElement('table');
        let tbody             = document.createElement('tbody');
        let tr1               = document.createElement('tr');
        let tr2               = document.createElement('tr');
        let tr3               = document.createElement('tr');
        let td1               = document.createElement('td');
        let td2               = document.createElement('td');
        let td3               = document.createElement('td');
        let td4               = document.createElement('td');
        let td5               = document.createElement('td');
        let td6               = document.createElement('td');
        let td7               = document.createElement('td');
        let emailLabel        = document.createElement('label');
        let passwordLabel     = document.createElement('label');
        let emailLabelText    = document.createTextNode('Email or Phone');
        let passwordLabelText = document.createTextNode('Password');
        let emailInput        = document.createElement('input');
        let passwordInput     = document.createElement('input');
        let loginBtn          = document.createElement('input');
        let recoverLink       = document.createElement('a');
        let recoverLinkText   = document.createTextNode('Forgot account?');
        let resultInfo        = document.createElement('span');
        emailInput.setAttribute('id','emailInput');
        emailInput.setAttribute('type','email');
        emailInput.setAttribute('name','loginEmail');
        passwordInput.setAttribute('id','passwordInput');
        passwordInput.setAttribute('type','password');
        passwordInput.setAttribute('name','loginPassword');   
        loginBtn.setAttribute('id','loginBtn');
        loginBtn.setAttribute('type','submit');
        loginBtn.setAttribute('value','Log In');
        emailLabel.setAttribute('for','emailInput');
        passwordLabel.setAttribute('for','passwordInput');
        recoverLink.setAttribute('href','');
        recoverLink.setAttribute('id','recoverLink');
        form.classList.add('login-header__form');
        emailInput.classList.add('login-header__form__email');
        passwordInput.classList.add('login-header__form__password');
        emailLabel.classList.add('login-header__form__label');
        passwordLabel.classList.add('login-header__form__label');
        loginBtn.classList.add('login-header__form__submit');
        recoverLink.classList.add('login-header__form__recover-link');
        resultInfo.classList.add('login-header__form__result-info','result-info');
        resultInfo.setAttribute('id','loginResultBox');
        emailLabel.appendChild(emailLabelText);
        passwordLabel.appendChild(passwordLabelText);
        recoverLink.appendChild(recoverLinkText);
        td1.appendChild(emailLabel);
        td2.appendChild(passwordLabel);
        td3.appendChild(emailInput);
        td4.appendChild(passwordInput);
        td5.appendChild(loginBtn);
        td7.appendChild(recoverLink);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr2.appendChild(td3);
        tr2.appendChild(td4);
        tr2.appendChild(td5);
        tr3.appendChild(td6);
        tr3.appendChild(td7);
        tbody.appendChild(tr1);
        tbody.appendChild(tr2);
        tbody.appendChild(tr3);
        table.appendChild(tbody);
        form.appendChild(resultInfo);
        form.appendChild(table);
        Header.container.appendChild(form);
    },
    renderHomeHeader: function() {
        Header.renderHeader();
        Header.headerElement.classList.add('home-header');
        Header.renderLoggedLogo();
        Header.renderSearchBar();
        Header.renderHeaderButtons();
        Header.renderHeaderUserImg();
        Header.wrapper.classList.add('wrapper','wrapper--header');
        Header.wrapper.appendChild(Header.headerElement);
        General.root.appendChild(Header.wrapper);
    },
    renderLoggedLogo: function() {
        let logo = document.createElement('h1');
        let item = document.createElement('li');
        let icon = General.renderIcon4('fa-facebook-official');
        logo.classList.add('home-header__logo');
        Header.homeListLeft.classList.add('home-header__left-list');
        item.classList.add('home-header__left-list__item');
        logo.appendChild(icon);
        item.appendChild(logo);
        Header.homeListLeft.appendChild(item);
        Header.container.appendChild(Header.homeListLeft);
    },
    renderSearchBar: function() {
        let searchBox        = document.createElement('div');
        let input            = document.createElement('input');
        let item             = document.createElement('li');
        let btn              = document.createElement('button');
        let btnIcon          = General.renderIcon4('fa-search');
        searchBox.classList.add('home-header__search-box');
        item.classList.add('home-header__left-list__item');
        item.classList.add('home-header__left-list__item--search');
        input.classList.add('home-header__search-box__input');
        btn.classList.add('home-header__search-box__btn');
        btn.id = 'searchBtn';
        input.setAttribute('placeholder','Search');
        input.setAttribute('id','userSearchInput');
        input.setAttribute('autocomplete','off');
        Header.resultItem = item;
        btn.appendChild(btnIcon);
        searchBox.appendChild(input);
        searchBox.appendChild(btn);
        item.appendChild(searchBox);
        Header.homeListLeft.appendChild(item);
        Header.container.appendChild(Header.homeListLeft);
        Events.userSearchInputKeyup(input);
    },
    renderSearchResult: function() {
        let resultBox = document.createElement('ul');
        resultBox.classList.add('home-header__search-box__result-box','result-box-list');
        resultBox.setAttribute('id','searchResultList');
        Header.resultItem.appendChild(resultBox);
    },
    renderSearchResultItem: function(img,firstNm,lastNm,token,gender) {
        let resultList = document.getElementById('searchResultList');
        let resultItem = document.createElement('li');
        let imageCont  = document.createElement('div');
        let image      = document.createElement('img');
        let fullName   = document.createElement('div');
        let firstName  = document.createElement('span');
        let lastName   = document.createElement('span');
        let firstNameTxt = document.createTextNode(firstNm);
        let lastNameTxt  = document.createTextNode(lastNm);
        resultItem.classList.add('result-box-list__item');
        imageCont.classList.add('result-box-list__item__img-cont');
        image.classList.add('result-box-list__item__img-cont__img');
        fullName.classList.add('result-box-list__item__full-name');
        firstName.classList.add('result-box-list__item__full-name__firstname');
        lastName.classList.add('result-box-list__item__full-name__lastname');
        resultItem.setAttribute('token',token);
        if(img) {
            image.setAttribute('src',img);
        }else {
            if(gender == 'male') {
                image.setAttribute('src','./assets/images/facebook-default-male.jpg');
            }else {
                image.setAttribute('src','./assets/images/facebook-default-female.jpg');
            }
        }      
        imageCont.appendChild(image);
        resultItem.appendChild(imageCont);        
        firstName.appendChild(firstNameTxt);
        lastName.appendChild(lastNameTxt);
        fullName.appendChild(firstName);
        fullName.appendChild(lastName);
        resultItem.appendChild(fullName);
        resultList.appendChild(resultItem);
        Events.searchedUserItemClick(resultItem);
    },
    renderHeaderButtons: function() {
        let items = [];
        let item = '';
        for(let i = 0; i < 8; i++) {
            item = document.createElement('li');
            item.classList.add('home-header__right-list__item');
            item.classList.add('top-nav-list__item');
            items.push(item);
        }
        let imgCont    = document.createElement('div');
        let nameBtn    = document.createElement('button');
        let homeBtn    = document.createElement('button');
        let findFrsBtn = document.createElement('button');
        let frsReqBtn  = document.createElement('button');
        let msgsBtn    = document.createElement('button');
        let notificBtn = document.createElement('button');
        let helpBtn    = document.createElement('button');
        let dropDwnBtn = document.createElement('button');

        let nameBtnTxt     = document.createTextNode(General.loggedUser.firstName);
        let homeBtnTxt     = document.createTextNode('Home');
        let findFrsBtnTxt  = document.createTextNode('Find Friends');
        let frsReqBtnIcon  = General.renderIcon5('fas fa-user-friends');
        let msgsBtnIcon    = General.renderIcon5('fab fa-facebook-messenger');
        let notificBtnIcon = General.renderIcon5('fas fa-bell');
        let helpBtnIcon    = General.renderIcon5('fas fa-question-circle');
        let dropDwnBtnIcon = General.renderIcon5('fas fa-caret-down');

        nameBtn.appendChild(nameBtnTxt);
        homeBtn.appendChild(homeBtnTxt);
        findFrsBtn.appendChild(findFrsBtnTxt);
        frsReqBtn.appendChild(frsReqBtnIcon);
        msgsBtn.appendChild(msgsBtnIcon);
        notificBtn.appendChild(notificBtnIcon);
        helpBtn.appendChild(helpBtnIcon);
        dropDwnBtn.appendChild(dropDwnBtnIcon);
        dropDwnBtnIcon.setAttribute('id','dropDwnBtnIcon');
        imgCont.classList.add('top-nav-list__item__image-cont');
        nameBtn.classList.add('top-nav-list__item__btn','top-nav-list__item__btn--name-btn');
        homeBtn.classList.add('top-nav-list__item__btn','top-nav-list__item__btn--home-btn');
        findFrsBtn.classList.add('top-nav-list__item__btn','top-nav-list__item__btn--find-friends-btn');
        frsReqBtn.classList.add('top-nav-list__item__btn','top-nav-list__item__btn--friends-requests-btn');
        msgsBtn.classList.add('top-nav-list__item__btn','top-nav-list__item__btn--messanger-btn');
        notificBtn.classList.add('top-nav-list__item__btn','top-nav-list__item__btn--notifications-btn');
        helpBtn.classList.add('top-nav-list__item__btn','top-nav-list__item__btn--help-btn');
        dropDwnBtn.classList.add('top-nav-list__item__btn','top-nav-list__item__btn--dropdown-btn');
        
        items[0].classList.add('top-nav-list__item--name');
        items[1].classList.add('top-nav-list__item--home');
        items[2].classList.add('top-nav-list__item--find-friends');
        items[3].classList.add('top-nav-list__item--friends-requests');
        items[4].classList.add('top-nav-list__item--messanger');
        items[5].classList.add('top-nav-list__item--notifications');
        items[6].classList.add('top-nav-list__item--help');
        items[7].classList.add('top-nav-list__item--dropdown');
        items[7].setAttribute('id','dropDownBtn');
        Header.dropDownItem = items[7];
        items[0].appendChild(imgCont);
        items[0].appendChild(nameBtn);
        items[1].appendChild(homeBtn);
        items[2].appendChild(findFrsBtn);
        items[3].appendChild(frsReqBtn);
        items[4].appendChild(msgsBtn);
        items[5].appendChild(notificBtn);
        items[6].appendChild(helpBtn);
        items[7].appendChild(dropDwnBtn);
        items.forEach((el,index) => {
            Header.homeListRight.appendChild(el);
        });
        Header.friendsRequestItem = items[3];
        Header.messengerItem      = items[4];
        Header.notificationsItem  = items[5];
        Header.helpItem           = items[6];
        Header.dropDownItem       = items[7];
        Header.homeListRight.classList.add('home-header__right-list');
        Header.homeListRight.classList.add('top-nav-list'); 
        Header.container.appendChild(Header.homeListRight);
        Header.imgCont = imgCont;
    },
    renderHeaderUserImg: function() {
        let image = document.createElement('img');
        image.classList.add('top-nav-list__item__image-cont__image'); 
        if(General.loggedUser.profileImg) {
            image.setAttribute('src',General.loggedUser.profileImg);
        }else {
            if(General.loggedUser.gender == 'male') {
                image.setAttribute('src','./assets/images/facebook-default-male.jpg');
            }else {
                image.setAttribute('src','./assets/images/facebook-default-female.jpg');
            }
        }
        General.removeElement(Header.imgCont);
        Header.imgCont.appendChild(image);
    },
    renderFriendsRequest: function() {
        let list = document.createElement('ul');
        list.id = 'friendsRequest';
        list.classList.add('top-sub-list');
        list.classList.add('top-sub-list--friends-request-list');
        Header.friendsRequestItem.appendChild(list);
    },
    renderMessenger: function() {
        let list = document.createElement('ul');
        list.id = 'friendsRequest';
        list.classList.add('top-sub-list');
        list.classList.add('top-sub-list--messenger-list');
        Header.messengerItem.appendChild(list);
    },
    renderNotifications: function() {
        let list = document.createElement('ul');
        list.id = 'friendsRequest';
        list.classList.add('top-sub-list');
        list.classList.add('top-sub-list--notifications-list');
        Header.notificationsItem.appendChild(list);
    },
    renderHelp: function() {
        let list = document.createElement('ul');
        list.id = 'friendsRequest';
        list.classList.add('top-sub-list');
        list.classList.add('top-sub-list--help-list');
        Header.helpItem.appendChild(list);
    },
    renderDropDown: function() {
        let list   = document.createElement('ul');
        let icon   = General.renderIcon5('fas fa-caret-up');
        let item   = '';
        let btn    = '';
        let title  = '';
        let titles = ['Create Page','','Create Group','New Groups','','Create Ads','Advertisig on Facebook','','Activity Log','News Feed Preferences','Settings','Log Out'];
        let IDs = ['createPageBtn','','createGroupBtn','newGroupBtn','','createAddBtn','advertisigBtn','','activityLogBtn','newsFeedBtn','settingsBtn','logoutBtn'];
        list.classList.add('top-sub-list');
        list.classList.add('top-sub-list--dropdown-list');
        list.setAttribute('id','dropDownSubList');
        for(let i = 0; i < 12; i++) {
            item = document.createElement('li');
            btn = document.createElement('button');
            title = document.createTextNode(titles[i]);
            btn.classList.add('top-sub-list__item__btn')
            item.classList.add('top-sub-list__item');
            btn.appendChild(title);            
            list.appendChild(item);
            if(i !== 1 && i !== 4 && i !== 7) {
                item.appendChild(btn);
                btn.setAttribute('id',IDs[i]);
            }else {
                item.classList.add('top-sub-list__item--border')
            }
        }
        icon.classList.add('top-sub-list__icon-up');
        list.appendChild(icon);
        Header.dropDownItem.appendChild(list);
    },
    
    render: function() {
        if(Authorization.authorized == false) { 
            Header.renderLoginHeader();
            Events.recoverLinkClick();
        }else {
            Header.renderHomeHeader();
            Header.renderDropDown();
            Header.renderSearchResult();
            Events.settingsClickFunc();
        } 
    }
}