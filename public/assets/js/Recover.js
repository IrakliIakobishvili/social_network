var Recover = {
    recoverElement : '',
    container : Container.render(),

    renderRecover : function() {
        let recoverBody = document.createElement('section');
        recoverBody.classList.add('recover-body');
        recoverBody.appendChild(Recover.container);
        Recover.recoverElement = recoverBody;
        General.root.appendChild(recoverBody);
    },

    renderRecoverContent : function() {
        let content = document.createElement('div');
        content.classList.add('recover-body__content');
        let contentTop = document.createElement('div');
        contentTop.classList.add('recover-body__content-top');
        let contentTopHeading = document.createElement('h2');
        contentTopHeading.classList.add('recover-body__content-top__heading');
        contentTopHeading.appendChild(document.createTextNode('Find Your Account'));
        let contentTopForm = document.createElement('form');
        contentTopForm.classList.add('recover-body__content-top__form');
        let inputLabel = document.createElement('label');
        inputLabel.classList.add('recover-body__content-top__form-title');
        inputLabel.appendChild(document.createTextNode('Please enter your email or phone number to search for your account.'));        
        let input = document.createElement('input');
        input.classList.add('recover-body__content-top__form-input');
        input.setAttribute('type', 'email');
        input.setAttribute('name', 'recoverPassword');
        input.setAttribute('placeholder', 'Phone or email');
        input.setAttribute('id', 'recoverInput');
        contentTopForm.appendChild(inputLabel);
        contentTopForm.appendChild(input);
        contentTop.appendChild(contentTopHeading);
        contentTop.appendChild(contentTopForm);
        let contentBottom = document.createElement('div');
        contentBottom.classList.add('recover-body__content-bottom');
        let searchButton = document.createElement('button');
        let cancelButton = document.createElement('button');
        searchButton.classList.add('recover-body__content-bottom__button', 'recover-body__content-bottom__button--bl');
        searchButton.setAttribute('id', 'recoverSearchbtn');
        cancelButton.classList.add('recover-body__content-bottom__button', 'recover-body__content-bottom__button--gr');
        searchButton.appendChild(document.createTextNode('Search'));
        cancelButton.appendChild(document.createTextNode('Cancel'));
        contentBottom.appendChild(searchButton);
        contentBottom.appendChild(cancelButton);
        cancelButton.setAttribute('id','recoverCancelBtn');
        content.appendChild(contentTop);
        content.appendChild(contentBottom);
        Recover.container.appendChild(content);
        if(Recover.recoverElement.parentNode.contains(Register.registerBodyElement)) {
            Register.registerBodyElement.parentNode.removeChild(Register.registerBodyElement)
            General.removeElement(Register.registerBodyElement);
        }
    },

    render : function() {
        Recover.renderRecover();
        Recover.renderRecoverContent();
    }
}

