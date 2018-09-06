import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { FightComponent } from './components/fight/fight.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { StartComponent } from './components/start/start.component';
import { StoryComponent } from './components/story/story.component';

@NgModule({
  declarations: [
    AppComponent,
    FightComponent,
    CharacterCreationComponent,
    InventoryComponent,
    StartComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
