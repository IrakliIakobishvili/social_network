const Profile = {
    profileCont: General.createElement('div',['profile']),

    renderInfo: function() {
        let $image    = General.searchedUser.user.profileImg;
        let maleImg   = './assets/images/facebook-default-male.jpg';
        let femaleImg = './assets/images/facebook-default-female.jpg';
        let imgUrl    = '';

        let infoDiv   = General.createElement('div',['profile__info']);
        let imgCont   = General.createElement('div',['profile__info__img-cont']);
        let img       = General.createElement('img',['profile__info__img-cont__img']);
        let heading   = General.createElement('div',['profile__info__fullname']);
        let icon      = General.renderIcon4('fa-user');

        ($image) ? imgUrl = $image : (General.searchedUser.user.gender == 'male') ? imgUrl = maleImg : imgUrl = femaleImg;
        img.setAttribute('src',imgUrl);
        imgCont.appendChild(img);
        heading.appendChild(document.createTextNode(General.searchedUser.user.firstName +' '+General.searchedUser.user.lastName));
        General.appendChilds(infoDiv,[imgCont,heading,icon]);
        General.appendChilds(Profile.profileCont,[infoDiv]);
    },
    renderImages: function() {
        let imagesCont = General.createElement('div',['profile__images']);
        let header     = General.createElement('header',['profile__images__header']);
        let heading    = General.createElement('h3',['profile__images__header__heading']);
        let icon       = General.renderIcon5('fas fa-images');
        let list       = General.createElement('ul',['profile__images__list']);
        General.appendChilds(heading,[document.createTextNode('Photos')]);
        General.appendChilds(header,[heading,icon]);
        let item = '';
        let image = '';
        for(let i = 0; (i < General.searchedUser.user.photos.length && i < 6); i++) {
            image = General.createElement('img',['profile__images__list__item__img']);
            image.setAttribute('src',General.searchedUser.user.token+'/'+General.searchedUser.user.photos[General.searchedUser.user.photos.length-(i+1)].name);
            item = General.createElement('li',['profile__images__list__item']);
            General.appendChilds(item,[image]);
            General.appendChilds(list,[item]);
        }
        General.appendChilds(imagesCont,[header,list]);
        General.appendChilds(Profile.profileCont,[imagesCont]);
    },
    renderDetails: function() {
        let detailsCont = General.createElement('div',['profile__details']);
        let heading     = General.createElement('h3',['profile__details__heading']);
        let table       = General.createElement('table',['profile__details__table']);
        let tbody       = General.createElement('tbody',['profile__details__table__tbody']);
        let tr          = General.createElement('tr',['profile__details__table__tbody__tr'],'',3);
        let td          = General.createElement('td',['profile__details__table__tbody__tr__td'],'',3);

        for(let i = 0; i < tr.length; i++) {General.appendChilds(tr[i],[td[i],td[i].cloneNode(true)])}
        General.appendChilds(heading,[document.createTextNode('Basic Info')]);
        General.appendChilds(tr[0].childNodes[0],[document.createTextNode('Birth Date')]);
        General.appendChilds(tr[0].childNodes[1],[document.createTextNode(General.searchedUser.user.birthDay.month +' '+General.searchedUser.user.birthDay.day)]);
        General.appendChilds(tr[1].childNodes[0],[document.createTextNode('Birth Year')]);
        General.appendChilds(tr[1].childNodes[1],[document.createTextNode(General.searchedUser.user.birthDay.year)]);
        General.appendChilds(tr[2].childNodes[0],[document.createTextNode('Gender')]);
        General.appendChilds(tr[2].childNodes[1],[document.createTextNode(General.searchedUser.user.gender)]);
        General.appendChilds(tbody,tr);
        General.appendChilds(table,[tbody]);
        General.appendChilds(detailsCont,[heading,table]);
        General.appendChilds(Profile.profileCont,[detailsCont]);
        General.appendChilds(Aside.asideEl,[Profile.profileCont]);
    },
    render: function() {
        Profile.renderInfo();
        Profile.renderImages();
        Profile.renderDetails();
    }
}