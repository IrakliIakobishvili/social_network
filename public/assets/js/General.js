const General = {
    root: document.getElementById('app-root'),
    head: document.getElementsByTagName('head')[0],
    loggedUser: '',
    searchedUser: '',
    renderIcon4: function (className) {
        let icon = document.createElement('i');
        icon.classList.add('fa');
        icon.classList.add(className);
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    },
    renderIcon5: function (className) {
        let iconClass = className;
        iconClass = iconClass.split(' ');
        let icon = document.createElement('i');
        iconClass.forEach(element => {
            icon.classList.add(element);
        });
        return icon;
    },
    createElement: function(element,classes,id,quantity) {
        let $el = undefined;
        let $els = [];
        if(quantity) {
            for(let i = 0; i < quantity; i++) {
                (element) ? $el = document.createElement(element) : false;
                (classes && (typeof classes == 'object')) ? classes.forEach(className => {$el.classList.add(className)}) : true;      
                $els.push($el);
            }
            return $els;
        }else {            
            (element) ? $el = document.createElement(element) : false;
            (classes && (typeof classes == 'object')) ? classes.forEach(className => {$el.classList.add(className)}) : true;      
            (id) ? $el.setAttribute('id',id) : true;
            return $el;
        }
    },
    appendChilds: function(parent,children) {
        children.forEach(child => {parent.appendChild(child)});
        return parent;
    },
    findParentNode(el,cls) {
        while ((el = el.parentNode) && el.className.indexOf(cls) < 0);
        return el;
    },
    findParentNode2(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    },
    validateEmail: function(str) {
        let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'igm') 
        return regex.test(str);
    },
    removeAll: function () {
        document.querySelector('#app-root').querySelectorAll('*').forEach(el => {
            el.inneHTML = '';
            el.parentNode.removeChild(el);
        });
    },
    removeElement: function(element) {
        element.querySelectorAll('*').forEach(el => {
            el.inneHTML = '';
            el.parentNode.removeChild(el);
        });
    }
}