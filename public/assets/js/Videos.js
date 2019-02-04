const Videos = {
    videosElement: '',
    videosList: '',
    videosHeader: '',

    renderVideos : function() {
        let videoBody = document.createElement('section');
        videoBody.classList.add('main-content__videos');
        Videos.videosElement = videoBody;
        Main.main.appendChild(Videos.videosElement);
    },
    renderVideosHeader : function() {
        let videosHeader = document.createElement('header');
        videosHeader.classList.add('main-content__videos__header');
        Videos.videosHeader = videosHeader;
        let videosHeading = document.createElement('h2');
        videosHeading.classList.add('main-content__videos__header-title');
        videosHeading.appendChild(document.createTextNode('all videos'));
        videosHeader.appendChild(videosHeading);
        Videos.videosElement.appendChild(videosHeader);
        let form = document.createElement('form');
        let input = document.createElement('input');
        let span = document.createElement('span');
        let icon = General.renderIcon4('fa-refresh');
        form.setAttribute('enctype','multipart/form-data');
        form.classList.add('main-content__videos__header__form');
        input.classList.add('main-content__videos__header__form__input');
        span.classList.add('main-content__videos__header__output');
        span.setAttribute('id','addVideoOutput');
        icon.classList.add('spinner','spinner--upload-video');
        input.setAttribute('type','file');
        input.setAttribute('id','addVideoBtn');
        input.setAttribute('name','video');
        span.appendChild(icon);
        form.appendChild(input);
        let videoUploadBtn = document.createElement('label');
        videoUploadBtn.classList.add('main-content__photos__header__button');
        videoUploadBtn.appendChild(document.createTextNode('Add Video'));
        videoUploadBtn.setAttribute('for','addVideoBtn');
        Videos.videosHeader.appendChild(span);
        Videos.videosHeader.appendChild(form);
        Videos.videosHeader.appendChild(videoUploadBtn);
        Events.addVideoInputChange(input);
    },

    renderVideosBody : function() {
        let videoContainer = document.createElement('div');
        videoContainer.classList.add('main-content__videos__body');
        let videoList = document.createElement('ul');
        videoList.classList.add('main-content__videos__list');
        Videos.videosList = videoList;
        videoContainer.appendChild(videoList);
        Videos.videosElement.appendChild(videoContainer);
    },
    renderVideosItems: function(videos) {
        for(i = 0; i < videos.length; i++) {
            let videoItem = document.createElement('li');
            videoItem.classList.add('main-content__videos__list__item');
            let videoTag = document.createElement('video');
            let source   = document.createElement('source');
            source.setAttribute('src',General.loggedUser.token+'/'+videos[i].name);
            source.setAttribute('type','video/'+videos[i].name.split('.')[1]);
            videoTag.appendChild(source);
            videoTag.classList.add('main-content__videos__list__item__video');
            videoItem.appendChild(videoTag);
            Videos.videosList.appendChild(videoItem);
            Events.videoHover(videoTag);
        }
    },

    render : function() {
        Videos.renderVideos();
        Videos.renderVideosHeader();
        Videos.renderVideosBody();
        Videos.renderVideosItems(General.loggedUser.videos);
    }
}