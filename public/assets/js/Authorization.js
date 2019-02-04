/*-------------------------------------------*/
const Authorization = {
    authorized: false,
    checking: true,
    authorizedOrNot: function() {
        if(localStorage.getItem('FB_TOKEN')) {
            let loggedUserToken = localStorage.getItem('FB_TOKEN');
            //== Ajax Start ==//
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'logged-user', true);
            xhr.setRequestHeader('Content-type', 'application/json'); 
            xhr.onload = function(){
                if(xhr.status == 200) {
                    let response = JSON.parse(this.responseText);                                       
                    if(response.validToken) {
                       Authorization.authorized = true;
                       Authorization.checking = false;
                       General.loggedUser = response.loggedUser;
                    }else {
                       Authorization.authorized = false;
                       Authorization.checking = false;
                    }
                }             
            }
            xhr.send(JSON.stringify({
               loggedUserToken: loggedUserToken
            }));
            //== Ajax End ==//
        }else {
            Authorization.authorized = false; 
            Authorization.checking = false; 
        }
    },
    check: function() {
        Authorization.authorizedOrNot();
    }
}
/*-------------------------------------------------*/