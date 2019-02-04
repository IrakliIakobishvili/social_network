const Photos = {
    photosElement : '',
    photosList: '',

    renderPhotos : function() {
        let photoSection = document.createElement('section');
        photoSection.classList.add('main-content__photos');
        Photos.photosElement = photoSection;
        Main.main.appendChild(Photos.photosElement);
    },

    renderPhotoHeader : function() {
        let header = document.createElement('header');
        header.classList.add('main-content__photos__header');

        let headerLeft = document.createElement('div');
        headerLeft.classList.add('main-content__photos__header-left');

        let photoIcon = General.renderIcon5('far fa-images');
        let heading = document.createElement('h2');
        heading.classList.add('main-content__photos__header__title');
        heading.appendChild(document.createTextNode('Photos'));

        headerLeft.appendChild(photoIcon);
        headerLeft.appendChild(heading);

        let headerRight = document.createElement('div');
        headerRight.classList.add('main-content__photos__header-right');

        let form = document.createElement('form');
        let input = document.createElement('input');
        let span = document.createElement('span');
        let icon = General.renderIcon4('fa-refresh');
        form.setAttribute('enctype','multipart/form-data');
        form.classList.add('main-content__photos__header-right__form');
        input.classList.add('main-content__photos__header-right__form__input');
        span.classList.add('main-content__photos__header-right__output');
        span.setAttribute('id','addPhotoOutput');
        icon.classList.add('spinner','spinner--upload-image');
        input.setAttribute('type','file');
        input.setAttribute('id','addPhotoBtn');
        input.setAttribute('name','image');
        span.appendChild(icon);
        form.appendChild(input);
        let photoUploadBtn = document.createElement('label');
        photoUploadBtn.classList.add('main-content__photos__header__button');
        photoUploadBtn.appendChild(document.createTextNode('Add Photos'));
        photoUploadBtn.setAttribute('for','addPhotoBtn');
        headerRight.appendChild(form);
        headerRight.appendChild(span);
        headerRight.appendChild(photoUploadBtn);
        header.appendChild(headerLeft);
        header.appendChild(headerRight);
        Photos.photosElement.appendChild(header);
        Events.addPhotoInputChange(input); 
    },

    renderPhotosBody : function() {
        let photoContainer = document.createElement('div');
        photoContainer.classList.add('main-content__photos__body');
        let photoList = document.createElement('ul');
        photoList.classList.add('main-content__photos__list');
        photoList.setAttribute('id','userPhotosList');
        Photos.photosList = photoList;
        photoContainer.appendChild(photoList);
        Photos.photosElement.appendChild(photoContainer);
        
    },
    renderPhotoItem: function(photos) {
        let item = '';
        let img  = '';
        let div  = '';
        let div2 = '';
        let btn1 = '';
        let btn2 = '';
        let btn3 = '';
        let txt1 = document.createTextNode('Set Profile');
        let txt2 = document.createTextNode('Set Cover');
        let txt3 = document.createTextNode('Delete');
        for(let i = 0; i < photos.length; i++) {
            img  = document.createElement('img');
            item = document.createElement('li');
            div  = document.createElement('div');
            div2 = document.createElement('div');
            btn1 = document.createElement('button');
            btn2 = document.createElement('button');
            btn3 = document.createElement('button');
            img.classList.add('main-content__photos__item__img');            
            item.classList.add('main-content__photos__item');
            div.classList.add('main-content__photos__item__btn-cont');
            div2.classList.add('main-content__photos__item__btn-cont','main-content__photos__item__btn-cont--bottom');
            btn1.classList.add('main-content__photos__item__btn-cont__btn','main-content__photos__item__btn-cont__btn--profile');
            btn2.classList.add('main-content__photos__item__btn-cont__btn','main-content__photos__item__btn-cont__btn--cover');
            btn3.classList.add('main-content__photos__item__btn-cont__btn','main-content__photos__item__btn-cont__btn--delete');
            btn1.appendChild(txt1.cloneNode(true));
            btn2.appendChild(txt2.cloneNode(true));
            btn3.appendChild(txt3.cloneNode(true));
            btn1.setAttribute('data-btn','profile');
            btn2.setAttribute('data-btn','cover');
            btn3.setAttribute('data-btn','deletePhoto');
            div.appendChild(btn1);
            div.appendChild(btn2);
            div2.appendChild(btn3);
            item.appendChild(div);  
            item.appendChild(div2); 
            img.setAttribute('src',General.loggedUser.token+'/'+photos[i].name);
            item.appendChild(img);
            Photos.photosList.appendChild(item);
            Events.setPhotoBtnsClick([btn1,btn2,btn3]);
        }
    },

    render: function() {
        Photos.renderPhotos();
        Photos.renderPhotoHeader();
        Photos.renderPhotosBody();
        Photos.renderPhotoItem(General.loggedUser.photos);
    }
}