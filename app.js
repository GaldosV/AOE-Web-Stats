const express = require ('express');
const session = require ('express-session');
const passport = require('passport');

const SteamStrategy = require('passport-steam').Strategy;

const app = express();

// conf de la sesion
app.use(session({ secret: 'cookie_secreta', resave: true, saveUninitialized: true }));

// Hacer la cookie mas segura 

// se hace el passport

app.use(passport.initialize());
app.use(passport.session());

// Configura el strategy de steam 
    // API PERSONAL DE STEAM 3F8670F639C740CA69261D4E254B21E5
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: '3F8670F639C740CA69261D4E254B21E5'

}, (identifier, profile, done) => {
    // Para recoger la info del usuario para la base de datos futura 
    return done(null, profile);

 }));