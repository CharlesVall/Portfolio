import { InjectionToken } from '@angular/core';
import { WorkData } from '@core/models';

const defaultWork: WorkData = {
  color: "blue",
  imageUrl: "work-preview/resize/default-work.jpg",
  imageTitle: "Default work showcase",
  imageAlt: "Un projet par défaut",
  workTitle: "Default Work",
  workAlt: "Angular/Default",
  description: "Projet par défaut",
  reverseOnMobile: false
};

export const WORK_DATA_TOKEN = new InjectionToken<WorkData[]>('WORK_DATA_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const works: WorkData[] = [
      {
        color: "blue",
        imageUrl: "work-preview/resize/pokeng-showcase-resize.jpg",
        imageTitle: "PokeNg website showcase",
        imageAlt: "Montre une application avec une liste de pokémon détailé et des filtres complexes",
        workTitle: "PokeNg",
        workAlt: "Angular/PrimeNg",
        description: "un projet"
      },
      {
        color: "red",
        imageUrl: "work-preview/resize/EtSi-showcase-resize.jpg",
        imageTitle: "EtSi website showcase",
        imageAlt: "Une grille de composants informatique complexes avec leur description",
        workTitle: "EtSi",
        workAlt: "Angular/Bootstrap",
        description: "un projet",
        reverseOnMobile: true
      },
      {
        color: "green",
        imageUrl: "work-preview/resize/portefolio-showcase-resize.jpg",
        imageTitle: "previous portefolio showcase",
        imageAlt: "L'acceuil du portefolio web précédent",
        workTitle: "Portefolio",
        workAlt: "VueJs",
        description: "un projet"
      }
    ];

    return works.length > 0 ? works : [defaultWork];
  }
});
