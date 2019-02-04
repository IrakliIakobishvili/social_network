const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const port = 3000;

app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true,
    // abortOnLimit: true,
    // limits: { fileSize: 0.5 * 1024 * 1024 }
}));
app.use(express.static('public'));
const dir = path.join(__dirname + '/public');

app.use(express.static(__dirname + '/uploads/images'));
app.use(express.static(__dirname + '/uploads/videos'));

app.get('/', function (req, res) {
    res.sendFile(dir + '/index.html');
});


//== Constructors Start ==//
function User(id, token, firstName, lastName, email, password, day, month, year, gender) {
    this.id = id;
    this.token = token;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthDay = {
        day: day,
        month: month,
        year: year
    };
    this.gender = gender;
    this.profileImg = '';
    this.coverImg = '';
    this.posts = [];
    this.photos = [];
    this.videos = [];
    this.friends = {};
    this.verified = false;
    this.online = false;
    this.registerDate = new Date(Date.now()).toLocaleString();
}

function LoggedUser(token, firstName, lastName, email, day, month, year, gender, posts, photos, videos, friends, profileImg, coverImg) {
    this.token = token;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthDay = {
        day: day,
        month: month,
        year: year
    };
    this.gender = gender;
    this.posts = posts;
    this.photos = photos;
    this.videos = videos;
    this.friends = friends;
    this.profileImg = profileImg;
    this.coverImg = coverImg;
}

function Photo(name) {
    this.name = name;
    this.date = new Date(Date.now()).toLocaleString();
    this.likes = [];
    this.comments = [];
}

function Video(name) {
    this.name = name;
    this.date = new Date(Date.now()).toLocaleString();
    this.likes = [];
    this.comments = [];
}

function Like(author) {
    this.author = author;
    this.date = new Date(Date.now()).toLocaleString();
}

function Comment(author,text) {
    this.author = author;
    this.text = text;
    this.date = new Date(Date.now()).toLocaleString();
}

function Post(id,author,text) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.date = new Date(Date.now()).toLocaleString();
    this.likes = [];
    this.comments = [],
    this.shares = []
}
// == Constructors End == //

function capitalizeStr(str) {
	str = str.replace(/ +(?=)/g,'').toLowerCase();
	str = str[0].toUpperCase() + str.slice(1);
	return str;
}

/*---------- Start Encryption -----------*/
function encrypt(str) {
    str = str.toLowerCase();
    str = str.split('');
    let charCodes = [];
    str.forEach((el,index) => {
        if(index < 3) {
            el = el.charCodeAt(0);
            el = (el * 2) + 160;
            charCodes.push(el);
        }else {
            charCodes.push(el);
        }
    });
    return charCodes.join(':');
}

function decrypt(str) {
    str = str.split(':');
    let alphabets = [];
    str.forEach((el,index) => {
        if(index < 3) {
            el = Number(el - 160) / 2;
            el = String.fromCharCode(el);
            alphabets.push(el);
        }else {
            alphabets.push(el);
        }
    });
    return alphabets.join('');
}
/*---------- End Encryption -----------*/


app.post('/register', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let props = Object.keys(users);
            let responseInfo = {'taken':'',"email":req.body.email,'success':''};
            let sameEmail = '';
            let url = req.protocol + "://" + req.headers.host + req.baseUrl;
            let firstName = req.body.firstName.replace(/ +(?=)/g,'').toLowerCase(); 
            firstName = firstName[0].toUpperCase() + firstName.slice(1); 
            let defaultImg = '';
            
            for(let i = 0; i < props.length; i++) {
                if(users[""+props[i]+""].email == req.body.email.toLowerCase()) {                    
                    sameEmail = true;
                    break;
                }
            }
            if(sameEmail) {
                responseInfo.taken = true;
                responseInfo.success = false;
                res.send(JSON.stringify(responseInfo))
            }else {           

            let lastUserID = 0;
            if (Object.keys(users).length > 0) {
                let lastUser = Object.keys(users)[Object.keys(users).length - 1];
                lastUserID = users[lastUser]['id'];
            }
            (req.body.gender == 'male') ? defaultImg = './assets/images/facebook-default-male.jpg' : defaultImg = './assets/images/facebook-default-female.jpg';
            let hashCode = '_' + Math.floor(Date.now() * (Math.random() * (100 - 1) + 1)).toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            if (users["" + hashCode + ""] == undefined) {
                users["" + hashCode + ""] = new User(
                    lastUserID + 1,
                    hashCode,
                    req.body.firstName.replace(/ +(?=)/g,'').toLowerCase(),
                    req.body.lastName.replace(/ +(?=)/g,'').toLowerCase(),
                    req.body.email.toLowerCase(),
                    req.body.password,                    
                    req.body.day,
                    req.body.month,
                    req.body.year,
                    req.body.gender
                );
                users["" + hashCode + ""].profileImg = defaultImg;
                users = JSON.stringify(users);
                fs.writeFile('./database/users.json', users, 'utf8', function (err) {
                    if (err) throw err; 
                    let transporter = nodemailer.createTransport({
                       service: 'Hotmail',
                       auth: {
                         user: 'no-replay.facebook@hotmail.com',
                         pass: 'facebook123'
                       }
                     });

                     let mailOptions = {
                       from: 'Facebook <no-replay.facebook@hotmail.com>',
                       to: `${req.body.email}`,
                       subject: `Confirmation Email - Facebook.com`,
                       html: `
                       <div style='width: 750px;box-sizing: border-box;padding: 115px 90px;display: flex;align-items: center;justify-content: center;background: #F3F3F3;font-family: verdana;text-align: center;'>
                            <div style='width: 550px;box-shadow: 0px 1px 2px 2px #E9E9E9;border-radius: 4px;overflow: hidden;background: #fff;justify-content: center;'>
                                <header style='background: #4267B2;padding: 55px 0px;text-align: center;font-size: 50px;font-weight: bold;color: #fff;'>Facebook</header>
                                <h1 style='color: #4c4c4c;font-weight: normal;font-size: 30px;margin: 24px 0px;'>Email Confirmation</h1>
                                <p style='margin: 0px;padding: 0px;font-size: 14px;line-height: 22px;color: #717171;margin-bottom: 20px;'>Hey ${firstName}, you're almost ready to start enjoying Facebook.<br>
                                Simply click the big yellow button below to verify your<br>
                                email address.</p>
                                <a style='background: #FFB200;color: #fff;padding: 15px 20px;display: inline-block;border-radius: 3px;text-decoration: none;font-size: 15px;margin-bottom: 30px;' href='${url}/verify/?token=${hashCode}'>Verify email address</a>
                            </div>
                        </div>`
                     };                    
                     transporter.sendMail(mailOptions, function(error, info){
                       if (error) {
                         console.log(error);
                       } else {
                         console.log('Email sent: ' + info.response);
                       }
                     });
                    responseInfo.taken = false;
                    responseInfo.success = true;
                    res.send(JSON.stringify(responseInfo))
                    res.end();
                });
            }
          } 
        }
    });
});


/*------------------------Start Method One--------------------------*/
// app.get('/verify/:token', function(req, res) {
//     // res.send('user' + req.params.id); 
//     console.log(req.params.token)  
//     // res.send(dir)
//     res.sendFile(dir + '/recover.html'); //
//     // http://localhost:3000/verify/498
// });
/*------------------------End Method One-----------------------------*/


/*-----------------------Start Method Two----------------------------*/
// app.get('/verify', function(req, res) {
//     let token = req.query.token;
//     let url = req.protocol + "://" + req.headers.host + req.baseUrl;
//     console.log(token)
//     console.log(url)
//     // res.send(user_id + ' ' + token + ' ' + geo);
//     // res.sendFile(dir + '/recover.html');
//     res.writeHead(301,{Location: url});
//     res.end()
//     // http://localhost:3000/verify/?token=498
// });
/*------------------------End Method Two-----------------------------*/


app.get('/verify', function(req, res) {
    let token = req.query.token;
    let url = req.protocol + "://" + req.headers.host + req.baseUrl;

    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let props = Object.keys(users);
            let serverRes = {'user':token,'verified':''};
            for(let i = 0; i < props.length; i++) {
                if(props[i] == token) {
                    users[""+props[i]+""].verified = true;
                    serverRes.user = token;
                    serverRes.verified = true;
                    break;
                }
            }
            if(serverRes.verified) {
                fs.writeFile('./database/users.json', JSON.stringify(users), 'utf8', function (err) {
                    if (err) throw err;
                    res.writeHead(301,{Location: url});
                    res.end();
                    console.log("inside serverRes.verified")
                });
            }
            console.log("outside")
        }
    });
});


app.post('/login', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let props = Object.keys(users);
            let serverRes = {'info':'Wrong Password','token':''};
            for(let i = 0; i < props.length; i++) {
                if(users[""+props[i]+""].email == req.body.email.toLowerCase()) {
                    if(users[""+props[i]+""].password == req.body.password) {                                                
                        if(users[""+props[i]+""].verified == true) {
                            serverRes.token = props[i];
                            break
                        }else {
                            serverRes.info = 'Unverified Account!';
                        }  
                        break                
                    }else {
                        serverRes.info = 'Wrong Password!';
                    }
                    break
                }else {
                    serverRes.info = 'Wrong Email!';
                }
            }
            console.log(serverRes);
            res.send(serverRes);
        }
    });
});



app.post('/logged-user', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let serverRes = {'validToken':'','token':'',"loggedUser":''};
            if(users[""+req.body.loggedUserToken+""]) {
                serverRes.validToken = true;
                serverRes.token = req.body.loggedUserToken;
                serverRes.loggedUser = new LoggedUser(
                    req.body.loggedUserToken,
                    users[""+req.body.loggedUserToken+""].firstName,
                    users[""+req.body.loggedUserToken+""].lastName,
                    users[""+req.body.loggedUserToken+""].email,
                    users[""+req.body.loggedUserToken+""].birthDay.day,
                    users[""+req.body.loggedUserToken+""].birthDay.month,
                    users[""+req.body.loggedUserToken+""].birthDay.year,
                    users[""+req.body.loggedUserToken+""].gender,
                    users[""+req.body.loggedUserToken+""].posts,
                    users[""+req.body.loggedUserToken+""].photos,
                    users[""+req.body.loggedUserToken+""].videos,
                    users[""+req.body.loggedUserToken+""].friends,
                    users[""+req.body.loggedUserToken+""].profileImg,
                    users[""+req.body.loggedUserToken+""].coverImg
                );
            }else {
                serverRes.validToken = false;
            }
            console.log(serverRes);
            console.log(req.body.loggedUserToken)
            res.send(serverRes);
        }
    });
});



// For Friends Stored as Objects
app.post('/load-friends', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let props = Object.keys(users);
            for(let i = 0; i < props.length; i++) {
                if(props[i] == req.body.token) {
                    let friendsObj = users[""+props[i]+""].friends;
                    let friendsTokenList = Object.keys(friendsObj);
                    let friendsList = [];
                    friendsTokenList.forEach((el,index) => {
                        friendsList.push(users[""+friendsTokenList[index]+""]);
                    });
                    res.send(JSON.stringify(friendsList));
                    break
                }
            }
        }
    });
});



app.post('/load-users', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let props = Object.keys(users);
            let typedValue = req.body.typedValue;
            let matchedUsers = [];
            let currentUser  = '';
            for(let i = 0; i < props.length; i++) {
                currentUser = users[""+props[i]+""];
                if(currentUser.verified) {
                    if(currentUser.firstName.startsWith(''+typedValue+'') || currentUser.lastName.startsWith(''+typedValue+'') || (currentUser.firstName+''+currentUser.lastName).startsWith(''+typedValue+'') || (currentUser.lastName+''+currentUser.firstName).startsWith(''+typedValue+'')) {
                        matchedUsers.push({
                            'image'    : currentUser.profileImg,
                            'firstName': currentUser.firstName,
                            'lastName' : currentUser.lastName,
                            'token'    : currentUser.token,
                            'gender'   : currentUser.gender
                        });
                    }
                }
            }
            console.log(matchedUsers)
            res.send(JSON.stringify(matchedUsers));
        }
    });
});




app.post('/search-user', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let targetUser = users[""+req.body.targetToken+""];
            fs.readFile('./database/posts.json', 'utf8', function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                    let posts = JSON.parse(data);
                    let usersAndSharedPosts = [];
                    let postsForSending  = [];                            
                    for(let i = 0; i < posts.length; i++) {
                        if(posts[i].author == req.body.targetToken || posts[i].shares.includes(req.body.targetToken)) {
                            usersAndSharedPosts.push(posts[i]);
                        }
                    }
                    for(let i = 0; i < usersAndSharedPosts.length; i++) {
                        postsForSending.push({
                            "token"     : users[""+usersAndSharedPosts[i].author+""].token,
                            "firstName" : users[""+usersAndSharedPosts[i].author+""].firstName,
                            "lastName"  : users[""+usersAndSharedPosts[i].author+""].lastName,
                            "image"     : users[""+usersAndSharedPosts[i].author+""].profileImg,
                            "id"        : usersAndSharedPosts[i].id,
                            "date"      : usersAndSharedPosts[i].date,
                            "text"      : usersAndSharedPosts[i].text,
                            "likes"     : usersAndSharedPosts[i].likes,
                            "comments"  : usersAndSharedPosts[i].comments,
                            "shares"    : usersAndSharedPosts[i].shares
                        });
                    }
                    res.send(JSON.stringify({"user":targetUser,"posts":postsForSending}));   
                }
            });
        }
    });
});





app.post('/add-remove-friend', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data); 
            if(users[""+req.body.loggedUser+""].friends.hasOwnProperty(req.body.searchedUser)) {
                delete users[""+req.body.loggedUser+""].friends[''+req.body.searchedUser+''];
                addFriend(users);
            }else {
                users[""+req.body.loggedUser+""].friends[''+req.body.searchedUser+''] = '';
                addFriend(users);
            }
            function addFriend($users) {
                fs.writeFile('./database/users.json', JSON.stringify($users), 'utf8', function (err) {
                    if (err) throw err;
                    res.send(JSON.stringify(users[""+req.body.loggedUser+""]));
                    res.end();
                });
            }
        }
    });
});




app.post('/load-messages', function (req, res) {
    fs.readFile('./database/messages.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let messages = JSON.parse(data);
            let loggedUserMessagesWithFriend = [];
            let meOrFriend = '';
            fs.readFile('./database/users.json', 'utf8', function (err, data) {
                if (err) {                    
                    console.log(err);
                } else {  
                    let users = JSON.parse(data);
                    messages.forEach(message => {
                        if((message.sender == req.body.userTk || message.receiver == req.body.userTk) && (message.sender == req.body.friendTk || message.receiver == req.body.friendTk)) {
                            (req.body.userTk == message.sender) ? meOrFriend = 'me' : meOrFriend = 'friend';
                            let msgSenderImg = users[""+message.sender+""].profileImg;
                            loggedUserMessagesWithFriend.push({"date":message.date,"text":message.text,"image":msgSenderImg,"author":meOrFriend});
                        }
                    });
                    res.send(JSON.stringify(loggedUserMessagesWithFriend));
                }
            });            
        }
    });
});


app.post('/send-message', function (req, res) {
    fs.readFile('./database/messages.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let messages = JSON.parse(data);
            messages.push(req.body.newMessage);
            let loggedUserMessagesWithFriend = [];
            let meOrFriend = '';
            fs.writeFile('./database/messages.json', JSON.stringify(messages), 'utf8', function (err) {
                if (err) throw err;
                fs.readFile('./database/users.json', 'utf8', function (err, data) {
                    if (err) {                    
                        console.log(err);
                    } else {  
                        let users = JSON.parse(data);
                        messages.forEach(message => {
                            if((message.sender == req.body.newMessage.sender || message.receiver == req.body.newMessage.sender) && (message.sender == req.body.newMessage.receiver || message.receiver == req.body.newMessage.receiver)) {
                                (req.body.newMessage.sender == message.sender) ? meOrFriend = 'me' : meOrFriend = 'friend';  
                                let msgSenderImg = users[""+message.sender+""].profileImg;
                                loggedUserMessagesWithFriend.push({"date":message.date,"text":message.text,"image":msgSenderImg,"author":meOrFriend});
                            }
                        });
                        res.send(JSON.stringify(loggedUserMessagesWithFriend));
                    }
                });
            });
        }
    });
});



app.post('/load-message-image', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let props = Object.keys(users);
            let url = '';
            for(let i = 0; i < props.length; i++) {
                if(req.body.token == props[i]) {
                    url = users[""+props[i]+""].profileImg;
                    res.send(JSON.stringify(url))
                    break
                }
            }
        }
    });
});

app.post('/recover-account', function (req, res) {
    fs.readFile('database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let props = Object.keys(users);
            let emailExist ='';
            let userPassword = '';
            let userName = '';
            let responseInfo = {"email":req.body.email,'answer':''};
            for(let i = 0; i < props.length; i++) {
                if(req.body.email == users[""+props[i]+""].email) {
                    let randomPassword = Math.floor(Math.random()*Date.now()).toString(36);
                    users[""+props[i]+""].password = randomPassword;
                    userPassword = users[""+props[i]+""].password;
                    userName = users[""+props[i]+""].firstName;
                    emailExist = true;
                    break
                } else {
                    responseInfo.answer = 'Email not found';
                }
            }
            if(emailExist) {
                fs.writeFile('./database/users.json', JSON.stringify(users), 'utf8', function (err) {
                    if (err) throw err;                    
                    fs.writeFile('./database/users.json', JSON.stringify(users), 'utf8', function (err) {
                        if (err) throw err;
                        let transporter = nodemailer.createTransport({
                            service: 'Hotmail',
                            auth: {
                              user: 'no-replay.facebook@hotmail.com',
                              pass: 'facebook123'
                            }
                          });     
                          let mailOptions = {
                            from: 'Facebook <no-replay.facebook@hotmail.com>',
                            to: `${req.body.email}`,
                            subject: `Temporary Password - Facebook.com`,
                            html: `
                            <div style="width: 750px;box-sizing: border-box;padding: 115px 90px;display: flex;align-items: center;justify-content: center;background: #F3F3F3;font-family: verdana;text-align: center;">
                                 <div style="width: 550px;box-shadow: 0px 1px 2px 2px #E9E9E9;border-radius: 4px;overflow: hidden;background: #fff;justify-content: center;">
                                     <header style="background: #4267B2;padding: 55px 0px;text-align: center;font-size: 50px;font-weight: bold;color: #fff;">Facebook</header>
                                     <h1 style="color: #4c4c4c;font-weight: normal;font-size: 30px;margin: 24px 0px;">Temporary Password</h1>
                                     <p style="margin: 0px;padding: 0px 30px;font-size: 14px;line-height: 22px;color: #717171;margin-bottom: 20px;">Hi ${userName}, You recently requested to reset your password for your Facebook account. Copy the password below. We recommend that you change your password after login.</p>
                                     <span style="background: #FFB200;color: #fff;padding: 10px 20px;display: inline-block;border-radius: 3px;text-decoration: none;font-size: 15px;margin-bottom: 30px;">${userPassword}</span>
                                 </div>
                             </div>`
                          };
                         
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              responseInfo.answer = 'Sent';
                              res.send(JSON.stringify(responseInfo))
                              console.log('Email sent: ' + info.response);
                            }
                          });       
                    })
                    
                })
            } else {
                responseInfo.answer = 'The user associated with this email does\'t exist.';
                res.send(JSON.stringify(responseInfo))
                res.end();
            }

        }
    })
});



app.post('/password-change', function(req, res) {
    fs.readFile('database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let userEmail = users[""+req.body.user+""].email;
            let userName = capitalizeStr(users[""+req.body.user+""].firstName);
            let responseTxt = 'password changed!';
            if(users[""+req.body.user+""].password = req.body.newPassword) {    
                    fs.writeFile('./database/users.json', JSON.stringify(users), 'utf8', function (err) {
                        if (err) throw err;
                        let transporter = nodemailer.createTransport({
                            service: 'Hotmail',
                            auth: {
                              user: 'no-replay.facebook@hotmail.com',
                              pass: 'facebook123'
                            }
                          });                    
                          let mailOptions = {
                            from: 'Facebook <no-replay.facebook@hotmail.com>',
                            to: `${userEmail}`,
                            subject: `Password Reset - Facebook.com`,
                            html: `
                            <div style='width: 750px;box-sizing: border-box;padding: 115px 90px;display: flex;align-items: center;justify-content: center;background: #F3F3F3;font-family: verdana;text-align: center;'>
                                 <div style='width: 550px;box-shadow: 0px 1px 2px 2px #E9E9E9;border-radius: 4px;overflow: hidden;background: #fff;justify-content: center;'>
                                     <header style='background: #4267B2;padding: 55px 0px;text-align: center;font-size: 50px;font-weight: bold;color: #fff;'>Facebook</header>
                                     <h1 style='color: #4c4c4c;font-weight: normal;font-size: 30px;margin: 24px 0px;'>Password Reset</h1>
                                     <p style='margin: 0px;padding: 0px;font-size: 14px;line-height: 22px;color: #717171;margin-bottom: 20px;'>Hi ${userName}, your password changed successfully.</p>
                                 </div>
                             </div>`
                          };
                         
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                        res.send(responseTxt);
                        res.end();
                    });
            }else {
                res.send('Something Wrong');
                res.end();
            }
        }
    });
});


app.post('/email-change', function(req, res) {
    fs.readFile('database/users.json', 'utf8', function (err, data) {
        if(err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            let props = Object.keys(users);
            let userName = capitalizeStr(users[""+req.body.user+""].firstName);
            let result = '';
            let responseTxt = 'email changed!';
            for(let i = 0; i < props.length; i++) {
                if(req.body.newEmail == users[""+props[i]+""].email) {
                    result = true;
                }
            }
            if(result != true) {
                users[""+req.body.user+""].email = req.body.newEmail;
                fs.writeFile('./database/users.json', JSON.stringify(users), 'utf8', function (err) {
                    if(err) throw err;
                    let transporter = nodemailer.createTransport({
                        service: 'Hotmail',
                        auth: {
                          user: 'no-replay.facebook@hotmail.com',
                          pass: 'facebook123'
                        }
                      });                
                      let mailOptions = {
                        from: 'Facebook <no-replay.facebook@hotmail.com>',
                        to: `${users[""+req.body.user+""].email}`,
                        subject: `Email Reset - Facebook.com`,
                        html: `
                        <div style='width: 750px;box-sizing: border-box;padding: 115px 90px;display: flex;align-items: center;justify-content: center;background: #F3F3F3;font-family: verdana;text-align: center;'>
                             <div style='width: 550px;box-shadow: 0px 1px 2px 2px #E9E9E9;border-radius: 4px;overflow: hidden;background: #fff;justify-content: center;'>
                                 <header style='background: #4267B2;padding: 55px 0px;text-align: center;font-size: 50px;font-weight: bold;color: #fff;'>Facebook</header>
                                 <h1 style='color: #4c4c4c;font-weight: normal;font-size: 30px;margin: 24px 0px;'>Email Reset</h1>
                                 <p style='margin: 0px;padding: 0px;font-size: 14px;line-height: 22px;color: #717171;margin-bottom: 20px;'>Hi ${userName}, your email changed successfully.</p>
                             </div>
                         </div>`
                      };
                     
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                    res.send(responseTxt);
                    res.end();
                })
            } else {
                console.log("Something Wrong!");
                res.send('Something Wrong');
                res.end();
            }

        }
    })
})



app.post('/upload-image',function(req,res){
    console.log(req.files);
    if(req.files.image){
    let file = req.files.image,
        name = file.name,
        type = file.mimetype;
        size = file.data.length;
        maxSize = 1500000;
        ext = type.split('/')[1],
        userProp = req.body.token;
        imageName = Math.floor(Date.now() * (Math.random() * (100 - 1) + 1));
        console.log('extension is: '+ext);
        if(ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') {
          if(size < maxSize) {
            let uploadpath = __dirname + '/uploads/images/'+userProp+'/' + imageName +'.'+ext;
            file.mv(uploadpath,function(err){
              if(err){
                console.log("File Upload Failed",name,err);
                res.send("Error Occured!")
              }else {
                    fs.readFile('./database/users.json', 'utf8', function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            let users    = JSON.parse(data);
                            let newPhoto = new Photo(imageName+'.'+ext);
                            users[""+req.body.token+""].photos.push(newPhoto); 

                            fs.writeFile('./database/users.json', JSON.stringify(users), 'utf8', function (err) {
                                if (err) throw err;
                                console.log("File Uploaded",name);
                                // res.send('Done! Uploading files');
                                res.send(JSON.stringify(newPhoto));
                            });
                        }
                    });
              }
            });
          }else {
            console.log("Max file size is ",maxSize);
            res.send('Max file size is '+maxSize);
          }
      }else {
        console.log("Only images are allowed!");
        res.send("Only images are allowed!");
        res.end();
      }
    }
    else {
      res.send("No File selected !");
      res.end();
    };
});



app.post('/change-profile-image', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            users[""+req.body.token+""].profileImg = req.body.imgUrl;
            fs.writeFile('./database/users.json', JSON.stringify(users), 'utf8', function (err) {
                if (err) throw err;
                res.send({"img":"profile","url":users[""+req.body.token+""].profileImg});
                res.end();
            });
        }
    });
});


app.post('/change-cover-image', function (req, res) {
    fs.readFile('./database/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let users = JSON.parse(data);
            users[""+req.body.token+""].coverImg = req.body.imgUrl;
            fs.writeFile('./database/users.json', JSON.stringify(users), 'utf8', function (err) {
                if (err) throw err;
                res.send({"img":"cover","url":users[""+req.body.token+""].coverImg});
                res.end();
            });
        }
    });
});



app.post('/delete-image', function (req, res) {
    fs.exists('./uploads/images/'+req.body.imgUrl, function(exists) {   
        if(exists) {
            fs.unlink('./uploads/images/'+req.body.imgUrl, (err) => {
                if (err) throw err;
                fs.readFile('./database/users.json', 'utf8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        let users = JSON.parse(data);
                        let photos = users[""+req.body.token+""].photos;
                        let url = req.body.imgUrl.split('/')[1];        
                        for(let i = 0; i < photos.length; i++) {
                            if(photos[i].name == url) {  
                                photos.splice(photos.indexOf(photos[i]),1);
                                (users[""+req.body.token+""].profileImg == req.body.imgUrl) ? users[""+req.body.token+""].profileImg = '' : true;
                                (users[""+req.body.token+""].coverImg == req.body.imgUrl) ? users[""+req.body.token+""].coverImg = '' : true;                               
                                updateUser(JSON.stringify(users));
                            }
                        }
                        function updateUser(data) {
                            fs.writeFile('./database/users.json', data, 'utf8', function (err) {
                                if (err) throw err;
                                res.send({"img":"deleted","photos":users[""+req.body.token+""].photos});
                                console.log('./uploads/images/'+req.body.token+'/'+req.body.imgUrl+' was deleted!');
                                res.end();
                            });
                        }
                    }
                });        
            });
        }else {
            console.log("File is not there")
        }     
    });
});



app.post('/upload-video',function(req,res){
    console.log(req.files);
    if(req.files.video){
    let file = req.files.video,
        name = file.name,
        type = file.mimetype;
        size = file.data.length;
        maxSize = 50000000;
        ext = type.split('/')[1],
        userProp = req.body.token;
        videoName = Math.floor(Date.now() * (Math.random() * (100 - 1) + 1));
        console.log('extension is: '+ext);
        if(ext == 'mp4' || ext == 'flv' || ext == 'mov' || ext == 'avi') {
          if(size < maxSize) {
            let uploadpath = __dirname + '/uploads/videos/'+userProp+'/' + videoName +'.'+ext;
            file.mv(uploadpath,function(err){
              if(err){
                console.log("File Upload Failed",name,err);
                res.send("Error Occured!")
              }else {
                    fs.readFile('./database/users.json', 'utf8', function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            let users    = JSON.parse(data);
                            let newVideo = new Video(videoName+'.'+ext);
                            users[""+req.body.token+""].videos.push(newVideo);

                            fs.writeFile('./database/users.json', JSON.stringify(users), 'utf8', function (err) {
                                if (err) throw err;
                                console.log("File Uploaded",name);
                                // res.send('Done! Uploading files');
                                res.send(JSON.stringify(newVideo));
                            });
                        }
                    });
              }
            });
          }else {
            console.log("Max file size is ",maxSize);
            res.send('Max file size is '+maxSize);
          }
      }else { //if = mp4
        console.log("Only Videos are allowed!");
        res.send("Only Videos are allowed!");
        res.end();
      }
    }
    else {
      res.send("No File selected !");
      res.end();
    };
});



app.post('/add-post', function (req, res) {
  fs.readFile('./database/posts.json', 'utf8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        let posts = JSON.parse(data);
        let postId = '';
        if(posts.length) {
            lastPost = posts[posts.length - 1];
            postId = Number(lastPost.id)+1;
        }else {
            postId = 1;
        }
        let newPost = new Post(postId,req.body.author,req.body.postValue);
        posts.push(newPost);
        fs.writeFile('./database/posts.json', JSON.stringify(posts), 'utf8', function (err) {
            if (err) throw err;
            fs.readFile('./database/users.json', 'utf8', function (err, data) {
                if (err) {                    
                    console.log(err);
                } else {  
                    let users = JSON.parse(data);
                    let returnPost = {
                        "token"     : users[""+req.body.author+""].token,
                        "firstName" : users[""+req.body.author+""].firstName,
                        "lastName"  : users[""+req.body.author+""].lastName,
                        "image"     : users[""+req.body.author+""].profileImg,
                        "id"        : newPost.id,
                        "date"      : newPost.date,
                        "text"      : newPost.text,
                        "likes"     : newPost.likes,
                        "comments"  : newPost.comments,
                        "shares"    : newPost.shares
                    }
                    res.send(JSON.stringify(returnPost));
                }
            });
        });
    }
});
});



app.post('/load-posts', function (req, res) {
    fs.readFile('./database/posts.json', 'utf8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
            let posts = JSON.parse(data);
            let myAndSharedPosts = [];
            let postsForSending  = [];
            fs.readFile('./database/users.json', 'utf8', function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                    let users = JSON.parse(data);                    
                    for(let i = 0; i < posts.length; i++) {
                        if(posts[i].author == req.body.author || posts[i].shares.includes(req.body.author)) {
                          myAndSharedPosts.push(posts[i]);
                        }
                    }
                    for(let i = 0; i < myAndSharedPosts.length; i++) {
                      postsForSending.push({
                          "token"     : users[""+myAndSharedPosts[i].author+""].token,
                          "firstName" : users[""+myAndSharedPosts[i].author+""].firstName,
                          "lastName"  : users[""+myAndSharedPosts[i].author+""].lastName,
                          "image"     : users[""+myAndSharedPosts[i].author+""].profileImg,
                          "id"        : myAndSharedPosts[i].id,
                          "date"      : myAndSharedPosts[i].date,
                          "text"      : myAndSharedPosts[i].text,
                          "likes"     : myAndSharedPosts[i].likes,
                          "comments"  : myAndSharedPosts[i].comments,
                          "shares"    : myAndSharedPosts[i].shares
                      });
                    }
                    res.send(JSON.stringify(postsForSending));
                }
            });     
        }
    });
});




app.post('/like-post', function (req, res) {
    fs.readFile('./database/posts.json', 'utf8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
            let posts = JSON.parse(data);
            let targetPost = '';
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].id == req.body.postId) {
                    targetPost = posts[i];
                    if(targetPost.likes.includes(req.body.likeAuthor)) {
                        targetPost.likes.splice(targetPost.likes.indexOf(req.body.likeAuthor),1);
                    }else {
                        targetPost.likes.push(req.body.likeAuthor); 
                    }                    
                    updatePost(posts);
                    break;
                }
            }
            function updatePost(updatedPost) {
                fs.writeFile('./database/posts.json', JSON.stringify(updatedPost), 'utf8', function (err) {
                    if (err) throw err;
                    res.send(JSON.stringify(targetPost));
                });
            }            
        }
    });
});



app.post('/delete-post', function (req, res) {
    fs.readFile('./database/posts.json', 'utf8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
            let posts = JSON.parse(data);
            let targetPost = '';
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].id == req.body.postId) {
                    posts.splice(posts.indexOf(posts[i]),1);                                    
                    updatePost(posts);
                    break;
                }
            }
            function updatePost(updatedPost) {
                fs.writeFile('./database/posts.json', JSON.stringify(updatedPost), 'utf8', function (err) {
                    if (err) throw err;
                    res.send('deleted');
                    res.end();
                });
            }            
        }
    });
});


app.get('*', function (req, res) {
    res.sendFile(dir + '/index.html');
});



app.listen(port, () => {
    console.log(`Server Started at Port: ${port}`);
});









