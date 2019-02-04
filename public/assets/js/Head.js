const Head = {
    insertFontawesome4: function() {
        let link = document.createElement('link');
        link.setAttribute('href','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
        link.setAttribute('rel','stylesheet');
        General.head.insertBefore(link, General.head.childNodes[0]);
    },
    insertFontawesome5: function() {
        let link = document.createElement('link');
        link.setAttribute('href','https://use.fontawesome.com/releases/v5.6.3/css/all.css');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('integrity','sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/');
        link.setAttribute('crossorigin','anonymous');
        General.head.insertBefore(link, General.head.childNodes[0]);
    },
    renderFavicon: function() {
        let link = document.createElement('link');
        link.setAttribute('href','../assets/images/favicon.png');
        link.setAttribute('rel','icon');
        link.setAttribute('type','image/x-icon');
        General.head.insertBefore(link, General.head.childNodes[General.head.children.length - 2]);
    },
    render: function() {
        Head.insertFontawesome4();
        Head.insertFontawesome5();
        Head.renderFavicon();
    }
}