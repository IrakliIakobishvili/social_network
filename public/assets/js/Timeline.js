const Timeline = {
    timelineEl: '',
    postsCont: '',
    commentsList: '',
    header: '',
    renderTimeline: function() {
        let timeline = document.createElement('div');
        timeline.classList.add('timeline');
        timeline.id = 'timeline';
        Timeline.timelineEl = timeline;
        Main.main.appendChild(Timeline.timelineEl);
    },
    renderPostsCont: function() {
        let postsCont = document.createElement('div');
        postsCont.classList.add('timeline__posts');
        Timeline.timelineEl.appendChild(postsCont);
        Timeline.postsCont = postsCont;
    },
    renderAddPost: function() {
        let addPost    = document.createElement('div');
        let textarea   = document.createElement('textarea');
        let userImgCon = document.createElement('div');
        let userImg    = document.createElement('img');
        let topList    = document.createElement('ul');
        let bottomList = document.createElement('ul');
        let items      = ['post','live','event','offer','job','photo','feeling','checkin','dots'];
        let btnTxts    = ['Create Post','Live','Event','Offer','Job','Photo/Video','Feeling/Activ...','Check In','....'];
        let item       = '';
        let btn        = '';
        let btnTxt     = '';
        let className  = '';
        addPost.classList.add('add-post');
        textarea.classList.add('add-post__textarea');
        textarea.id = 'addPostTextarea';
        textarea.setAttribute('placeholder','Write a post...');
        userImgCon.classList.add('add-post__img-cont');
        userImg.classList.add('add-post__img-cont__image');
        if(General.loggedUser.profileImg) {
            userImg.setAttribute('src',General.loggedUser.profileImg);
        }else {
            if(General.loggedUser.gender == 'male') {
                userImg.setAttribute('src','./assets/images/facebook-default-male.jpg');
            }else {
                userImg.setAttribute('src','./assets/images/facebook-default-female.jpg');
            }
        }        
        topList.classList.add('add-post__top-list');
        bottomList.classList.add('add-post__bottom-list');
        items.map((element,index) => {
            item   = document.createElement('li');
            btn    = document.createElement('button');
            btnTxt = document.createTextNode(btnTxts[index]);
            (index <= 4) ? (topList.appendChild(item), className = 'add-post__top-list__item') : (bottomList.appendChild(item), className = 'add-post__bottom-list__item');
            item.classList.add(className,className+'--'+items[index]);
            item.setAttribute('id',items[index]+'Btn');
            (index == 0) ? item.classList.add(className+'--active') : true;
            btn.appendChild(btnTxt);
            item.appendChild(btn);
        });
        addPost.appendChild(topList);
        addPost.appendChild(textarea);
        userImgCon.appendChild(userImg);
        addPost.appendChild(userImgCon);
        addPost.appendChild(bottomList);
        Timeline.timelineEl.appendChild(addPost);        
        Events.addPostTextareaEnter(textarea);
    },
    renderGetPost: function($token,$firstName,$lastName,$image,$id,$date,$text,$likes,$comments,$shares) {
        let post          = document.createElement('div');
        let header        = document.createElement('header');
        let main          = document.createElement('main');
        let mainP         = document.createElement('p');
        let statistic     = document.createElement('div');
        let totalLike     = document.createElement('span');
        let likeTxtSpan   = document.createElement('span');
        let likesCount    = document.createElement('span');
        let commentsCount = document.createElement('span');
        let sharesCount   = document.createElement('span');
        let footer        = document.createElement('footer');
        let heading       = document.createElement('h2');
        let imgCont       = document.createElement('div');
        let img           = document.createElement('img');
        let infoCont      = document.createElement('div');
        let date          = document.createElement('span');
        let list          = document.createElement('ul');
        let itemLike      = document.createElement('li');
        let itemComment   = document.createElement('li');
        let itemShare     = document.createElement('li');
        let likeBtn       = document.createElement('button');
        let commentBtn    = document.createElement('button');
        let shareBtn      = document.createElement('button');
        let commentsList  = document.createElement('list');
        let headingTxt    = '';
        if(General.loggedUser.token !== $token) {
            if($shares.includes(General.loggedUser.token) && Timeline.timelineEl.getAttribute('data-owner') == null) {
                headingTxt = document.createTextNode(General.loggedUser.firstName +' '+General.loggedUser.lastName);                
                let sharedFrom = document.createElement('span');
                sharedFrom.classList.add('post__header__info-cont__heading__shared');
                let sharedFromLink = document.createElement('a');
                sharedFromLink.classList.add('post__header__info-cont__heading__shared__link');
                sharedFromLink.setAttribute('title',$firstName+' '+$lastName);
                sharedFromLink.setAttribute('href',$token);
                sharedFromLink.addEventListener('click',function(e){e.preventDefault()}); 
                sharedFromLink.appendChild(document.createTextNode('post'));
                sharedFrom.appendChild(document.createTextNode(' shared a '));
                sharedFrom.appendChild(sharedFromLink);
                heading.appendChild(headingTxt);
                heading.appendChild(sharedFrom);
            }else {
                if(General.searchedUser.user.token == $token) {
                    headingTxt = document.createTextNode(General.searchedUser.user.firstName +' '+General.searchedUser.user.lastName);
                    heading.appendChild(headingTxt);
                }else {
                    headingTxt = document.createTextNode(General.searchedUser.user.firstName +' '+General.searchedUser.user.lastName);                    
                    let sharedFrom = document.createElement('span');
                    sharedFrom.classList.add('post__header__info-cont__heading__shared');
                    let sharedFromLink = document.createElement('a');
                    sharedFromLink.classList.add('post__header__info-cont__heading__shared__link');
                    sharedFromLink.setAttribute('title',$firstName+' '+$lastName);
                    sharedFromLink.setAttribute('href',$token);
                    sharedFromLink.addEventListener('click',function(e){e.preventDefault()});
                    sharedFromLink.appendChild(document.createTextNode('post'));
                    sharedFrom.appendChild(document.createTextNode(' shared a '));
                    sharedFrom.appendChild(sharedFromLink);
                    heading.appendChild(headingTxt);
                    heading.appendChild(sharedFrom);
                } 
            }
        }else if(General.loggedUser.token == $token && Timeline.timelineEl.getAttribute('data-owner') == 'otherUser'){
            headingTxt = document.createTextNode(General.searchedUser.user.firstName +' '+General.searchedUser.user.lastName);            
            let sharedFrom = document.createElement('span');
            sharedFrom.classList.add('post__header__info-cont__heading__shared');
            let sharedFromLink = document.createElement('a');
            sharedFromLink.classList.add('post__header__info-cont__heading__shared__link');
            sharedFromLink.setAttribute('title',$firstName+' '+$lastName);
            sharedFromLink.setAttribute('href',$token);
            sharedFromLink.addEventListener('click',function(e){e.preventDefault()}); 
            sharedFromLink.appendChild(document.createTextNode('post'));
            sharedFrom.appendChild(document.createTextNode(' shared a '));
            sharedFrom.appendChild(sharedFromLink);
            heading.appendChild(headingTxt);
        }else {
            headingTxt = document.createTextNode($firstName +' '+$lastName);
            heading.appendChild(headingTxt);
        }
        let dateTxt       = document.createTextNode($date);
        let postTxt       = document.createTextNode($text);
        let likesNum      = document.createTextNode($likes.length); 
        let commentsNum   = document.createTextNode($comments.length+' Comment');
        let sharesNum     = document.createTextNode($shares.length+' Share');
        Timeline.commentsList = commentsList;
        post.classList.add('post');
        post.setAttribute('data-post-id',$id);
        header.classList.add('post__header');
        imgCont.classList.add('post__header__img-cont');
        img.classList.add('post__header__img-cont__img');
        infoCont.classList.add('post__header__info-cont');
        heading.classList.add('post__header__info-cont__heading');
        date.classList.add('post__header__info-cont__date');
        main.classList.add('post__main');
        mainP.classList.add('post__main__paragraph');
        footer.classList.add('post__footer');
        statistic.classList.add('post__footer__statistic');
        likesCount.classList.add('post__footer__statistic__likes');
        commentsCount.classList.add('post__footer__statistic__comments');
        sharesCount.classList.add('post__footer__statistic__shares');
        list.classList.add('post__footer__list');
        itemLike.classList.add('post__footer__list__item','post__footer__list__item--like');
        itemComment.classList.add('post__footer__list__item','post__footer__list__item--comment');
        itemShare.classList.add('post__footer__list__item','post__footer__list__item--share');
        likeBtn.classList.add('post__footer__list__item__btn');
        totalLike.classList.add('post__footer__statistic__likes__total');
        likeTxtSpan.classList.add('post__footer__statistic__likes__name');

        if($likes.includes(General.loggedUser.token)) {
            likeBtn.classList.add('post__footer__list__item__btn--liked'); 
        }else {
            likeBtn.classList.add('post__footer__list__item__btn--like'); 
        }
        commentBtn.classList.add('post__footer__list__item__btn','post__footer__list__item__btn--comment');
        shareBtn.classList.add('post__footer__list__item__btn','post__footer__list__item__btn--share');
        if(General.loggedUser.token !== $token) {
            if($shares.includes(General.loggedUser.token) && Timeline.timelineEl.getAttribute('data-owner') == null) {
                $image = General.loggedUser.profileImg;
                if($image == '') {
                    if(General.loggedUser.gender == 'male') {
                        img.setAttribute('src','./assets/images/facebook-default-male.jpg');
                    }else {
                        img.setAttribute('src','./assets/images/facebook-default-female.jpg');
                    }
                }else {
                    img.setAttribute('src',$image);
                }
            }else {
                $image = General.searchedUser.user.profileImg;
                if($image == '') {
                    if(General.searchedUser.user.gender == 'male') {
                        img.setAttribute('src','./assets/images/facebook-default-male.jpg');
                    }else {
                        img.setAttribute('src','./assets/images/facebook-default-female.jpg');
                    }
                }else {
                    img.setAttribute('src',$image);
                }
            }
        }else if(General.loggedUser.token == $token && Timeline.timelineEl.getAttribute('data-owner') == 'otherUser'){
            $image = General.searchedUser.user.profileImg;
            if($image == '') {
                if(General.searchedUser.user.gender == 'male') {
                    img.setAttribute('src','./assets/images/facebook-default-male.jpg');
                }else {
                    img.setAttribute('src','./assets/images/facebook-default-female.jpg');
                }
            }else {
                img.setAttribute('src',$image);
            }
        }else {
            if($image == '') {
                if(General.loggedUser.gender == 'male') {
                    img.setAttribute('src','./assets/images/facebook-default-male.jpg');
                }else {
                    img.setAttribute('src','./assets/images/facebook-default-female.jpg');
                }
            }else {
                img.setAttribute('src',$image);
            }
        }
        imgCont.appendChild(img);
        header.appendChild(imgCont);
        infoCont.appendChild(heading);
        date.appendChild(dateTxt);
        infoCont.appendChild(date);
        header.appendChild(infoCont);
        Timeline.header = header;
        mainP.appendChild(postTxt);
        main.appendChild(mainP);       
        
        likesCount.appendChild(totalLike);
        likesCount.appendChild(likeTxtSpan);
        totalLike.appendChild(likesNum);
        likeTxtSpan.appendChild(document.createTextNode(' Like'));
        likesCount.appendChild(totalLike);
        likesCount.appendChild(likeTxtSpan);
        statistic.appendChild(likesCount);
        commentsCount.appendChild(commentsNum);
        statistic.appendChild(commentsCount);
        sharesCount.appendChild(sharesNum);
        statistic.appendChild(sharesCount);
        likeBtn.appendChild(document.createTextNode('Like'))
        itemLike.appendChild(likeBtn);
        commentBtn.appendChild(document.createTextNode('Comment'))
        itemComment.appendChild(commentBtn);
        shareBtn.appendChild(document.createTextNode('Share'));
        itemShare.appendChild(shareBtn);
        list.appendChild(itemLike);
        list.appendChild(itemComment);
        list.appendChild(itemShare);

        footer.appendChild(statistic);
        footer.appendChild(list);

        post.appendChild(header);
        post.appendChild(main);
        post.appendChild(footer);

        if(General.loggedUser.token == $token && Timeline.timelineEl.getAttribute('data-owner') == null) {
            Timeline.renderPostDelBtn($id);
        }
        Events.likeBtnClick(likeBtn);
        Timeline.postsCont.insertBefore(post,Timeline.postsCont.firstElementChild);
    },
    renderPostDelBtn: function($id) {
        let delBtn = document.createElement('button');
        delBtn.classList.add('post__header__del-btn');
        delBtn.appendChild(document.createTextNode('Delete'));
        delBtn.setAttribute('data-post-id',$id);
        Timeline.header.appendChild(delBtn);
        Events.deleltePostBtnClick(delBtn);
    },
    renderComments: function() {

    },

    renderGetPostStatic : function() {
        let postContainer = document.createElement('div');
        postContainer.classList.add('timeline__post-section');

        // Header
        let postHeader = document.createElement('header');
        postHeader.classList.add('timeline__post-section__header');

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('timeline__post-section__header__img-container');
        let img = document.createElement('img');
        img.classList.add('timeline__post-section__header__img-container__img');
        img.setAttribute('src', './assets/images/Asylab.png');

        imgContainer.appendChild(img);
        postHeader.appendChild(imgContainer);

        let infoContainer = document.createElement('div');
        infoContainer.classList.add('timeline__post-section__header__info-container');
        let pageName = document.createElement('h2');
        pageName.classList.add('timeline__post-section__header__info-container__page-name');
        pageName.innerHTML = 'Asylab';
        let postDate = document.createElement('span');
        postDate.classList.add('timeline__post-section__header__info-container__date');
        postDate.innerHTML = 'September 17 at 9:01 AM';

        infoContainer.appendChild(pageName);
        infoContainer.appendChild(postDate);
        postHeader.appendChild(infoContainer);

        postContainer.appendChild(postHeader);

        // Post content
        let postBody = document.createElement('div');
        postBody.classList.add('timeline__post-section__content');

        let postText = document.createElement('p');
        postText.classList.add('timeline__post-section__content__text');
        postText.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, soluta eveniet dolorem eligendi, minus, quae voluptas ducimus aut dolore tenetur ullam iste? Ex doloremque officiis voluptatum obcaecati ducimus illum placeat?'
        let hashtags = document.createElement('span');
        hashtags.classList.add('timeline__post-section__content__hashtag');
        hashtags.innerHTML = '#hashtag #hashtag';
        postText.appendChild(hashtags);
        postBody.appendChild(postText);

        let postPhoto = document.createElement('div');
        postPhoto.classList.add('timeline__post-section__content__photo');
        postBody.appendChild(postPhoto);

        let postLink = document.createElement('a');
        postLink.classList.add('timeline__post-section__content__link');
        let address = document.createElement('span');
        address.classList.add('timeline__post-section__content__link__name');
        address.innerHTML = 'ASYLAB.COM';
        let description = document.createElement('p');
        description.classList.add('timeline__post-section__content__link__description');
        description.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, soluta eveniet dolorem eligendi';
        postLink.appendChild(address);
        postLink.appendChild(description);
        postBody.appendChild(postLink);

        // Footer
        let postFooter = document.createElement('footer');
        postFooter.classList.add('timeline__post-section__footer');
        
        let likeBtn = document.createElement('button');
        likeBtn.classList.add('timeline__post-section__footer__button');
        let likeIcon = General.renderIcon5('far fa-thumbs-up');
        likeBtn.appendChild(likeIcon);
        likeBtn.appendChild(document.createTextNode('Like'));

        let commentBtn = document.createElement('button');
        commentBtn.classList.add('timeline__post-section__footer__button');
        let commentIcon = General.renderIcon5('far fa-comment-alt');
        commentBtn.appendChild(commentIcon);
        commentBtn.appendChild(document.createTextNode('Comment'));

        let shareBtn = document.createElement('button');
        shareBtn.classList.add('timeline__post-section__footer__button');
        let shareIcon = General.renderIcon5('fas fa-share');
        shareBtn.appendChild(shareIcon);
        shareBtn.appendChild(document.createTextNode('Share'));

        postFooter.appendChild(likeBtn);
        postFooter.appendChild(commentBtn);
        postFooter.appendChild(shareBtn);
        postBody.appendChild(postFooter);

        postContainer.appendChild(postBody);
        Timeline.timelineEl.appendChild(postContainer);
    },

    render: function($targetUsersPost) {
        if(Authorization.authorized) {
            Timeline.renderTimeline();
            ($targetUsersPost) ? true : Timeline.renderAddPost();
            Timeline.renderPostsCont();
            if ($targetUsersPost) {
                Events.loadPostsFn($targetUsersPost);
            }else {
                Events.loadPostsFn(localStorage.getItem('FB_TOKEN'));
            }
        }
    }
}