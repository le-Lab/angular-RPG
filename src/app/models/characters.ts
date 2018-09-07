import {RaceOptions, ClassOptions, GenderOptions} from './character-options';

export class Armor {
  constructor(name: string, attackBarrierBonus: number) {
    this.name = name;
    this.attackBarrierBonus = attackBarrierBonus;
  }

  name: string;
  attackBarrierBonus: number;
}

export class Weapon {
  constructor(name: string, minDamage: number, maxDamage: number) {
    this.name = name;
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
  }

  name: string;
  minDamage: number;
  maxDamage: number;
}

export enum CharactersSkills {
  attack = 'attack',
  sneak = 'sneak',
  persuade = 'persuade',
  intellgence = 'intelligence'
}

export enum FightOptions {
  attack = 'Attack',
  specialAttack = 'Special Attack',
  none = 'None'
}

export const ExperienceToLevel = {
  1: 1000,
  2: 2000,
  3: 3000,
  4: 4000,
  5: 5000,
  6: 6000,
  7: 7000,
  8: 8000,
  9: 9000
};

export class BaseCharacter {
  name: string;
  maxHealth: number;
  currentHealth: number;
  isIncapacited: boolean;
  barriers: {
    attack: number
    sneak: number
    persuade: number
  };
  skills: {
    attack: number
    sneak: number
    persuade: number
    intelligence: number
  };
  equippedWeapon: Weapon;
  equippedArmor: Armor;

  constructor(name: string, health: number, skills = {attack: 0, sneak: 0, persuade: 0, intelligence: 0}) {
    this.name = name;
    this.maxHealth = health;
    this.skills = skills;
    this.isIncapacited = false;
    this.barriers = {
      attack: 10,
      sneak: 10,
      persuade: 10
    };
  }

  attack() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.attack;
  }

  sneak() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.sneak;

  }

  persuade() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.persuade;

  }

  dealDamage() {
    return Math.floor(Math.random() * (this.equippedWeapon.maxDamage - this.equippedWeapon.minDamage + 1)) + this.equippedWeapon.minDamage;

  }

}

export class Monster extends BaseCharacter {
  isTrapped: false;
  poisonStacks = 0;
  isStrongPoison: false;
  hasTakenPoisonDamageThisTurn: false;

  constructor(name: string, health: number, skills, barriers = {
    attack: number,
    sneak: number,
    persuade: number
  }, minDamage, maxDamage, spriteUrl) {
    super(name, health, skills);
    this.barriers = barriers;
    this.equippedWeapon = new Weapon(undefined, minDamage, maxDamage);
    this.spriteUrl = spriteUrl;
  }
}
