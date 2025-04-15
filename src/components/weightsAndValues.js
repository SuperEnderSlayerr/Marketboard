export const questWeightsAndValues = {
	"How many sessions were in this quest?": {
		weight: 1,
		optionsWithValues: {
			"NUMBER INPUT": "",
		}
	},
	"How difficult was the combat?": {
		weight: 1,
		optionsWithValues: {
			"Select a Challenge Level": "",
			"No Combat": 0,
			"Trivial Combats": 1,
			"Simple Combats": 2,
			"Normal combats": 3,
			"Challenging Combats": 4,
			"Deadly Combats": 5,
		}
	},
	"How complex was the roleplay?": {
		weight: 1,
		optionsWithValues: {
			"Select a Roleplay Value": "",
			"Roleplay only existed to get from point A to point B": 0,
			"Roleplay was there, but there were no meaningful choices on the quest.": 1,
			"Roleplay was simple with one or two important moments that decided an outcome.": 2,
			"Roleplay was standard. There were a few important roleplay moments that decided outcomes on the quest": 3,
			"Roleplay had challenging nuance that decided big ramifications on the quest's direction.": 4,
			"The roleplay was a web of nuance and complexity that required unraveling to succeed in the quest.": 5,
		}
	},
	"How difficult was the quest outside of combat?": {
		weight: 1,
		optionsWithValues: {
			"Select a Difficulty": "",
			"Non-factor": 0,
			"Trivial difficulty": 1,
			"Easy difficulty": 2,
			"Standard difficulty": 3,
			"Hard difficulty": 4,
			"Deadly difficulty": 5,
		}
	},
};

export const playerWeightsAndValues = {
	"Name:": {
		weight: 1,
		optionsWithValues: {
			"TEXT INPUT": "",
		}
	},
	"How effective / efficient was the player in the combat?": {
		weight: 1,
		optionsWithValues: {
			"Select Combat Impact": "",
			"No combat": 0,
			"The player could have not been in the combat and had the same effect.": -0.2,
			"The player had some effect on the combat, but contributed only a little.": -0.1,
			"The player's effect on the combat was a normal contribution. They didn't stand out in any discernable way.": 0,
			"The player had a strong effect on combat. Things went more smoothly because they were in it.": 0.1,
			"The player was essential to the combat. It would have turned out very differently if they were not in it.": 0.2,
		}
	},
	"How effective / efficient was the player outside of combat?": {
		weight: 1,
		optionsWithValues: {
			"Select Impact Amount": "",
			"N/A": 0,
			"The player could have not been on the quest and had the same effect.": -0.2,
			"The player had some effect on the quest, but contributed only a little": -0.1,
			"The player's effect on the quest was a normal contribution. They didn't stand out in any discernable way.": 0,
			"The player had a strong effect on the quest. Things went more smoothly because they participated.": 0.1,
			"The player was essential to the quest. It would have turned out very differently if they had not participated.": 0.2,
		}
	},
	"How engaged / interesting was their roleplay?": {
		weight: 1,
		optionsWithValues: {
			"Select Engaged Level": "",
			"N/A": 0,
			"The player participated the bare minimum amount and/or had to leave for a large amount of the quest.": -0.2,
			"The player participated minimally and/or had to leave for a notable amount of the quest.": -0.1,
			"The player participated a normal amount and/or had to step away from time to time.": 0,
			"The player helped the quest progress and/or only had to leave a few times.": 0.1,
			"The player pushed the quest forward and/or only had to leave a couple of times.": 0.2,
		}
	},
	"How much additional favor does this player deserve?": {
		weight: 1,
		optionsWithValues: {
			"NUMBER INPUT": "",
		}
	},
};
