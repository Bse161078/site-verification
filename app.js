var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require("cors");

const {google} = require('googleapis');
const OAuth2Client =google.auth.OAuth2;


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));



const oauth2Client=() =>{
    return new google.auth.OAuth2(
        "66805527862-vtcb1djnqbt1e219lfjo4bepducecsqn.apps.googleusercontent.com",
        "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",
        'https://domain-verification-c7a75.web.app/'
    );
}

const oauth2GetAuthorizationCode = (req,res)=> {

    const client = oauth2Client();

    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/siteverification'
        ]
    });
    res.status(200).send({url: url});
};

const oauth2GetAccessToken= (req, res) => {

    const client = oauth2Client();
    const code = req.query.code;

    client.getToken(code, (err, tokens) => {
        if (!err) {
            res.status(200).send({tokens});
        } else {
            console.error('Error while getting access token:', err);
            res.sendStatus(500);
        }
    });
};


const oauth2ClientWithCredentials=(access_token,refresh_token)=> {
    const client = oauth2Client();

    client.setCredentials({
        access_token,
        refresh_token
    });

    return client;
}




const invokeSiteVerificationApi=async (req,res)=> {

    const client = oauth2ClientWithCredentials(req.body.access_token,req.body.refresh_token);

    const siteVerification = google.siteVerification({
        version: 'v1',
        auth: client
    });

    try{
        const data=await siteVerification.webResource.insert({
            verificationMethod: 'DNS_TXT',
            requestBody: {
                site: {
                    type: 'INET_DOMAIN',
                    identifier: req.body.domain,
                },
            }
        });
        res.status(200);
        res.json(data);
    }catch (e) {
        res.status(500);
        res.json(e);
    }
}


const generateTokenToVerifyDomain=async(req,res)=>{
    const client = oauth2ClientWithCredentials(req.body.access_token,req.body.refresh_token);

    const siteVerification = google.siteVerification({
        version: 'v1',
        auth: client
    });

    try{
        const { data } = await siteVerification.webResource.getToken({
            requestBody: {
                site: {
                    type: 'INET_DOMAIN',
                    identifier: req.body.domain,
                },
                verificationMethod: 'DNS_TXT',
            }
        });
        const token = data.token;
        res.json({data});
    }catch (e) {
        res.json(e);
    }

}

app.get('/', oauth2GetAuthorizationCode);
app.get('/token', oauth2GetAccessToken);
app.post('/verify', invokeSiteVerificationApi);
app.post('/generate-token', generateTokenToVerifyDomain);

app.use('/users', usersRouter);


app.listen(3000)

module.exports = app;



