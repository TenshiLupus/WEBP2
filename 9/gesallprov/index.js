const express = require('express');
const bodyParser = require('body-parser'); 
const cookieSession = require('cookie-session')
const usersRepo = require('./repository/users');

const app = new express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(
    cookieSession({
        keys: ['ljidyu760fo']
    }));

app.get('/signup', (req, res) => {
    
    // similar to php's echo
    res.send(`
    <div>
    Your id is: ${req.session.userId}
    <form method="POST">
    <input name="email" placeholder="email" />
    <input name="password" placeholder="password" />  
    <input name="passwordConfirmation" placeholder="passwordConfirmation" /> 
    <button>Sign Up</button>    
    </form>
    </div>
    `);

    console.log(req.session.userId);
});

// const bodyParser = (req, res, next) => {
//     if (req.method === "POST") {
//         req.on('data', data => {
//             const parsed = data.toString('utf8').split('&');
//             const formData = {};
//             for (let pair of parsed) {
//                 const [key, value] = pair.split('=');
//                 formData[key] = value;
//             }
//             req.body = formData; 
//             next();
//         });
//     } else{
//         next();
//     }
// }

app.post('/signup', async (req, res) => {
    
    const {email, password, passwordConfirmation } = req.body; 

    const existingUser = await usersRepo.getOneBy({ email });

    if(existingUser){
        return res.send('Email in use');
    }

    if(password !== passwordConfirmation){
        return res.send('Passwords must match');
    }

    const user = await usersRepo.create({email, password});
    
    req.session.userId = user.id; 
    console.log(req.session);

    res.send('Account created!!!');
});

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');

});

app.get('/signin', (req, res) => {
    res.send(`
    <div>
    <form method="POST">
    <input name="email" placeholder="email" />
    <input name="password" placeholder="password" />  
    <button>Sign In</button>    
    </form>
    </div>
    `);
});
 
app.listen(3000, () => {
    console.log('listening');
});

