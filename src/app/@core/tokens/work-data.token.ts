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
        imageUrl: "work-preview/pokeng-preview.jpg",
        imageTitle: "PokeNg website showcase",
        imageAlt: "Montre une application avec une liste de pokémon détailé et des filtres complexes",
        workTitle: "PokeNg",
        workAlt: "Angular / PrimeNg",
        description: "Développée dans le cadre d’un projet personnel afin de consolider mes compétences en développement front-end avec Angular. Elle permet de consulter, filtrer et comparer des Pokémon via une interface dynamique, intégrant des filtres complexes et des comparaisons de statistiques à l’aide de graphiques radar. Ce projet m’a permis de renforcer ma maîtrise d’Angular, de l’architecture applicative et de la visualisation de données, tout en livrant une application internationalisé, maintenable et orientée expérience utilisateur."
      },
      {
        color: "red",
        imageUrl: "work-preview/etsi-preview.jpg",
        imageTitle: "EtSi website showcase",
        imageAlt: "Une grille de composants informatique complexes avec leur description",
        workTitle: "EtSi",
        workAlt: "Angular / Bootstrap",
        description: "Une application web pédagogique développée avec Angular et Bootstrap, destinée à expliquer le fonctionnement d’un ordinateur et de ses composants à un public d’écoliers et de collégiens. Le projet visait à rendre des notions techniques accessibles grâce à une interface claire et interactive. Il m’a permis de renforcer mes compétences en intégration front-end, en vulgarisation technique et en conception d’expériences adaptées à un jeune public.",
        reverseOnMobile: true
      },
      {
        color: "green",
        imageUrl: "work-preview/portefolio-preview.jpg",
        imageTitle: "previous portefolio showcase",
        imageAlt: "L'acceuil du portefolio web précédent",
        workTitle: "Portefolio",
        workAlt: "VueJs",
        description: "Mon ancien portfolio est une application web développée avec Vue.js, conçue pour présenter mes premiers projets et compétences en développement front-end. Il avait pour objectif de proposer une vitrine claire et responsive de mon profil, tout en me permettant de me familiariser avec l’architecture Vue et la gestion de SPA scrollable. Ce projet m’a servi de base pour structurer mon identité professionnelle et poser les fondations de mon portfolio actuel."
      }
    ];

    return works.length > 0 ? works : [defaultWork];
  }
});
