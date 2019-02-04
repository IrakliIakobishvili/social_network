let Events = {
    loginBtnClickFn: function (e) {
        e.preventDefault();
        function showResultBox(txt) {
            let loginResultBox = document.getElementById('loginResultBox');
            loginResultBox.innerText = txt;
            loginResultBox.classList.add('show');
        }
        let emailInput = document.getElementById('emailInput');
        let passwordInput = document.getElementById('passwordInput');
        let inputs = [emailInput,passwordInput];
        let emptyInput = 0;
        inputs.forEach(el => {
            if(el.value.trim() == '') {
                el.classList.add('warning');
                emptyInput++;
            }else {
                el.classList.remove('warning');
            }
        });
        if(emailInput.value !== "" && !General.validateEmail(emailInput.value)) {
            showResultBox('Invalid email address!');
            emptyInput++;
        }
        inputs.forEach(input => {
            input.addEventListener('focus',function(){
                document.getElementById('loginResultBox').classList.remove('show');
            });
        });
        if(emptyInput == 0) {
            //== Ajax Start ==//
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'login', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = function(){
                if(xhr.status == 200) {
                    let response = JSON.parse(this.responseText);
                    if(response.token) {     
                        localStorage.setItem('FB_TOKEN',response.token);
                        let interval = setInterval(() => {
                            Authorization.check();
                            if(General.loggedUser !== "") {
                                clearInterval(interval);                
                                App.render();
                            }
                        },0);
                    }else {
                        if(response.info == 'Unverified Account!') {
                            inputs[1].value = '';
                        }
                        showResultBox(response.info);
                    }                    
                }                
            }
            xhr.send(JSON.stringify({
                email : emailInput.value,
                password : passwordInput.value
            }));
            //== Ajax End ==//
        }
    },
    loginBtnClick: function () {
        let loginBtn = document.getElementById('loginBtn');
        loginBtn.addEventListener('click', Events.loginBtnClickFn);
    },
    registerBtnClickFn: function (e) {
        e.preventDefault();
        function showResultBox(txt,modifier) {
            let registerResultBox = document.getElementById('registerResultBox');
            registerResultBox.innerHTML = txt;
            (modifier) ? registerResultBox.classList.add(modifier) : true;
            registerResultBox.classList.add('show');
        }
        let firstName   = document.getElementById('firstName');
        let lastName    = document.getElementById('lastName');
        let email       = document.getElementById('email');
        let password    = document.getElementById('password');        
        let monthSelect = document.getElementById('monthSelect');
        let daySelect   = document.getElementById('daySelect');
        let yearSelect  = document.getElementById('yearSelect');
        let femaleInput = document.getElementById('femaleInput');
        let maleInput   = document.getElementById('maleInput');
        let gender      = '';
        let emptyInput  = 0;
        document.querySelectorAll('input[type="radio"]').forEach(el => {
            if(el.checked) {
                gender = el.value;
            }
        });
        let inputs = [firstName,lastName,email,password,monthSelect,daySelect,yearSelect];
        let radios = [femaleInput,maleInput];
        inputs.forEach((el,i) => {
            inputs.forEach(input => {
                input.addEventListener('focus',function(){
                    document.getElementById('registerResultBox').classList.remove('show');
                });
            });
            if(el.value.trim() == '') {
                emptyInput++;
                el.classList.add('warning');
            }else {
                el.classList.remove('warning');
            }
        });
        (General.validateEmail(email.value)) ? true : (emptyInput++, email.classList.add('warning'));
        (password.value.length > 5) ? true : (emptyInput++, password.classList.add('warning'));
        radios.forEach(el => {
            if(gender == '') {
                el.nextElementSibling.classList.add('red');
                emptyInput++;
            }else {
                el.nextElementSibling.classList.remove('red');
            }            
        });
        if(emptyInput == 0) { 
            //== Ajax Start ==//          
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'register', true);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onload = function(){
                if(xhr.status == 200) {
                    let response = JSON.parse(this.responseText);
                    let output = '';
                    if(response.success == true || response.taken == false) {
                        inputs.forEach(el => {
                            el.value = '';
                        });
                        radios.forEach(el => {
                            el.checked = false;
                        }); 
                        output = "Success. A confirmation message has been sent to your email address.";
                    }else if(response.taken == false && response.success == false){
                        output = "Try Later";
                    }else if (response.taken == true && response.success == false) {
                        output = "That email address is already in use";
                    }
                    if(output == 'Success. A confirmation message has been sent to your email address.') {
                        showResultBox(output,'register-body__form__result-info--success');
                    }else {
                        showResultBox(output);   
                    }           
                }                
            }            
            xhr.send(JSON.stringify({
                firstName : firstName.value,
                lastName  : lastName.value,
                email     : email.value,
                password  : password.value,
                month     : monthSelect.value,
                day       : daySelect.value,
                year      : yearSelect.value,
                gender    : gender
            }));
            //== Ajax End ==//
        }
    },
    registerBtnClick: function () {
        let signupBtn = document.getElementById('signupBtn');
        signupBtn.addEventListener('click',Events.registerBtnClickFn);
    },
    dropDownBtnClickFn: function(e) {
        list = document.getElementById('dropDownSubList');
        icon = document.getElementById('dropDwnBtnIcon');
        list.classList.toggle('show-block');
        icon.classList.toggle('active-white');
        e.stopPropagation();
    },
    dropDownBtnClick: function() {
        Header.dropDownItem.addEventListener('click',Events.dropDownBtnClickFn);
    },
    logoutBtnClickFn: function() {
        localStorage.removeItem('FB_TOKEN');
        General.loggedUser = '';
        Header.dropDownItem.removeEventListener('click',Events.dropDownBtnClickFn);
        document.removeEventListener('click',Events.documentClickFn);
        App.render();
    }, 
    logoutBtnClick: function() {
        let logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click',Events.logoutBtnClickFn);
    },
    friendsListItemClickFn: function() {
        let userToken    = localStorage.getItem('FB_TOKEN');
        let friendToken  = this.getAttribute("token");
        let friendName   = this.querySelector('.friends__list__item__fullname').innerText;

         //== Ajax Start ==//
         var xhr = new XMLHttpRequest();
         xhr.open('POST', 'load-messages', true);
         xhr.setRequestHeader('Content-type', 'application/json');
         xhr.onload = function(){
             if(xhr.status == 200) {    
                let totalMessage = JSON.parse(this.responseText);
                let chatBoxesCont = document.querySelector('.chat-cont');
                let chatBoxes = chatBoxesCont.querySelectorAll('.chat-box');
                let sameChatBoxIsnotOpen = true;
                let extraChatBoxRendered = false;
                for(let i = 0; i < chatBoxes.length; i++) {
                    let token = chatBoxes[i].getAttribute('token');
                    if(friendToken == token) {
                        sameChatBoxIsnotOpen = false;
                        break
                    }
                    if(chatBoxes.length >= 4) {
                        extraChatBoxRendered = true;
                        break
                    }
                }
                if((sameChatBoxIsnotOpen == true) && (extraChatBoxRendered == false)) {
                    Chat.renderChatBox(totalMessage,friendName,friendToken); 
                }
             }            
         }
         xhr.send(JSON.stringify({friendTk: friendToken,userTk: userToken}));
         //== Ajax End ==//          
    },
    friendsListItemClick: function() {
        let friendsItems = document.querySelectorAll('.friends__list__item');
        friendsItems.forEach(el => {
            el.addEventListener('click',Events.friendsListItemClickFn);
        });
    },
    chatBoxEnterPressFn: function(e) {
        function Message(sender,receiver,text) {
            this.sender = sender;
            this.receiver = receiver;
            this.date = new Date(Date.now()).toLocaleString();
            this.text = text;
        }
        let chatBox = General.findParentNode(this,'chat-cont__chat-box');
        if(e.keyCode == 13 && !e.shiftKey) {
            document.execCommand('insertHTML', false, '');
            let $this = this; 
            if(this.innerText.length !== 0 && this.innerText.trim() !== "") {      
                let sender = localStorage.getItem('FB_TOKEN');
                let receiver = chatBox.getAttribute('token');  
                text = this.innerText.replace(/\n$/ig, '');                    
                let message = new Message(sender,receiver,text);
                //== Ajax Start ==//
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'send-message', true);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onload = function(){
                    if(xhr.status == 200) {
                        let totalMessage = JSON.parse(this.responseText);
                        $this.innerText = '';
                                    /*------------------------Start Message Container Founding Script---------------------------*/
                                    function scrollDownChatBody() {
                                        function findSiblingNode(el,cls) {
                                            while ((el = el.previousElementSibling) && el.className == cls);
                                            return el.nextElementSibling;
                                        }
                                        let el_11 = General.findParentNode($this,'chat-box__footer');
                                        let el_22 = General.findParentNode(el_11,'chat-box__footer');
                                        let chatBodyBody = findSiblingNode(el_22,'chat-box__body');                        
                                        chatBodyBody.scrollTop = chatBodyBody.scrollHeight;
                                    }
                                    let el_1 = General.findParentNode($this,'chat-box__footer');
                                    let el_2 = General.findParentNode(el_1,'chat-box__footer');

                                    function findSiblingNode(el,cls) {
                                        while ((el = el.previousElementSibling) && el.className == cls);
                                        return el.nextElementSibling;
                                    }
                                    let body = findSiblingNode(el_2,'chat-box__body');      
                                    msgsCont = body.firstElementChild;
                                    /*------------------------End Message Container Founding Script---------------------------*/
                                    msgsCont.innerHTML = ''
                                    for(let i = 0; i < totalMessage.length; i++) {
                                        let message     = document.createElement('div');
                                        let textCont    = document.createElement('div');
                                        let userImgCont = document.createElement('div');
                                        let userImg     = document.createElement('img');                                        
                                        textCont.classList.add('chat-box__body__message__text-cont');
                                        if(totalMessage[i].author == 'me') {
                                            message.classList.add('chat-box__body__message','chat-box__body__message--me');
                                        }else {
                                            message.classList.add('chat-box__body__message');
                                        }                                        
                                        userImgCont.classList.add('chat-box__body__message__img-cont');
                                        userImg.classList.add('chat-box__body__message__img-cont__img');
                                        if(totalMessage[i].image) {
                                            userImg.setAttribute('src',totalMessage[i].image);
                                        }else {
                                            userImg.setAttribute('src','./assets/images/facebook-default-male.jpg');
                                        }
                                        let text = document.createTextNode(totalMessage[i].text).cloneNode(true);
                                        userImgCont.appendChild(userImg);
                                        message.appendChild(userImgCont);
                                        textCont.appendChild(text);
                                        message.appendChild(textCont);
                                        msgsCont.appendChild(message);
                                    }//End for
                                 scrollDownChatBody();
                    }//status 200
                }//onload
                xhr.send(JSON.stringify({
                    newMessage: message
                }));
                //== Ajax End ==//
            }//End if
        }
    },
    chatBoxEnterPress: function() {
        let chatInputs = document.querySelectorAll('.chat-box__footer__contenteditable-cont__contenteditable');
        chatInputs.forEach(el => {
            el.addEventListener('keyup',Events.chatBoxEnterPressFn);
        });
    },
    autoUpdateChatMessageFn: function(friendToken,msgsCont) {
        let userToken = localStorage.getItem('FB_TOKEN');
         //== Ajax Start ==//
         var xhr = new XMLHttpRequest();
         xhr.open('POST', 'load-messages', true);
         xhr.setRequestHeader('Content-type', 'application/json');
         xhr.onload = function(){
             if(xhr.status == 200) {                
                let totalMessage = JSON.parse(this.responseText);
                msgsCont.innerHTML = '';
                for(let i = 0; i < totalMessage.length; i++) {
                    let message     = document.createElement('div');
                    let textCont    = document.createElement('div');
                    let userImgCont = document.createElement('div');
                    let userImg     = document.createElement('img');                    
                    textCont.classList.add('chat-box__body__message__text-cont');
                    if(totalMessage[i].author == 'me') {
                        message.classList.add('chat-box__body__message','chat-box__body__message--me');
                    }else {
                        message.classList.add('chat-box__body__message');
                    }
                    userImgCont.classList.add('chat-box__body__message__img-cont');
                    userImg.classList.add('chat-box__body__message__img-cont__img');
                    if(totalMessage[i].image) {
                        userImg.setAttribute('src',totalMessage[i].image);
                    }else {
                        userImg.setAttribute('src','./assets/images/facebook-default-male.jpg');
                    }
                    let text = document.createTextNode(totalMessage[i].text).cloneNode(true);
                    userImgCont.appendChild(userImg);
                    message.appendChild(userImgCont);
                    textCont.appendChild(text);
                    message.appendChild(textCont);
                    msgsCont.appendChild(message);
                }//End for
                msgsCont.parentNode.scrollTop = msgsCont.parentNode.scrollHeight;
             }            
         }
         xhr.send(JSON.stringify({friendTk: friendToken,userTk: userToken}));
         //== Ajax End ==//
    },
    closeChatBtnClickFn: function() {
        let chatBoxClass = 'chat-cont__chat-box chat-box';
        function findElement (el, cls) {
            while ((el = el.parentNode) && el.className.indexOf(cls) < 0);
            return el;
        }
        let chatBox = findElement(this,chatBoxClass);
        chatBox.parentNode.removeChild(chatBox);
    },
    closeChatBtnClick: function() {
        let closeChatBtns = document.querySelectorAll('.chat-box__header__btns-cont__btn--close');
        closeChatBtns.forEach(el => {
            el.addEventListener('click',Events.closeChatBtnClickFn);
        });
    },
    leftNavItemsClickFn2: function(el) {
        let btns = document.getElementsByClassName('left-navigation__list__item__btn');
        for(i = 0; i < btns.length; i++) {
            if(btns[i].classList.contains('left-navigation__list__item__btn--active')) {
                btns[i].classList.remove('left-navigation__list__item__btn--active');
            } 
        }
        el.classList.add('left-navigation__list__item__btn--active');
    },
    recoverLinkClickFn : function(e) {
        e.preventDefault();
        let clearRegisterBody = function() {
            (Recover.recoverElement) ? General.removeElement(Recover.recoverElement) : true;
            (document.querySelector('.recover-body')) ? Recover.recoverElement.parentNode.removeChild(Recover.recoverElement) : true;

            Footer.footerElement.parentNode.removeChild(Footer.footerElement);
            General.removeElement(Footer.footerElement);

            Recover.render();
            Footer.render();
        }
        clearRegisterBody();

        let recoverInput = document.getElementById('recoverInput');
        let recoverSearchbtn = document.getElementById('recoverSearchbtn');
        let recoverCancelBtn = document.getElementById('recoverCancelBtn');

        recoverSearchbtn.addEventListener('click', function() {
            if(recoverInput.value.trim() !== '') {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'recover-account', true);
                xhr.setRequestHeader('Content-type', 'application/json');        
                xhr.onload = function() {
                    if(xhr.status == 200) {
                        let recoverInfo = JSON.parse(this.responseText);
                    }
                }        
                xhr.send(JSON.stringify({
                    email : recoverInput.value
                }));
            }else {
                // console.log("Fill Recover Input!")
            }
        });
        recoverCancelBtn.addEventListener('click',function() {
            Recover.recoverElement.parentNode.removeChild(Recover.recoverElement);
                Footer.footerElement.parentNode.removeChild(Footer.footerElement);
                General.removeElement(Footer.footerElement);
                Register.render();
                Events.registerBtnClick();
                Footer.render();
        });
    },
    recoverLinkClick : function() {
        let recoverLink = document.getElementById('recoverLink');
        recoverLink.addEventListener('click', Events.recoverLinkClickFn);
        // console.log("caller is " + Events.recoverLinkClickFunc.caller);
    },
    userSearchInputKeyupFn: function() {
        let $value = this.value.replace(/ +(?=)/g,'').toLowerCase();
        let resultList = document.getElementById('searchResultList');
        if($value !== '') {         
             //== Ajax Start ==//
             var xhr = new XMLHttpRequest();
             xhr.open('POST', 'load-users', true);
             xhr.setRequestHeader('Content-type', 'application/json');
             xhr.onload = function(){
                if(xhr.status == 200) {                
                    let matchedUsers = JSON.parse(this.responseText);
                    (matchedUsers.length) ? resultList.classList.add('show-block') : resultList.classList.remove('show-block');
                    resultList.innerHTML = '';
                    for(let i = 0; i < matchedUsers.length; i++) {
                        let matchedUser = matchedUsers[i];
                        Header.renderSearchResultItem(matchedUser.image,matchedUser.firstName,matchedUser.lastName,matchedUser.token,matchedUser.gender);
                    }
                }            
           }
           xhr.send(JSON.stringify({typedValue: $value}));
           //== Ajax End ==//
        }else {
            resultList.innerHTML = '';
            resultList.classList.remove('show-block');
        }
    },
    userSearchInputKeyup: function(input) {
        input.addEventListener('keyup',Events.userSearchInputKeyupFn);
    },
    searchedUserItemClickFn: function() {
        let targetToken = this.getAttribute('token');
        //== Ajax Start ==//
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'search-user', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onload = function(){
            if(xhr.status == 200) {
                let response = JSON.parse(this.responseText);
                General.searchedUser = response;
                General.removeElement(document.querySelector('.main-content'));
                Cover.render();                
                if(General.loggedUser.token !== General.searchedUser.user.token) {
                    Cover.renderAddRemoveFriendBtn(General.searchedUser.user.token);
                    Cover.renderSendMessageBtn(General.searchedUser.user.token);
                }
                Cover.renderCoverImg(General.searchedUser.user.coverImg);                
                Timeline.render(General.searchedUser.user.token);
                Aside.render();
                Profile.render();
                document.getElementById('timeline').setAttribute('data-owner','otherUser');
                document.getElementById('userSearchInput').value = '';
                document.querySelectorAll('.left-nav__list__item__btn').forEach(el => {
                    el.classList.remove('left-nav__list__item__btn--active');
                });                         
            }                
        }
        xhr.send(JSON.stringify({
            targetToken : targetToken
        }));
        //== Ajax End ==//
    },
    searchedUserItemClick: function(element) {
        element.addEventListener('click',Events.searchedUserItemClickFn);
    },
    leftNavBtnsClickFn: function() {
        document.querySelectorAll('.left-nav__list__item__btn').forEach(el => {
            el.classList.remove('left-nav__list__item__btn--active');
        });
        this.classList.add('left-nav__list__item__btn--active');
        General.removeElement(document.querySelector('.main-content'));
        let id = this.getAttribute('id');
        Cover.render();
        switch (id) {
            case 'leftBtnHome':
                Timeline.render();
                Aside.render();
                Community.render();
                break
            case 'leftBtnPosts':
                Timeline.render();
                Aside.render();
                Community.render();               
                break
            case 'leftBtnPhotos':
                Photos.render();
                break
            case 'leftBtnVideos':
                Videos.render();
                break
            case 'leftBtnAbout':
                About.render();
                break
        }
    },
    leftNavBtnsClick: function() {
        let btns = document.querySelectorAll('.left-nav__list__item__btn');
        btns.forEach(btn => {
            btn.addEventListener('click',Events.leftNavBtnsClickFn);
        });
    },
    topNavBtnsClickFn: function() {
        if(this.classList.contains('top-nav-list__item--name')) {
            document.querySelectorAll('.left-nav__list__item__btn').forEach(el => {
                el.classList.remove('left-nav__list__item__btn--active');
            });
            document.getElementById('leftBtnAbout').classList.add('left-nav__list__item__btn--active');
            General.removeElement(document.querySelector('.main-content'));
            Cover.render();
            About.render();
        }else if(this.classList.contains('top-nav-list__item--home')) {
            document.querySelectorAll('.left-nav__list__item__btn').forEach(el => {
                el.classList.remove('left-nav__list__item__btn--active');
            });
            document.getElementById('leftBtnHome').classList.add('left-nav__list__item__btn--active');
            General.removeElement(document.querySelector('.main-content'));
            Cover.render();
            Timeline.render();
            Aside.render();
            Community.render();
        }else if(this.classList.contains('top-nav-list__item--find-friends')) {
            document.getElementById('userSearchInput').focus();
        }else if(this.classList.contains('top-nav-list__item--friends-requests')) {

        }
    },
    topNavBtnsClick: function() {
        let btns = document.querySelectorAll('.home-header__right-list__item');
        btns.forEach(btn => {
            btn.addEventListener('click',Events.topNavBtnsClickFn);
        });
    },
    addPhotoInputChangeFn: function() {
        let token           = localStorage.getItem('FB_TOKEN'); 
        let spiner          = document.querySelector('.spinner--upload-image');
        let $this           = this;
      
        if(this.value !== "")  {
            let file            = this.files[0];
            let fileType        = file["type"];
            let ValidImageTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];

            if(this.value !== "" && ValidImageTypes.indexOf(fileType) > -1) {
                let showSpinner = setTimeout(() => {
                    spiner.classList.add('show');
                }, 1000);
                $this.setAttribute('disabled',true);
                let formData = new FormData();
                formData.append('image', file);
                formData.append('token', token);
    
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'upload-image', true);
        
                xhr.onload = function(){
                    if(xhr.status == 200) {
                        let newImg = JSON.parse(this.responseText);
                        General.loggedUser.photos.push(newImg);
                        Photos.renderPhotoItem([newImg]);
                        $this.value = '';
                    }
                    clearTimeout(showSpinner);
                    spiner.classList.remove('show');
                    $this.removeAttribute('disabled');   
                }
    
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentage = (e.loaded / e.total) * 100;
                        // console.log(percentage);
                    }
                };
                xhr.send(formData);
            }else {
                // console.log('Allowed file types: jpg, png, gif');
            }
        }else {
            // console.log('Select File!');
        }
    },
    addPhotoInputChange: function(element) {
        element.addEventListener('change',Events.addPhotoInputChangeFn);
    },
    setPhotoBtnsClickFn: function() {
        let token  = localStorage.getItem('FB_TOKEN');
        let imgUrl = this.parentNode.parentNode.querySelector('.main-content__photos__item__img').getAttribute('src');
        let btn    = this.getAttribute('data-btn');
        let $this  = this;

        let updateImg = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onload = function(){
                if(xhr.status == 200) {
                    let response = JSON.parse(this.responseText);

                    if(response.img == 'profile') {
                        General.loggedUser.profileImg = response.url;
                        Navigation.renderProfileImg();
                        Header.renderHeaderUserImg();
                        $this.removeAttribute('disabled',true);
                    }else if(response.img == 'cover') {
                        General.loggedUser.coverImg = response.url;
                        Cover.renderCoverImg(General.loggedUser.coverImg);
                        $this.removeAttribute('disabled',true);
                    }else if(response.img == 'deleted') { 
                        for(let i = 0; i < General.loggedUser.photos.length; i++) {
                            if(General.loggedUser.photos[i].name == imgUrl.split('/')[1]){
                                General.loggedUser.photos = response.photos;
                                (General.loggedUser.profileImg == imgUrl) ? General.loggedUser.profileImg = '' : true;
                                (General.loggedUser.coverImg == imgUrl) ? General.loggedUser.coverImg = '' : true;
                                $this.parentNode.parentNode.parentNode.removeChild($this.parentNode.parentNode);
                                
                                Navigation.renderProfileImg();
                                Header.renderHeaderUserImg();
                                Cover.renderCoverImg(General.loggedUser.coverImg);
                                $this.removeAttribute('disabled',true);                                
                            }                            
                        }   
                        document.querySelectorAll('.main-content__photos__item__btn-cont__btn--delete').forEach(el => {
                            el.removeAttribute('disabled',true);
                        });             
                    }        
                }                
            }
            xhr.send(JSON.stringify({
                token  : token,
                imgUrl : imgUrl
            }));
        };

        if(btn == 'profile') {
            updateImg('change-profile-image');
            Navigation.renderProfileImg();
        }else if(btn == 'cover') {
            updateImg('change-cover-image');
        }else if(btn == 'deletePhoto') {
            document.querySelectorAll('.main-content__photos__item__btn-cont__btn--delete').forEach(el => {
                el.setAttribute('disabled',true);
            });
            updateImg('delete-image');
        }
    },
    setPhotoBtnsClick: function(btns) {
        btns.forEach(btn => {
            btn.addEventListener('click',Events.setPhotoBtnsClickFn);
        });
    },



    addVideoInputChangeFn: function() {
        let token           = localStorage.getItem('FB_TOKEN'); 
        let spiner          = document.querySelector('.spinner--upload-video');
        let $this           = this;
      
        if(this.value !== "")  {
            let file            = this.files[0];
            let fileType        = file["type"];
            let ValidVideoTypes = ['video/mp4'];
            if(this.value !== "" && ValidVideoTypes.indexOf(fileType) > -1) {
                let showSpinner = setTimeout(() => {
                    spiner.classList.add('show');
                }, 1000);
                $this.setAttribute('disabled',true);
                let formData = new FormData();
                formData.append('video', file);
                formData.append('token', token);
    
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'upload-video', true);
        
                xhr.onload = function(){
                    if(xhr.status == 200) {
                        let newVid = JSON.parse(this.responseText);
                        General.loggedUser.videos.push(newVid);
                        Videos.renderVideosItems([newVid]);
                        this.value = '';
                    }
                    clearTimeout(showSpinner);
                    spiner.classList.remove('show');
                    $this.removeAttribute('disabled');      
                }
    
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentage = (e.loaded / e.total) * 100;
                        // console.log(percentage);
                    }
                };
                xhr.send(formData);
            }else {
                // console.log('Allowed file types: mp4');
            }
        }else {
            // console.log('Select File!');
        }
    },
    addVideoInputChange: function(element) {
        element.addEventListener('change',Events.addVideoInputChangeFn);
    },
    videoMouseoverFn: function() {
        this.play();
    },
    videoMouseoutFn: function() {
        this.pause();
    },
    videoHover: function(video) {
        video.addEventListener('mouseover',Events.videoMouseoverFn);
        video.addEventListener('mouseout',Events.videoMouseoutFn);
    },

    settingsFunc : function() {
        let renderFunc = function() {
            Main.main.parentNode.removeChild(Main.main);
            Main.render();
            Cover.render();
            Settings.render();
        }
        renderFunc();
    },
    
    settingsClickFunc : function() {
        let settingsBtn = document.getElementById('settingsBtn');
        settingsBtn.addEventListener('click', Events.settingsFunc);
    },
    
    resetPasswordFunc : function() {
        let newPasswordInp = document.getElementById('newPassword');
        let confirmPasswordInp = document.getElementById('confirmPassword');
        let message = document.getElementById('passwordConfirmationMsg');
        let inputs = [newPasswordInp, confirmPasswordInp];
        let invalidInpCount = 0;
        let userToken = localStorage.getItem('FB_TOKEN');
    
        if(newPasswordInp.value == confirmPasswordInp.value) {
            inputs.forEach(function(el){
                if(el.value.trim() == '') {
                    el.classList.add('warning-2');
                    message.innerHTML = 'empty input';
                    invalidInpCount++
                } else if(el.value.length < 6) {
                    el.classList.add('warning2');
                    message.innerHTML = 'password is too short';
                    invalidInpCount++
                } else {
                    el.classList.remove('warning-2');
                    message.innerHTML = '';
                }
            });
        } else {
            confirmPasswordInp.classList.add('warning-2');
            message.innerHTML = 'passwords do not match';
            invalidInpCount++
        }
    
        if(invalidInpCount == 0) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'password-change', true);
            xhr.setRequestHeader('Content-type', 'application/json');
    
            xhr.onload = function() {
                if(xhr.status == 200) {
                    message.innerHTML = this.responseText;
                }
            }
    
            xhr.send(JSON.stringify(
                {
                    user : userToken,
                    newPassword : newPasswordInp.value
                }
            ))
        }
    },
    
    resetPasswordClickFunc : function() {
        let resetPasswordBtn = document.getElementById('resetPasswordBtn');
        resetPasswordBtn.addEventListener('click', Events.resetPasswordFunc);
    },

    resetEmailFunc : function() {
        let newEmailInp = document.getElementById('newEmail');
        let confirmEmailInp = document.getElementById('confirmEmail');
        let message = document.getElementById('emailConfirmationMsg');
        let invalidInpCount = 0;
        let userToken = localStorage.getItem('FB_TOKEN');

        if(newEmailInp.value == confirmEmailInp.value) {
            if(newEmailInp.value.indexOf('@') > -1 && newEmailInp.value.indexOf('.') > -1) {
                newEmailInp.classList.remove('warning-2');
                confirmEmailInp.classList.remove('warning-2');
            } else {
                newEmailInp.classList.add('warning-2');
                confirmEmailInp.classList.add('warning-2');
                message.innerHTML = 'invalid email';
                invalidInpCount++;
            }
        } else {
            confirmEmailInp.classList.add('warning-2');
            message.innerHTML = 'Emails do not match';
            invalidInpCount++;
        }

        if(invalidInpCount == 0) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'email-change', true);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onload = function() {
                if(xhr.status == 200) {
                    message.innerHTML = this.responseText;
                }
            }

            xhr.send(JSON.stringify(
                {
                    user : userToken,
                    newEmail : newEmailInp.value
                }
            ))
        }
    },

    resetEmailClickFunc : function() {
        let resetEmailBtn = document.getElementById('resetEmailBtn');
        resetEmailBtn.addEventListener('click', Events.resetEmailFunc);
    },

    addPostTextareaEnterFn: function(e) {
        if(e.keyCode == 13 && !e.shiftKey && this.value.trim() !== '') {
            let author = localStorage.getItem('FB_TOKEN');
            let postValue = this.value;
            let $this = this;
            //== Ajax Start ==//
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'add-post', true);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onload = function(){
                if(xhr.status == 200) {
                    let response = JSON.parse(this.responseText);
                    Timeline.renderGetPost(
                        response.token,
                        response.firstName,
                        response.lastName,
                        response.image,
                        response.id,
                        response.date,
                        response.text,
                        response.likes,
                        response.comments,
                        response.shares
                    );
                    $this.value = '';              
                }                
            }
            xhr.send(JSON.stringify({
                author : author,
                postValue : postValue
            }));
            //== Ajax End ==//
        }
    },
    addPostTextareaEnter: function(element) {
        element.addEventListener('keyup',Events.addPostTextareaEnterFn);
    },
    loadPostsFn: function($token) {
        //== Ajax Start ==//
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'load-posts', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onload = function(){
            if(xhr.status == 200) {
                let response = JSON.parse(this.responseText);
                response.forEach((el,i) => {
                    Timeline.renderGetPost(
                        response[i].token,
                        response[i].firstName,
                        response[i].lastName,
                        response[i].image,
                        response[i].id,
                        response[i].date,
                        response[i].text,
                        response[i].likes,
                        response[i].comments,
                        response[i].shares
                    );
                })          
            }                
        }
        xhr.send(JSON.stringify({
            author : $token
        }));
        //== Ajax End ==//
    },
    likeBtnClickFn: function() {
        function findAncestor (el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
        let post       = findAncestor(this,'post');
        let postId     = post.getAttribute('data-post-id');
        let likeAuthor = General.loggedUser.token;
        let $this = this;        
        //== Ajax Start ==//
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'like-post', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onload = function(){
            if(xhr.status == 200) {
                let response = JSON.parse(this.responseText);
                post.querySelector('.post__footer__statistic__likes__total').innerText = response.likes.length;

                if(response.likes.includes(General.loggedUser.token)) {
                    $this.classList.add('post__footer__list__item__btn--liked');  
                    $this.classList.remove('post__footer__list__item__btn--like');
                }else {
                    $this.classList.add('post__footer__list__item__btn--like');
                    $this.classList.remove('post__footer__list__item__btn--liked'); 
                }    
            }                
        }
        xhr.send(JSON.stringify({
            postId : postId,
            likeAuthor : likeAuthor
        }));
        //== Ajax End ==//        
    },
    likeBtnClick: function(el) {
        el.addEventListener('click', Events.likeBtnClickFn);
    },
    deleltePostBtnClickFn: function() {
        function findAncestor (el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
        let post       = findAncestor(this,'post');
        let postId     = post.getAttribute('data-post-id');
        let likeAuthor = General.loggedUser.token;
        let $this = this;        
        //== Ajax Start ==//
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'delete-post', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onload = function(){
            if(xhr.status == 200) {
                let response = this.responseText;   
                post.parentNode.removeChild(post);                   
            }                
        }
        xhr.send(JSON.stringify({
            postId : postId,
            likeAuthor : likeAuthor
        }));
        //== Ajax End ==//        
    },
    deleltePostBtnClick: function(el) {
        el.addEventListener('click', Events.deleltePostBtnClickFn);
    },
    addRemoveFriendBtnClickFn: function() {
        let loggedUser = General.loggedUser.token;
        let searchedUser = General.searchedUser.user.token;
        //== Ajax Start ==//
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'add-remove-friend', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onload = function(){
            if(xhr.status == 200) {
                let response = JSON.parse(this.responseText);
                General.loggedUser = response;
                Cover.renderAddRemoveFriendBtn(searchedUser); 
                Friends.render();     
            }                
        }
        xhr.send(JSON.stringify({
            loggedUser : loggedUser,
            searchedUser : searchedUser
        }));
        //== Ajax End ==//
    },
    addRemoveFriendBtnClick: function(el) {
        el.addEventListener('click',Events.addRemoveFriendBtnClickFn);
    },
    sendMessageBtnClickFn: function() {
        let userToken    = localStorage.getItem('FB_TOKEN');
        let friendToken  = this.getAttribute("data-user-token");
        let friendName   = General.searchedUser.user.firstName+' '+General.searchedUser.user.lastName;

         //== Ajax Start ==//
         var xhr = new XMLHttpRequest();
         xhr.open('POST', 'load-messages', true);
         xhr.setRequestHeader('Content-type', 'application/json');
         xhr.onload = function(){
             if(xhr.status == 200) {    
                 let totalMessage = JSON.parse(this.responseText);
                // /*---------------------------------------------------------*/
                let chatBoxesCont = document.querySelector('.chat-cont');
                let chatBoxes = chatBoxesCont.querySelectorAll('.chat-box');
                let sameChatBoxIsnotOpen = true;
                let extraChatBoxRendered = false;
                for(let i = 0; i < chatBoxes.length; i++) {
                    let token = chatBoxes[i].getAttribute('token');
                    if(friendToken == token) {
                        sameChatBoxIsnotOpen = false;
                        break
                    }
                    if(chatBoxes.length >= 4) {
                        extraChatBoxRendered = true;
                        break
                    }
                }
                if((sameChatBoxIsnotOpen == true) && (extraChatBoxRendered == false)) {
                    Chat.renderChatBox(totalMessage,friendName,friendToken);  
                }
                /*---------------------------------------------------------*/
             }            
         }
         xhr.send(JSON.stringify({friendTk: friendToken,userTk: userToken}));
         //== Ajax End ==//          
    },
    sendMessageBtnClick: function(el) {        
        el.addEventListener('click',Events.sendMessageBtnClickFn);
    },
    stopPropagation: function(e) {
        e.stopPropagation();
    },
    documentClickFn: function() {
        let elements = [
            document.getElementById('dropDownSubList'),
            document.getElementById('dropDwnBtnIcon'),
            document.getElementById('searchResultList')
        ];
        elements.forEach(el => {
            el.classList.remove('show-block');
            el.classList.remove('active-white');
        });
    },
    documentClick: function() {
        document.addEventListener('click',Events.documentClickFn);
    },
    add: function () {
        if(Authorization.authorized == false) {
            Events.loginBtnClick();
            Events.registerBtnClick();
        }else {
            Events.dropDownBtnClick();
            Events.documentClick();
            Events.logoutBtnClick(); 
            Events.leftNavBtnsClick();  
            Events.topNavBtnsClick();  
        }
    }
}