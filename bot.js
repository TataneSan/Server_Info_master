const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
var request = require('request');

let token = config.token;

console.log("Initiating login process...");
bot.login(token); // Mettre le token de votre bot dans le fichier config.json

var request = require('request');
var mcIP = 'IP SERVEUR SANS LE PORT'; // IP de votre serveur (sans le port)
var mcPort = PORT DU SERVEUR; // port de votre serveur



setInterval(function(){ 

/////////////////////////////////////////////////////////////////////////////////////////////
/// POUR OBTENIR LES IDs, VOUS DEVEZ ACTIVER LE MODE DÉVELOPPEUR DANS LES OPTIONS DISCORD ///
/////////////////////////////////////////////////////////////////////////////////////////////

    let guild = bot.guilds.cache.get('604825934578712586'); // ID de votre serveur Discord
    
    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return console.log("Impossible d'obtenir le status du serveur...");
            }
            body = JSON.parse(body);
            var status = '';

            var players = '0'
            if(body.online) {
                status = 'Serveur: Ouvert';
                guild.channels.cache.get("IDENTIFIANT DU CHANNEL > Status Serveur").setName(status); // Remplacer "IDENTIFIANT DU CHANNEL > Status Serveur" par l'id de votre channel
                if(body.players.now) {
                    players = 'Joueurs connectés: ' + body.players.now;
                    guild.channels.cache.get("IDENTIFIANT DU CHANNEL > Joueurs connectés").setName(players); // Remplacer "IDENTIFIANT DU CHANNEL > Joueurs connectés" par l'id de votre channel
                } else {
                    players = 'Joueurs connectés: 0';
                    guild.channels.cache.get("IDENTIFIANT DU CHANNEL > Joueurs connectés").setName(players); // Remplacer "IDENTIFIANT DU CHANNEL > Joueurs connectés" par l'id de votre channel
                }
            } else {

                status = "Serveur: Fermé" 
                guild.channels.cache.get("IDENTIFIANT DU CHANNEL > Status Serveur").setName(status); // Remplacer "IDENTIFIANT DU CHANNEL > Status Serveur" par l'id de votre channel
                
                players = 'Joueurs connectés: 0';
                guild.channels.cache.get("IDENTIFIANT DU CHANNEL > Joueurs connectés").setName(players); // Remplacer "IDENTIFIANT DU CHANNEL > Joueurs connectés" par l'id de votre channel

            }
        });

}, 10000);

bot.on('ready', () => {
    console.log('Connecté!');
	bot.user.setStatus("online"); // dnd(ne pas déranger) online idle(afk) invisible
	bot.user.setActivity('Description Bot'); // Le status du bot qui sera affiché
});