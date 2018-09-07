import {Chapter, CharacterAction, SuccessOptions, FailureOptions} from '../models/chapter';
import {Armor, Monster, Warrior, Weapon} from '../models/characters';
import {GenderOptions, RaceOptions, ClassOptions} from '../models/character-options';


export const Chapter1: Chapter = {
  story: [
    `blablabla`
  ],
  options: [
    CharacterAction.attack,
    CharacterAction.sneak,
    CharacterAction.persuade
  ],
  enemyPart: [
    new Monster('Goblin', 5, {attack: 2, sneak: 0, persuade: 0}, {attack: 10, sneak: 10, persuade: 10}, 1, 3, '../../assets/')
  ],
  sneakPersuadeFail: CharacterAction.attack,
  ifFail: FailureOptions.nextChapter,
  ifSucceed: [
    SuccessOptions.rewardExperience,
    SuccessOptions.rewardEquipement,
    SuccessOptions.addHeroToParty
  ],
  rewards: {
    experience: 500,
    equipment: [
      new Weapon('Lame Rouillé', 1, 6)
    ],
    newHero: new Warrior('Elvin', GenderOptions.male, RaceOptions.elf, 1, 10, {
      attack: 2, sneak: 1, persuade: 1, intellgence: 1
    }, new Weapon('Dague', 1, 4), new Armor('Habits', 0))
  },
  nextChapter: null
};
