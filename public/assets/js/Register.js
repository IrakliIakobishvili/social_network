let Register = {
    registerBodyElement : '',
    container : Container.render(),

    renderRegister: function() {
        let registerBody = document.createElement('section');
        registerBody.classList.add('register-body');
        registerBody.appendChild(Register.container);        
        Register.registerBodyElement = registerBody;
        General.root.appendChild(registerBody);
    },
    renderRegisterConnect() {
        let list    = document.createElement('ul');
        let item1   = document.createElement('li');
        let item2   = document.createElement('li');
        let item3   = document.createElement('li');
        let item4   = document.createElement('li');
        let heading = document.createElement('h2');

        let sheet   = document.createElement('img');
        let star    = document.createElement('img');
        let chain   = document.createElement('img');

        sheet.setAttribute('src','./assets/images/sheet.png');
        star.setAttribute('src','./assets/images/star.png');
        chain.setAttribute('src','./assets/images/chain.png');
        
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        let span3 = document.createElement('span');

        let text1 = document.createTextNode('See photos and updates');
        let text2 = document.createTextNode('from friends in News Feed.');
        let text3 = document.createTextNode('Share what\'s new');
        let text4 = document.createTextNode('in your life on your Timeline.');
        let text5 = document.createTextNode('Find more');
        let text6 = document.createTextNode('of what you\'re looking for with Facebook Search');
        let text7 = document.createTextNode('Connect with friends and the world around you on Facebook.');

        span1.appendChild(text1);
        span2.appendChild(text3);
        span3.appendChild(text5);

        span1.classList.add('strong');
        span2.classList.add('strong');
        span3.classList.add('strong');

        heading.appendChild(text7);

        item1.appendChild(heading);

        item2.appendChild(sheet);
        item2.appendChild(span1);
        item2.appendChild(text2);

        item3.appendChild(star);
        item3.appendChild(span2);
        item3.appendChild(text4);

        item4.appendChild(chain);
        item4.appendChild(span3); 
        item4.appendChild(text6);        

        list.appendChild(item1);
        list.appendChild(item2);
        list.appendChild(item3);
        list.appendChild(item4);

        list.classList.add('register-body__list');
        item1.classList.add('register-body__list__item');
        item2.classList.add('register-body__list__item');
        item3.classList.add('register-body__list__item');
        item4.classList.add('register-body__list__item');
        heading.classList.add('register-body__list__heading');

        Register.container.appendChild(list);
    },
    renderRegisterForm() {
        let list            = document.createElement('ul');
        let item1           = document.createElement('li');
        let item2           = document.createElement('li');
        let item3           = document.createElement('li');
        let item4           = document.createElement('li');
        let item5           = document.createElement('li');
        let item6           = document.createElement('li');
        let item7           = document.createElement('li');
        let item8           = document.createElement('li');
        let item9           = document.createElement('li');
        let heading         = document.createElement('h2');
        let birthHeading    = document.createElement('h3');
        let description     = document.createElement('span');
        let femaleLabel     = document.createElement('label');
        let maleLabel       = document.createElement('label');
        let reasonLink      = document.createElement('a');
        let agreeCont       = document.createElement('div');
        let termsLink       = document.createElement('a');
        let cookiesLink     = document.createElement('a');

        let form            = document.createElement('form');
        let firstNmInput    = document.createElement('input');
        let lastNmInput     = document.createElement('input');
        let emailInput      = document.createElement('input');
        let passwordInput   = document.createElement('input');

        let monthSelect     = document.createElement('select');
        let daySelect       = document.createElement('select');
        let yearSelect      = document.createElement('select');
        let monthOption     = document.createElement('option');
        let dayOption       = document.createElement('option');
        let yearOption      = document.createElement('option');

        let maleInput       = document.createElement('input');
        let femaleInput     = document.createElement('input');
        let signupBtn       = document.createElement('input');
        let resultBox       = document.createElement('span');

        let months = ['Month','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        months.forEach((el,i) => {
            monthOption.innerHTML = el;
            if(i === 0){
                monthOption.setAttribute('value','');
            }else {
                monthOption.setAttribute('value',el);
            }
            let newOpt = monthOption.cloneNode(true);
            monthSelect.appendChild(newOpt);
        });
        for(let i = 0; i <= 31; i++) {
            if(i == 0) {
                dayOption.innerHTML = 'Day';
                dayOption.setAttribute('value','');
            }else {
                dayOption.innerHTML = i;
                dayOption.setAttribute('value',i);
            }
            let newOpt = dayOption.cloneNode(true);
            daySelect.appendChild(newOpt);
        }
        for(let i = new Date().getFullYear()+1; i >= 1905; i--) {
            if(i == (new Date().getFullYear()+1)) {
                yearOption.innerHTML = 'Year'
                yearOption.setAttribute('value','');
            }else {
                yearOption.innerHTML = i;
                yearOption.setAttribute('value',i);
            }
            let newOpt = yearOption.cloneNode(true);
            yearSelect.appendChild(newOpt);
        }

        let headingTxt      = document.createTextNode('Sign Up');
        let descriptionTxt  = document.createTextNode('It’s free and always will be.');
        let birthHeadingTxt = document.createTextNode('Birthday');
        let femaleLabelTxt  = document.createTextNode('Female');
        let maleLabelTxt    = document.createTextNode('Male');
        let reasonLinkTxt   = document.createTextNode('Why do I need to provide my birthday?');
        let termsLinkTxt    = document.createTextNode('Terms, Data Policy');
        let cookiesLinkTxt  = document.createTextNode('Cookies Policy.');
        let agreeTxt1       = document.createTextNode('By clicking Sign Up, you agree to our ');
        let agreeTxt2       = document.createTextNode(' and ');
        let agreeTxt3       = document.createTextNode(' You may receive SMS Notifications from us and can opt out any time.');

        firstNmInput.setAttribute('type','text');
        firstNmInput.setAttribute('name','firstName');
        firstNmInput.setAttribute('id','firstName');
        firstNmInput.setAttribute('placeholder','First Name');
        lastNmInput.setAttribute('type','text');
        lastNmInput.setAttribute('name','lastName');
        lastNmInput.setAttribute('id','lastName');  
        lastNmInput.setAttribute('placeholder','Last Name');       
        emailInput.setAttribute('type','email');
        emailInput.setAttribute('name','email');
        emailInput.setAttribute('id','email');
        emailInput.setAttribute('placeholder','Mobile number or email');
        passwordInput.setAttribute('type','password');
        passwordInput.setAttribute('name','password');
        passwordInput.setAttribute('id','password');
        passwordInput.setAttribute('placeholder','New password');
        maleInput.setAttribute('type','radio');
        femaleInput.setAttribute('type','radio');
        maleInput.setAttribute('id','maleInput');
        maleInput.setAttribute('value','male');
        femaleInput.setAttribute('id','femaleInput');
        femaleInput.setAttribute('value','female');
        femaleLabel.setAttribute('for','femaleInput');
        maleLabel.setAttribute('for','maleInput');
        femaleInput.setAttribute('name','gender');
        reasonLink.setAttribute('href','');
        termsLink.setAttribute('href','');
        cookiesLink.setAttribute('href','');
        maleInput.setAttribute('name','gender');
        signupBtn.setAttribute('type','submit');
        signupBtn.setAttribute('value','Sign Up');

        heading.classList.add('signup-list__item__heading');
        description.classList.add('signup-list__item__description');
        firstNmInput.classList.add('signup-list__item__input');
        firstNmInput.classList.add('signup-list__item__input--first-name');
        lastNmInput.classList.add('signup-list__item__input');
        lastNmInput.classList.add('signup-list__item__input--last-name');
        emailInput.classList.add('signup-list__item__input');
        emailInput.classList.add('signup-list__item__input--email')
        passwordInput.classList.add('signup-list__item__input');
        passwordInput.classList.add('signup-list__item__input--password');
        birthHeading.classList.add('signup-list__item__sub-heading');
        monthSelect.classList.add('signup-list__item__select');
        daySelect.classList.add('signup-list__item__select');
        yearSelect.classList.add('signup-list__item__select');
        reasonLink.classList.add('signup-list__item__reason-link');
        femaleInput.classList.add('signup-list__item__radio');
        maleInput.classList.add('signup-list__item__radio');
        femaleLabel.classList.add('signup-list__item__label');
        maleLabel.classList.add('signup-list__item__label');
        agreeCont.classList.add('signup-list__item__agree-cont');
        termsLink.classList.add('signup-list__item__link');
        cookiesLink.classList.add('signup-list__item__link');
        signupBtn.classList.add('signup-list__item__submit');
        form.classList.add('register-body__form');
        list.classList.add('signup-list');
        resultBox.classList.add('register-body__form__result-info','result-info');

        signupBtn.setAttribute('id','signupBtn');
        monthSelect.setAttribute('id','monthSelect');
        daySelect.setAttribute('id','daySelect');
        yearSelect.setAttribute('id','yearSelect');
        resultBox.setAttribute('id','registerResultBox');

        heading.appendChild(headingTxt);
        description.appendChild(descriptionTxt);
        birthHeading.appendChild(birthHeadingTxt);
        reasonLink.appendChild(reasonLinkTxt); 
        femaleLabel.appendChild(femaleLabelTxt);
        maleLabel.appendChild(maleLabelTxt); 
        termsLink.appendChild(termsLinkTxt);
        cookiesLink.appendChild(cookiesLinkTxt);

        agreeCont.appendChild(agreeTxt1);
        agreeCont.appendChild(termsLink);
        agreeCont.appendChild(agreeTxt2);   
        agreeCont.appendChild(cookiesLink);  
        agreeCont.appendChild(agreeTxt3); 

        item1.appendChild(heading);
        item1.appendChild(description);
        item2.appendChild(firstNmInput);
        item2.appendChild(lastNmInput);
        item3.appendChild(emailInput);
        item4.appendChild(passwordInput);
        item5.appendChild(birthHeading);
        item6.appendChild(monthSelect);
        item6.appendChild(daySelect);
        item6.appendChild(yearSelect);
        item6.appendChild(reasonLink);
        item7.appendChild(femaleInput);
        item7.appendChild(femaleLabel);
        item7.appendChild(maleInput);
        item7.appendChild(maleLabel);
        item8.appendChild(agreeCont);
        item9.appendChild(signupBtn);

        list.appendChild(item1);
        list.appendChild(item2);
        list.appendChild(item3);
        list.appendChild(item4);
        list.appendChild(item5);
        list.appendChild(item6);
        list.appendChild(item7);
        list.appendChild(item8);
        list.appendChild(item9);
        list.childNodes.forEach((el) => {
            el.classList.add('signup-list__item');
        });
        form.appendChild(list);
        form.appendChild(resultBox);
        Register.container.appendChild(form);
    },
    render: function() {
        if(Authorization.authorized == false) {
            Register.renderRegister();
            Register.renderRegisterConnect();
            Register.renderRegisterForm();
        }
    }
 }