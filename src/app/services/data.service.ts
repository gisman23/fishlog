import { Injectable, signal, effect } from '@angular/core';
import { FishingEventsByFilterGQL } from '../../generated/graphql';
import { FishingEventsGQL } from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class DataSignalService {

  selectedFishermen = signal(null);
  selectedSpecies = signal(null);
  selectedBodyOfWater= signal(null);

  catches = signal([]);
  selectedCatches = signal([])
  selectedDate = signal("")
  startDate = signal(null)
  endDate = signal(null)

   constructor( 
     private fishEventsService: FishingEventsGQL,
     private fishEventFilterService: FishingEventsByFilterGQL
   ) 
  {
    effect(() => {
        this.fishEventFilterService
          .watch({
            fisherman: this.selectedFishermen(),
            species: this.selectedSpecies(),
            water: this.selectedBodyOfWater(),
            startDate: this.startDate(),
            endDate: this.endDate(),
          })
          .valueChanges.subscribe(({ data, loading }) => {
            this.catches.set(data.Catches);
          });
      } )  
     effect(() => {
        this.fishEventsService
          .watch().valueChanges.subscribe(({ data, loading }) => {
            this.catches.set(data.Catches);
          }); 
     } ) 
  } 
}
