const prefix = "$";
const fs = require('fs');
module.exports = {
    rank: function (message, data) {
        var rank = data;
        for (var i = 0; i < rank.length - 1; i++) {
            for (var j = 0; j < rank.length - 1; j++) {
                if (rank[j].stars < rank[j + 1].stars) {
                    var tmpStars = rank[j];
                    rank[j] = rank[j + 1];
                    rank[j + 1] = tmpStars;
                }
            }
        }
        console.log("rank");
        console.log(rank);
        console.log("data");
        console.log(data);
        message.channel.send("1) " + rank[0].name);
        message.channel.send("2) " + rank[1].name);
        message.channel.send("3) " + rank[2].name);
    },
    reset: function (message, data) {
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
        return data;
    },
    star: function (message, data) {
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Mentor") || message.member.roles.find("name", "Grammar Enforcer") || message.author.id == '401965023527829505') {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            //message.guild.members.get( message.mentions.users.first().id ).setNickname("⭐");
            var x = message.mentions.users.first().id;
            if (message.author.id == x) {
                message.channel.send("Cheater! Don't give stars to yourself!");
            } else {
                var found = false;
                var add = false;
                var tstars = 0;
                for (var i = 0; i < data.length - 1; i++) {
                    if (data[i].id == x) {
                        found = true;
                        if (data[i].stars < 4) {
                            add = true;
                            data[i].stars++;
                            tstars = data[i].stars;
                        }
                    }
                }
                if (!found) {
                    var tmp = {
                        "id": x,
                        "name": message.guild.members.get(x).displayName,
                        "stars": 1
                    }
                    data.push(tmp);
                    message.guild.members.get(x).setNickname(message.guild.members.get(x).displayName + "⭐");
                    message.channel.send(message.author + " gave " + args[0] + " a :star:!");
                } else {
                    if (add) {
                        var index = -1;
                        if (tstars == 4) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].id == x) {
                                    found = true;
                                    index = i;
                                }
                            }
                            message.guild.members.get(x).setNickname(data[index].name + "🌟");
                        } else {
                            message.guild.members.get(x).setNickname(message.guild.members.get(x).displayName + "⭐");
                        }
                        message.channel.send(message.author + " gave " + args[0] + " a star!");
                    } else {
                        message.channel.send("Uh oh! They already have max amount of stars! I can't give them more!");
                    }
                }
            }
            console.log(data);
            fs.writeFileSync("./data.json", JSON.stringify(data));
        } else {
            message.channel.send("Whoops! You don't seem to have permission to do that...");
        }
        return data;
    },
    _star: function (message, data) {
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
                    for (var i = 0; i <= tstars; i++) {
                        message.guild.members.get(x).setNickname(data[index].name + "⭐");
                    }
                }
                message.channel.send(message.author + " took " + args[0] + "'s star!");

            }
        } else {
            message.channel.send("Whoops! You don't seem to have permission to do that...");
        }
        return data;
    },
    rename: function (message, data) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        //message.guild.members.get( message.mentions.users.first().id ).setNickname("⭐");
        var x = message.mentions.users.first().id;
        var found = false;
        for (var i = 0; i < data.length - 1; i++) {
            if (data[i].id == x) {
                data[i].name == args[1];
            }
        }
        message.channel.send("If that person exists, then their name will be set to " + args[1] + " on the next reset!");
        return data;
    },
    oof: function (message) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        var x = message.mentions.users.first().id;
        message.channel.send("<@" + x + "> has been oofed!");
    },
    announce: function (message) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        var str = "";
        for (var i = 0; i < args.length; i++) {
            if (args[i] != null) {
                str = str + args[i];
            }
        }
        var channel = message.guild.channels.get("name", "announcements");
        channel.send(str);
    }
}