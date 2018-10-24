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
    rank: function (message) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        var x = message.mentions.users.first().id;

        for (var i = 0; i < data.length; i++) {
            if (data[i].id == x) {
                data[i].name = args[1];
            }
        }
        message.channel.send("If that person exists, their name will be set to " + args[1] + " on the next reset!");
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
        }
        return data;
    }
}