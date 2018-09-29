import {Component, OnInit} from '@angular/core';
import {GameControllerService} from '../../services/game-controller.service';
import {Router} from '@angular/router';
import {Hero, Monster} from '../../models/characters';
import {CharacterAction} from '../../models/chapter';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor(private gameControllerService: GameControllerService,
              private router: Router) {
  }

  currentChapter = this.gameControllerService.currentChapter;
  heroParty: Hero[] = this.gameControllerService.heroParty;
  enemyParty: Monster[] = this.gameControllerService.enemyParty;
  actionDelay: number = this.gameControllerService.actionDelay;
  displayMessage = '';
  successMessages: string[] = [];
  showNextChapterButton = false;

  ngOnInit() {
  }

  chooseAction(action: string): void {
    if (this.successMessages.length) {
      return;
    }
    this.displayMessage = `Vous decidez : ${action}`;
    setTimeout(() => {
      switch (action) {
        case CharacterAction.attack:
          this.tryAttack();
          break;
        case CharacterAction.sneak:
          this.trySneak();
          break;
        case CharacterAction.persuade:
          this.tryPersuade();
          break;
        case CharacterAction.doNothing:
          this.doNothing();
          break;
        default:
          console.log('Vous devez choisir une action');
      }
    }, this.actionDelay);
  }

  tryAttack(): void {
    this.gameControllerService.isFighting = true;
    this.router.navigateByUrl('/fight');
  }

  trySneak(): void {
    let sneakBarrier = 0;
    let sneakPower = 0;
    this.enemyParty.forEach(enemy => {
      sneakBarrier += enemy.barriers.sneak;
    });
    this.heroParty.forEach(hero => {
      sneakPower += hero.sneak();
    });
    if (sneakPower >= sneakBarrier) {
      this.displayMessage = 'Votre tentative d\'infiltration à été un succes';
      setTimeout(() => {
        this.onSuccess();
      }, this.actionDelay);
    } else {
      this.displayMessage = ' Votre tentative d\'infiltration à raté';
      setTimeout(() => {
        this.onSneakPersuadeFailure();
      }, this.actionDelay);
    }
  }

  tryPersuade(): void {
    let persuasionBarrier = 0;
    let persuasionPower = 0;
    this.enemyParty.forEach(enemy => {
      persuasionBarrier += enemy.barriers.persuade;
    });
    this.heroParty.forEach(hero => {
      persuasionPower += hero.persuade();
    });
    if (persuasionPower >= persuasionBarrier) {
      this.displayMessage = 'Votre tentative de persuasion à été un succes';
      setTimeout(() => {
        this.onSuccess();
      }, this.actionDelay);
    } else {
      this.displayMessage = 'Votre tentative de persuation à echouée';
      setTimeout(() => {
        this.onSneakPersuadeFailure();
      }, this.actionDelay);
    }
  }

  doNothing(): void {
    this.displayMessage = 'Vous decidez de ne rien faire';
    setTimeout(() => {
      this.nextChapter();
    }, this.actionDelay);
  }

  onSuccess(): void {
    this.successMessages = this.gameControllerService.encounterSuccess();
    this.showNextChapterButton = true;
  }

  onSneakPersuadeFailure(): void {
    switch (this.currentChapter.sneakPersuadeFail) {
      case CharacterAction.attack:
      default :
        this.displayMessage = 'Un enemi vous attaque';
        setTimeout(() => {
          this.tryAttack();
        }, this.actionDelay);
        break;
      case CharacterAction.doNothing:
        this.displayMessage = '';
        setTimeout(() => {
          this.nextChapter();
        }, this.actionDelay);
    }
  }

  nextChapter(): void {
    this.gameControllerService.nextChapter();
    this.currentChapter = this.gameControllerService.currentChapter;
    this.heroParty = this.gameControllerService.heroParty;
    this.enemyParty = this.gameControllerService.enemyParty;
    this.displayMessage = '';
    this.successMessages = [];
    this.showNextChapterButton = false;
  }
}
