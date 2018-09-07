import {Hero, Monster, Weapon, Armor} from './characters';

export enum CharacterAction {
  attack = 'Attack',
  sneak = 'Sneak',
  persuade = 'Persuade',
  doNothing = 'Do Nothing'
}

export enum FailureOptions {
  gameOver,
  nextChapter
}

export enum SuccesOptions {
  rewardExperience,
  rewardEquipement,
  addHeroToParty
}

export class Chapter {
  story: string[];
  options: CharacterAction[];
  enemyPart: Monster[];
  sneakPersuadeFail: CharacterAction;
  itFail: FailureOptions;
  ifSucceed: SuccesOptions[];
  rewards: {
    experience: number,
    equipment: (Weapon | Armor)[];
    newHero: Hero
  };
  nextChapter: Chapter;
}
