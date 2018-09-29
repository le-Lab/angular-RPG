import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Armor, checkRace, ExperienceToLevel, Hero, Monster, Priest, Ranger, Rogue, Warrior, Weapon} from '../models/characters';
import {Chapter, SuccessOptions} from '../models/chapter';
import {Chapter1} from '../chapters/Chapter1';
import {ClassOptions, GenderOptions, RaceOptions} from '../models/character-options';

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  constructor(private router: Router) {
  }

  mainCharacter: Hero;
  currentChapter: Chapter = Chapter1;
  isFighting = false;

  actionDelay = 1500;
  heroParty: Hero[] = [];
  partyInventory: (Weapon | Armor) [] = [];
  availableHeroes: Hero[] = [];
  enemyParty: Monster[] = this.currentChapter.enemyPart;

  setMainCharacter(character) {
    switch (character.class) {
      case ClassOptions.warrior:
        this.mainCharacter = new Warrior(character.name, character.gender, character.race, 1, 10, {
          attack: 0,
          sneak: 0,
          persuade: 0,
          intelligence: 0
        }, new Weapon('Couteau', 1, 3), new Armor('Habits', 0));
        break;
      case ClassOptions.ranger:
        this.mainCharacter = new Ranger(character.name, character.gender, character.race, 1, 10, {
          attack: 0,
          sneak: 0,
          persuade: 0,
          intelligence: 0
        }, new Weapon('Couteau', 1, 3), new Armor('Habits', 0));
        break;
      case ClassOptions.rogue:
        this.mainCharacter = new Rogue(character.name, character.gender, character.race, 1, 10, {
          attack: 0,
          sneak: 0,
          persuade: 0,
          intelligence: 0
        }, new Weapon('Couteau', 1, 3), new Armor('Habits', 0));
        break;
      case ClassOptions.priest:
        this.mainCharacter = new Priest(character.name, character.gender, character.race, 1, 10, {
          attack: 0,
          sneak: 0,
          persuade: 0,
          intelligence: 0
        }, new Weapon('Couteau', 1, 3), new Armor('Habits', 0));
    }
    checkRace(this.mainCharacter);
    this.heroParty.push(this.mainCharacter);
    this.router.navigateByUrl('/story');
  }

  encounterSuccess(): string[] {
    const messages: string[] = [];
    this.currentChapter.ifSucceed.forEach(reward => {
      switch (reward) {
        case SuccessOptions.rewardExperience:
          messages.push(`Tous les membres de votre equipe ont reçu ${this.currentChapter.rewards.experience} experience.`);
          this.heroParty.forEach(hero => {
            hero.experience += this.currentChapter.rewards.experience;
            if (hero.experience >= ExperienceToLevel[hero.level]) {
              messages.push(`${hero.name} monte d'un niveau ! Ses stats ont augmentés et sont visibles dans l'inventaire.`);
              hero.levelUp();
            }
          });
          break;
        case SuccessOptions.rewardEquipement:
          messages.push('Vous avez reçu de nouvelles pièces d\'équipement:');
          this.currentChapter.rewards.equipment.forEach(equipment => {
            if (equipment instanceof Armor) {
              messages.push(`${equipment.name} -- Attack Barrier Bonus: ${equipment.attackBarrierBonus}`);
            } else {
              messages.push(`${equipment.name} -- min Damage: ${equipment.minDamage}, max Damage: ${equipment.maxDamage}`);
            }
            this.partyInventory.push(equipment);
          });
          break;
        case SuccessOptions.addHeroToParty:
          const newHero: Hero = this.currentChapter.rewards.newHero;
          if (this.heroParty.length < 3) {
            messages.push(`Un nouveau hero rejoint votre equipe! ${newHero.name} - ${newHero.characterRole} - niveau: ${newHero.level}`);
            this.heroParty.push(newHero);
          } else {
            messages.push(`un nouveau hero est disponible pour votre equipe! ${newHero.name} - ${newHero.characterRole} - niveau: ${newHero.level}`);
            this.availableHeroes.push(newHero);
          }
          break;
      }
    });
    return messages;
  }

  nextChapter(): void {
    this.heroParty.forEach(hero => hero.rest());
    this.currentChapter = this.currentChapter.nextChapter;
    this.enemyParty = this.currentChapter.enemyPart;
  }

  gameOver(): void {
    this.mainCharacter = undefined;
    this.currentChapter = Chapter1;
    this.heroParty = [];
    this.partyInventory = [];
    this.availableHeroes = [];
    this.enemyParty = this.currentChapter.enemyPart;

    this.router.navigateByUrl('/');

  }
}

