const Settings = {
    settingsElement : '',

    renderSettings : function() {
        let settingsContainer = document.createElement('section');
        settingsContainer.classList.add('main-content__settings');
        Settings.settingsElement = settingsContainer;
        Main.main.appendChild(Settings.settingsElement);
    },

    renderSettingsHeader : function() {
        let settingsHeader = document.createElement('header');
        settingsHeader.classList.add('main-content__settings__header');
        let sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('main-content__settings__header__title');
        sectionTitle.innerHTML = 'settings';
        settingsHeader.appendChild(sectionTitle);
        Settings.settingsElement.appendChild(settingsHeader);
    },

    renderSettingsBody : function() {
        let settingsBody = document.createElement('div');
        settingsBody.classList.add('main-content__settings__body');

        let emailSection = document.createElement('div');
        emailSection.classList.add('main-content__settings__body__content');
        // --------------- New Email Section ----------------- //
        let newEmailSection = document.createElement('div');
        newEmailSection.classList.add('main-content__settings__body__content-block');
        let newEmailTitle = document.createElement('span');
        newEmailTitle.innerHTML = 'new email';
        newEmailTitle.classList.add('main-content__settings__body__content__title');
        let newEmailInp = document.createElement('input');
        newEmailInp.classList.add('main-content__settings__body__content__input');
        newEmailInp.setAttribute('id', 'newEmail');
        newEmailInp.setAttribute('type', 'email');
        newEmailInp.setAttribute('name', 'newEmail');
        
        newEmailSection.appendChild(newEmailTitle);
        newEmailSection.appendChild(newEmailInp);
        emailSection.appendChild(newEmailSection);        
        
        // -------------- Confirm Email Section ------------ //
        let confirmEmailSection = document.createElement('div');
        confirmEmailSection.classList.add('main-content__settings__body__content-block');
        let confirmEmailTitle = document.createElement('span');
        confirmEmailTitle.innerHTML = 'confirm new email';
        confirmEmailTitle.classList.add('main-content__settings__body__content__title');
        let confirmEmailInp = document.createElement('input');
        confirmEmailInp.classList.add('main-content__settings__body__content__input');
        confirmEmailInp.setAttribute('id', 'confirmEmail');
        confirmEmailInp.setAttribute('type', 'email');
        confirmEmailInp.setAttribute('name', 'confirmEmail');

        let resetEmailButton = document.createElement('button');
        resetEmailButton.classList.add('main-content__settings__body__content__button');
        resetEmailButton.setAttribute('id', 'resetEmailBtn');
        resetEmailButton.innerHTML = 'Reset email';

        let emailConfirmationMsg = document.createElement('span');
        emailConfirmationMsg.classList.add('main-content__settings__body__content__msg');
        emailConfirmationMsg.setAttribute('id', 'emailConfirmationMsg');
        emailConfirmationMsg.innerHTML = '';

        confirmEmailSection.appendChild(confirmEmailTitle);
        confirmEmailSection.appendChild(confirmEmailInp);
        emailSection.appendChild(confirmEmailSection);
        emailSection.appendChild(resetEmailButton);
        emailSection.appendChild(emailConfirmationMsg);

        let passwordSection = document.createElement('div');
        passwordSection.classList.add('main-content__settings__body__content');
        // --------------- New Password Section ----------------- //
        let newPasswordSection = document.createElement('div');
        newPasswordSection.classList.add('main-content__settings__body__content-block');
        let newPasswordTitle = document.createElement('span');
        newPasswordTitle.innerHTML = 'new password';
        newPasswordTitle.classList.add('main-content__settings__body__content__title');
        let newPasswordInp = document.createElement('input');
        newPasswordInp.classList.add('main-content__settings__body__content__input');
        newPasswordInp.setAttribute('id', 'newPassword');
        newPasswordInp.setAttribute('type', 'password');
        newPasswordInp.setAttribute('name', 'newPassword');

        newPasswordSection.appendChild(newPasswordTitle);
        newPasswordSection.appendChild(newPasswordInp);
        passwordSection.appendChild(newPasswordSection);

        // -------------- Confirm Password Section ------------ //
        let confirmPasswordSection = document.createElement('div');
        confirmPasswordSection.classList.add('main-content__settings__body__content-block');
        let confirmPasswordTitle = document.createElement('span');
        confirmPasswordTitle.innerHTML = 'confirm new password';
        confirmPasswordTitle.classList.add('main-content__settings__body__content__title');
        let confirmPasswordInp = document.createElement('input');
        confirmPasswordInp.classList.add('main-content__settings__body__content__input');
        confirmPasswordInp.setAttribute('id', 'confirmPassword');
        confirmPasswordInp.setAttribute('type', 'password');
        confirmPasswordInp.setAttribute('name', 'confirmPassword');
        
        let resetPasswordButton = document.createElement('button');
        resetPasswordButton.classList.add('main-content__settings__body__content__button');
        resetPasswordButton.setAttribute('id', 'resetPasswordBtn');
        resetPasswordButton.innerHTML = 'Reset password';

        let passwordConfirmationMsg = document.createElement('span');
        passwordConfirmationMsg.classList.add('main-content__settings__body__content__msg');
        passwordConfirmationMsg.setAttribute('id', 'passwordConfirmationMsg');
        passwordConfirmationMsg.innerHTML = '';

        confirmPasswordSection.appendChild(confirmPasswordTitle);
        confirmPasswordSection.appendChild(confirmPasswordInp);
        passwordSection.appendChild(confirmPasswordSection);
        passwordSection.appendChild(resetPasswordButton);
        passwordSection.appendChild(passwordConfirmationMsg);
        
        settingsBody.appendChild(emailSection);
        settingsBody.appendChild(passwordSection);
        Settings.settingsElement.appendChild(settingsBody);
    },

    render : function() {
        Settings.renderSettings();
        Settings.renderSettingsHeader();
        Settings.renderSettingsBody();
        Events.resetEmailClickFunc();
        Events.resetPasswordClickFunc();
    }
}