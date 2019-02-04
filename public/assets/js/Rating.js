const Rating = {
    ratingElement : '',

    renderRating : function() {
        let ratingBody = document.createElement('div');
        ratingBody.classList.add('main-content__aside-right__rating');
        Rating.ratingElement = ratingBody;

        let ratingTitle = document.createElement('h2');
        ratingTitle.classList.add('main-content__aside-right__rating-title');
        ratingTitle.appendChild(document.createTextNode('no rating yet'));

        ratingBody.appendChild(ratingTitle);
        Aside.asideEl.appendChild(Rating.ratingElement);
    },
    render: function() {
        if(Authorization.authorized) {
            Rating.renderRating();
        }
    }
}