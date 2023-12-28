const express = require ('express');
const session = require ('express-session');
const req = require('express/lib/request');
const res = require('express/lib/response');
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
    // API PERSONAL DE STEAM
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: 'api'

}, (identifier, profile, done) => {
    // Para recoger la info del usuario para la base de datos futura 
    return done(null, profile);

 }));

 app.get('/auth/steam', passport.authenticate('steam'));

app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirec: '/' } ) , (req , res)=> {  res.redirect('/profile')});

// pagina inicio 

app.get('/' , (req , res )=> {res.send('Sup <a href="/auth/steam">Iniciar sesión con Steam</a>')});

// iniciamos servwer

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log('Server en funcionamiento ')
});



