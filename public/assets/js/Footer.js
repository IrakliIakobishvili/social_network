var Footer = {
    footerElement: '',
    container: Container.render(),
    languages: ['English (US)', 'ქართული', 'Русский', 'Türkçe', 'Deutsch', 'Azərbaycan dili', 'العربية', 'Français (France)', 'Ελληνικά', 'Español', 'Português (Brasil)'],
    links: ['Sign Up', 'Log In', 'Messenger', 'Facebook Lite', 'Mobile', 'Find Friends', 'People', 'Profiles', 'Pages', 'Page Categories', 'Places', 'Games', 'Locations',
        'Marketplace', 'Groups', 'Instagram', 'Local', 'About', 'Create Ad', 'Create Page', 'Developers', 'Careers', 'Privacy', 'Cookies', 'Ad Choices', 'Terms', 'Account Security',
        'Login Help', 'Help'
    ],

    renderFooter: function () {
        let footer = document.createElement('footer');
        footer.classList.add('page-footer');
        footer.appendChild(Footer.container);
        Footer.footerElement = footer;
        General.root.appendChild(footer);
    },

    renderFooterTop: function () {
        let top = document.createElement('div');
        top.classList.add('page-footer__languages');
        Footer.container.appendChild(top);
        let topList = document.createElement('ul');
        topList.classList.add('page-footer__list');
        top.appendChild(topList);
        for (i = 0; i < Footer.languages.length; i++) {
            let languagesItem = document.createElement('li');
            languagesItem.classList.add('page-footer__item');
            let languageLink = document.createElement('a');
            languageLink.classList.add('page-footer__link');
            languageLink.setAttribute('href', '#');
            languageLink.appendChild(document.createTextNode(Footer.languages[i]));
            languagesItem.appendChild(languageLink);
            topList.appendChild(languagesItem);
        }
        let plusButton = document.createElement('button');
        plusButton.classList.add('page-footer__button');
        plusButton.appendChild(document.createTextNode('+'));
        top.appendChild(plusButton);
    },

    renderFooterBottom: function () {
        let bottom = document.createElement('div');
        bottom.classList.add('page-footer__links');
        Footer.container.appendChild(bottom);
        let bottomList = document.createElement('ul');
        bottomList.classList.add('page-footer__list');
        bottom.appendChild(bottomList);
        for (i = 0; i < Footer.links.length; i++) {
            let linksItem = document.createElement('li');
            linksItem.classList.add('page-footer__item', 'page-footer__item--gaps');
            let linksLink = document.createElement('a');
            linksLink.classList.add('page-footer__link');
            linksLink.setAttribute('href', '#');
            linksLink.appendChild(document.createTextNode(Footer.links[i]));
            linksItem.appendChild(linksLink);
            bottomList.appendChild(linksItem);
        }
    },

    renderCopyright: function () {
        let copyrightS = document.createElement('span');
        copyrightS.classList.add('page-footer__copyright');
        copyrightS.appendChild(document.createTextNode('Facebook © 2018'));
        Footer.container.appendChild(copyrightS);
    },

    render: function () {
        if (Authorization.authorized == false) {
            Footer.renderFooter();
            Footer.renderFooterTop();
            Footer.renderFooterBottom();
            Footer.renderCopyright();
        }
    }
}
