const Chat = {
    chatContainer: '',

    renderChatContainer: function() {
        let chatCont = document.createElement('div');
        chatCont.classList.add('chat-cont');
        Chat.chatContainer = chatCont;
        General.root.appendChild(Chat.chatContainer);
    },
    renderChatBox: function(messages,friendName,token) {
        let totalMessage = messages;
        
        let chatBox = document.createElement('div');
        chatBox.classList.add('chat-cont__chat-box','chat-box');
        chatBox.setAttribute('token',token);

        let header = document.createElement('div');
        let body   = document.createElement('div');
        let footer = document.createElement('div');

        //== Header ==//
        /*------------------Start Full Name---------------------*/
        let fullNameCont   = document.createElement('div');
        let fullNameLink   = document.createElement('a');
        let fullName       = document.createTextNode(friendName);
        fullNameCont.classList.add('chat-box__header__full-name-cont');
        fullNameLink.classList.add('chat-box__header__full-name-cont__full-name');
        fullNameLink.setAttribute('href','');
        fullNameLink.setAttribute('token',token);
        fullNameLink.addEventListener('click',function(e){e.preventDefault()});
        Events.searchedUserItemClick(fullNameLink);
        fullNameLink.appendChild(fullName);
        fullNameCont.appendChild(fullNameLink);
        header.appendChild(fullNameCont);
        /*--------------------End Full Name--------------------*/

        let headerBtnsCont = document.createElement('div');
        let videoChatBtn   = document.createElement('button');
        let voiceCallBtn   = document.createElement('button');
        let showOptionsBtn = document.createElement('button');
        let closeTabBtn    = document.createElement('button');

        let cameraIcon     = General.renderIcon4('fa-video-camera');
        let phoneIcon      = General.renderIcon4('fa-phone');
        let settingsIcon   = General.renderIcon4('fa-cog');
        let closeIcon      = General.renderIcon5('fas fa-times');

        header.classList.add('chat-box__header');        

        headerBtnsCont.classList.add('chat-box__header__btns-cont');
        videoChatBtn.classList.add('chat-box__header__btns-cont__btn','chat-box__header__btns-cont__btn--video');
        voiceCallBtn.classList.add('chat-box__header__btns-cont__btn','chat-box__header__btns-cont__btn--voice');
        showOptionsBtn.classList.add('chat-box__header__btns-cont__btn','chat-box__header__btns-cont__btn--options');
        closeTabBtn.classList.add('chat-box__header__btns-cont__btn','chat-box__header__btns-cont__btn--close');

        videoChatBtn.appendChild(cameraIcon);
        voiceCallBtn.appendChild(phoneIcon);
        showOptionsBtn.appendChild(settingsIcon);
        closeTabBtn.appendChild(closeIcon);

        headerBtnsCont.appendChild(videoChatBtn);
        headerBtnsCont.appendChild(voiceCallBtn);
        headerBtnsCont.appendChild(showOptionsBtn);
        headerBtnsCont.appendChild(closeTabBtn);

        header.appendChild(headerBtnsCont);

        //== Body ==//
        body.classList.add('chat-box__body');
        let msgsCont    = document.createElement('div');

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

        msgsCont.classList.add('chat-box__body__messages-container');
        body.appendChild(msgsCont);

        //== Footer ==//
        footer.classList.add('chat-box__footer');
        let moreActions      = document.createElement('button');
        let moreActionsIcon  = General.renderIcon5('fas fa-th');
        let contentEdtblCont = document.createElement('div'); 
        let contenteditable  = document.createElement('div');
        let thumbsUp         = document.createElement('button');
        let thumbsUpIcon     = General.renderIcon4('fa-thumbs-o-up');
        let btnsList         = document.createElement('ul');
        let emojiItem        = document.createElement('li');
        let photosItem       = document.createElement('li');
        let stickerItem      = document.createElement('li');
        let gifItem          = document.createElement('li');               
        let emojiBtn         = document.createElement('button');
        let photosBtn        = document.createElement('button');
        let stickerBtn       = document.createElement('button');
        let gifBtn           = document.createElement('button');

        let emojiIcon        = General.renderIcon4('fa-smile-o');
        let photosIcon       = General.renderIcon4('fa-camera-retro');
        let stickerIcon      = General.renderIcon4('fa-picture-o');
        let gifIcon          = General.renderIcon4('fa-globe');

        moreActions.classList.add('chat-box__footer__btn', 'chat-box__footer__btn--more-action');
        contentEdtblCont.classList.add('chat-box__footer__contenteditable-cont');
        contenteditable.classList.add('chat-box__footer__contenteditable-cont__contenteditable');
        thumbsUp.classList.add('chat-box__footer__btn', 'chat-box__footer__btn--thumbs-up');
        btnsList.classList.add('chat-box__footer__btns-list');

        emojiBtn.classList.add('chat-box__footer__btns-list__item__btn','chat-box__footer__btns-list__item__btn--emoji');
        photosBtn.classList.add('chat-box__footer__btns-list__item__btn','chat-box__footer__btns-list__item__btn--photos');
        stickerBtn.classList.add('chat-box__footer__btns-list__item__btn','chat-box__footer__btns-list__item__btn--sticker');
        gifBtn.classList.add('chat-box__footer__btns-list__item__btn','chat-box__footer__btns-list__item__btn--gif');

        emojiItem.classList.add('chat-box__footer__btns-list__item');
        photosItem.classList.add('chat-box__footer__btns-list__item');
        stickerItem.classList.add('chat-box__footer__btns-list__item');
        gifItem.classList.add('chat-box__footer__btns-list__item');

        contenteditable.setAttribute('placeholder','Type a message...');
        contenteditable.setAttribute('contenteditable','true');
        thumbsUp.setAttribute('title','Thumbs Up Sign');

        emojiBtn.appendChild(emojiIcon);
        photosBtn.appendChild(photosIcon);
        stickerBtn.appendChild(stickerIcon);
        gifBtn.appendChild(gifIcon);

        emojiItem.appendChild(emojiBtn);
        photosItem.appendChild(photosBtn);
        stickerItem.appendChild(stickerBtn);
        gifItem.appendChild(gifBtn);
        contentEdtblCont.appendChild(contenteditable);
        thumbsUp.appendChild(thumbsUpIcon);

        btnsList.appendChild(emojiItem);
        btnsList.appendChild(photosItem);
        btnsList.appendChild(stickerItem);
        btnsList.appendChild(gifItem);
        moreActions.appendChild(moreActionsIcon);
        footer.appendChild(moreActions);
        contentEdtblCont.appendChild(btnsList);      
        footer.appendChild(contentEdtblCont);
        footer.appendChild(thumbsUp);

        chatBox.appendChild(header);
        chatBox.appendChild(body);
        chatBox.appendChild(footer);

        Chat.chatContainer.insertBefore(chatBox, Chat.chatContainer.childNodes[0]);
        Events.chatBoxEnterPress();

        /*-------------------------------------------*/
        let createInterval = function(tokenValue){
            let interval = setInterval(function(){
                if(document.querySelector("div[token='"+tokenValue+"']") == null){
                    clearInterval(interval);
                }else{
                    Events.autoUpdateChatMessageFn(token,msgsCont);
                }
            },1000);
        };
        createInterval(token);
        /*-------------------------------------------*/

        body.scrollTop = body.scrollHeight;
        Events.closeChatBtnClick();
    },

    render: function() {
        if(Authorization.authorized) {
            Chat.renderChatContainer();
        }
    }
}