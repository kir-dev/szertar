# szertar
[![Build Status](https://travis-ci.org/kir-dev/szertar.svg?branch=master)]
(https://travis-ci.org/kir-dev/szertar)
[![Known Vulnerabilities](https://snyk.io/test/github/kir-dev/szertar/badge.svg)](https://snyk.io/test/github/kir-dev/szertar)

# How to run

- have [nodejs](https://nodejs.org/en/download/) installed

- have npm installed
- have [mongodb](https://www.mongodb.com/download-center?jmp=nav#community) installed and running on default port 27017

go to root folder of the project ../szertar

$ `npm i` 

$ `node app.js` 

# config/config.js
Sample config

```
var config = {

    port: 8000,
    logrequests: true,
    sessionSecret: '', //sensitive
    mongo: {
        path: '' //sensitive
    },
    oauth2: {
        authorizationURL: 'https://auth.sch.bme.hu/site/login',
        tokenURL: 'https://auth.sch.bme.hu/oauth2/token',
        userURL: 'https://auth.sch.bme.hu/api/profile?access_token=',
        id: '', //sensitive
        key: '', //sensitive
        callbackURL: 'http://localhost:8000/auth/authsch/callback',
        scope: [
            'basic',
            'displayName',
            'mail',
            'mobile',
            'eduPersonEntitlement'
        ]
    }
};

module.exports = config;
```