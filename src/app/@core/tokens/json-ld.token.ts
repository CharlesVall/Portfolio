import { InjectionToken } from '@angular/core';
import { PersonJsonLd } from '@core/models';

export const PERSON_JSON_LD = new InjectionToken<PersonJsonLd>('PERSON_JSON_LD');