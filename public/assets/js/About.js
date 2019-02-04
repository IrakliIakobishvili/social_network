var About = {
    aboutElement : '',

    renderAbout : function() {
        let aboutSection = document.createElement('section');
        aboutSection.classList.add('main-content__about');
        About.aboutElement = aboutSection;
        Main.main.appendChild(About.aboutElement);
    },

    renderAboutTop : function() {
        let aboutTopContainer = document.createElement('div');
        aboutTopContainer.classList.add('main-content__about-top');

        let aboutTitle = document.createElement('h2');
        aboutTitle.classList.add('main-content__about-title');
        aboutTitle.appendChild(document.createTextNode('contact information'));
        aboutTopContainer.appendChild(aboutTitle);

        let aboutList = document.createElement('ul');
        aboutList.classList.add('main-content__about__list');

        let aboutItem1 = document.createElement('li');
        let aboutItem2 = document.createElement('li');
        aboutItem1.classList.add('main-content__about__item');
        aboutItem2.classList.add('main-content__about__item');

        let aboutProperty1 = document.createElement('span');
        aboutProperty1.classList.add('main-content__about__content', 'main-content__about__content--property');
        aboutProperty1.appendChild(document.createTextNode('Mobile Phones'));
        let mobile = document.createElement('span');
        mobile.classList.add('main-content__about__content', 'main-content__about__content--info');
        mobile.setAttribute('id', 'phoneNum');
        mobile.appendChild(document.createTextNode(''));
        aboutItem1.appendChild(aboutProperty1);
        aboutItem1.appendChild(mobile);

        let aboutProperty2 = document.createElement('span');
        aboutProperty2.classList.add('main-content__about__content', 'main-content__about__content--property');
        aboutProperty2.appendChild(document.createTextNode('Email'));
        let email = document.createElement('a');
        email.classList.add('main-content__about__content', 'main-content__about__content--info', 'main-content__about__content__link');
        email.setAttribute('id', 'emailAdd');
        email.setAttribute('href', 'mailto:'+General.loggedUser.email);
        email.appendChild(document.createTextNode(General.loggedUser.email));
        aboutItem2.appendChild(aboutProperty2);
        aboutItem2.appendChild(email);

        aboutList.appendChild(aboutItem1);
        aboutList.appendChild(aboutItem2);

        aboutTopContainer.appendChild(aboutList);
        About.aboutElement.appendChild(aboutTopContainer);
    },

    renderAboutBottom : function() {
        let aboutBottomContainer = document.createElement('div');
        aboutBottomContainer.classList.add('main-content__about-bottom');

        let aboutTitle = document.createElement('h2');
        aboutTitle.classList.add('main-content__about-title');
        aboutTitle.appendChild(document.createTextNode('basic information'));
        aboutBottomContainer.appendChild(aboutTitle);

        let aboutList = document.createElement('ul');
        aboutList.classList.add('main-content__about__list');

        let aboutItem1 = document.createElement('li');
        let aboutItem2 = document.createElement('li');
        let aboutItem3 = document.createElement('li');
        aboutItem1.classList.add('main-content__about__item');
        aboutItem2.classList.add('main-content__about__item');
        aboutItem3.classList.add('main-content__about__item');

        let aboutProperty1 = document.createElement('span');
        aboutProperty1.classList.add('main-content__about__content', 'main-content__about__content--property');
        aboutProperty1.appendChild(document.createTextNode('Birth Date'));
        let birthDate = document.createElement('span');
        birthDate.classList.add('main-content__about__content', 'main-content__about__content--info');
        birthDate.setAttribute('id', 'birthDate');
        birthDate.appendChild(document.createTextNode(General.loggedUser.birthDay.month +' '+General.loggedUser.birthDay.day));
        aboutItem1.appendChild(aboutProperty1);
        aboutItem1.appendChild(birthDate);

        let aboutProperty2 = document.createElement('span');
        aboutProperty2.classList.add('main-content__about__content', 'main-content__about__content--property');
        aboutProperty2.appendChild(document.createTextNode('Birth Year'));
        let birthYear = document.createElement('span');
        birthYear.classList.add('main-content__about__content', 'main-content__about__content--info');
        birthYear.setAttribute('id', 'birthYear');
        birthYear.appendChild(document.createTextNode(General.loggedUser.birthDay.year));
        aboutItem2.appendChild(aboutProperty2);
        aboutItem2.appendChild(birthYear);

        let aboutProperty3 = document.createElement('span');
        aboutProperty3.classList.add('main-content__about__content', 'main-content__about__content--property');
        aboutProperty3.appendChild(document.createTextNode('Gender'));
        let gender = document.createElement('span');
        gender.classList.add('main-content__about__content', 'main-content__about__content--info');
        gender.setAttribute('id', 'gender');
        gender.appendChild(document.createTextNode(General.loggedUser.gender));
        aboutItem3.appendChild(aboutProperty3);
        aboutItem3.appendChild(gender);

        aboutList.appendChild(aboutItem1);
        aboutList.appendChild(aboutItem2);
        aboutList.appendChild(aboutItem3);

        aboutBottomContainer.appendChild(aboutList);
        About.aboutElement.appendChild(aboutBottomContainer);
    },

    render : function() {
        About.renderAbout();
        About.renderAboutTop();
        About.renderAboutBottom();
    }
}
