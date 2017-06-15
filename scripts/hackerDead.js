var story = {};

story.title = "Hacker Dead";

// Scene objects holding all the necessary information for each scene and connected by getNextScene methods
// The scenes are stored in reverse order

story.L4B6 = {
    requiredMadlibs: ["object"],
    userMadlibs: [
		{madlib: "object", value: ""},
    ],
    storyContent: function (storyInfo) {
        return `Zombie ${storyInfo.instructor} was faster than you thought and they are about to bite you. In your panic you trip on a ${this.userMadlibs[0].value} and you fall to your death. RIP 💩`;
    },
    choices: [] 
};

story.L4B5 = {
    requiredMadlibs: ["McDonald's food"],
    userMadlibs: [
		{madlib: "McDonald's food", value: ""},
    ],
    storyContent: function (storyInfo) {
        return `Not wanting to suffer the same fate as poor Alex, you bolt out of the room and manage to outrun Zombie ${storyInfo.instructor}.
		<br>Congrats!! You have survived the ${storyInfo.instructor}-pocalypse. Now go get yourself some ${this.userMadlibs[0].value}. You deserve it 💩. `;
    },
    choices: [] 
};

story.L4B4 = {
    requiredMadlibs: [],
    userMadlibs: [
		{}
    ],
    storyContent: function (storyInfo) {
        return `You take a wild swing, but sadly you are not strong enough to affect Zombie ${storyInfo.instructor} with your ${storyInfo.character.weapon}. Zombie ${storyInfo.instructor} bites you. OH NOOO, YOU DEAD. But not really, because you turned into a zombie and at least you have ${storyInfo.instructor} to accompany you 💩`;
    },
    choices: [] 
};


story.L4B3 = {
    requiredMadlibs: ["body part"],
    userMadlibs: [
		{madlib: "body part", value: ""},
    ],
    storyContent: function (storyInfo) {
        return `You swing at ${storyInfo.instructor}’s ${this.userMadlibs[0].value} with your ${storyInfo.character.weapon}.
		<br>It was super effective!!!!
		<br>HE STARTS CRYING. 
		<br>Congrats!! You have survived the ${storyInfo.instructor}-pocalypse 💩`;
    },
    choices: [] 
};

story.L4B2 = {
    requiredMadlibs: ["fruits", "adjective"],
    userMadlibs: [
		{madlib: "fruits", value: ""},
		{madlib: "adjective", value: ""}
    ],
    storyContent: function (storyInfo) {
        return `You point to the ${this.userMadlibs[0].value} on the counter behind zombie ${storyInfo.instructor} and shout "Whoa look a those ${this.userMadlibs[1].value} ${this.userMadlibs[0].value}!". But, the zombie just gives you a blank stare and continues to move towards you. Sorry, it seems like you don’t have enough charisma to distract ${storyInfo.instructor}. They are getting even closer!!
			<br>What now?`;
    },
    choices: [
        {
            choice: "Attack with your weapon",
            getNextScene: function (storyInfo) {
                if (storyInfo.character.strength > 5) {
                    return story.L4B3;
                } else {
                    return story.L4B4;
                }
            }
        },
        {
            choice: "Run away!",
            getNextScene: function (storyInfo) {
                if (storyInfo.character.speed > 6) {
                    return story.L4B5;
                } else {
                    return story.L4B6;
                }
            }
        }
    ]
};

story.L4B1 = {
    requiredMadlibs: ["fruits", "adjective"],
    userMadlibs: [
		{madlib: "fruits", value: ""},
		{madlib: "adjective", value: ""}
    ],
    storyContent: function (storyInfo) {
        return `You point to the ${this.userMadlibs[0].value} on the counter behind zombie ${storyInfo.instructor} and shout "Whoa look a those ${this.userMadlibs[1].value} ${this.userMadlibs[0].value}!". Somehow it worked, and they turn around to look at the ${this.userMadlibs[0].value}. You take this opportunity to run out of the building. Congrats, you have survived the ${storyInfo.instructor}-pocalypse 💩`;
    },
    choices: []
};

story.L3B1 = {
    requiredMadlibs: [],
    userMadlibs: [
    ],
    storyContent: function (storyInfo) {
        return `Zombie ${storyInfo.instructor} is now approaching you. What do you do?`;
    },
    choices: [
        {
            choice: "Distract zombie with something",
            getNextScene: function (storyInfo) {
                if (storyInfo.character.charisma > 4) {
                    return story.L4B1;
                } else {
                    return story.L4B2;
                }
            }
        },
        {	
            choice: "Attack with your weapon",
            getNextScene: function (storyInfo) {
                if (storyInfo.character.strength > 5) {
                    return story.L4B3;
                } else {
                    return story.L4B4;
                }
            }
        },
        {
            choice: "Run away!",
            getNextScene: function (storyInfo) {
                if (storyInfo.character.speed > 6) {
                    return story.L4B5;
                } else {
                    return story.L4B6;
                }
            }
        }
    ]
};

story.L2B1 = {
    requiredMadlibs: ["positive adjective", "food", "body part"],
    userMadlibs: [
		{madlib: "positive adjective", value: ""},
		{madlib: "food", value: ""},
		{madlib: "body part", value: ""}
    ],
    storyContent: function (storyInfo) {
        return `"Oh hey ${storyInfo.character.name}" ${storyInfo.instructor} replies. "The trip was ${this.userMadlibs[0].value}. Unfortunately, I ate too much ${this.userMadlibs[1].value} there, and I am not feeling too well... " <br>You notice their face looks oddly pale and their eyes are bloodshot. ${storyInfo.instructor} continues, "... Anyways, how's Javascript going? I hope every... thing... is.... grgreuhhhhh..." <br>Just then, Alex comes to join the conversation, but ${storyInfo.instructor} starts stumbling towards Alex and bites his ${this.userMadlibs[2].value}. It looks like a zombie outbreak is occurring! <br>Quick, grab a weapon:`;
    },
    choices: [
        {
            choice: "Knife from kitchen",
            getNextScene: function (storyInfo) {
                storyInfo.character.weapon = "knife";
                return story.L3B1;
            }
        },
        {
            choice: "Powercord",
            getNextScene: function (storyInfo) {
                storyInfo.character.weapon = "powercord";
                return story.L3B1;
            }
        },
        {
            choice: "The Gong",
            getNextScene: function (storyInfo) {
                storyInfo.character.weapon = "Gong";
                return story.L3B1;
            }
        },
        {
            choice: "Coffee mug",
            getNextScene: function (storyInfo) {
                storyInfo.character.weapon = "mug";
                return story.L3B1;
            }
        }
    ]
};

story.L1 = {
    requiredMadlibs: ["instructor name", "country"],
    userMadlibs: [
		{madlib: "instructor name", value: ""},
		{madlib: "country", value: ""}
    ],
    storyContent: function (storyInfo) {
        storyInfo.instructor = this.userMadlibs[0].value;
        return `Hi ${storyInfo.character.name}, welcome to HACKER DEAD!
		<br>
		<br>It's a Friday evening at HackerYou, and the show and tell presentations have finished. Everyone rushes out of the classroom to greet ${this.userMadlibs[0].value}, who just got back from vacationing in ${this.userMadlibs[1].value}.`;
    },
    choices: [
        {
            choice: "Go and ask about trip",
            getNextScene: function (storyInfo) {
                return story.L2B1;
            }
        }
    ]
};