import { inject, Injectable, signal } from '@angular/core';
import { HeaderService } from '../header-service/header-service';
import { WorkData } from '@core/models';
import { WORK_DATA_TOKEN } from '@core/tokens/work-data.token';

@Injectable({ providedIn: 'root' })
export class WorkService {
  private readonly headerService = inject(HeaderService);
  public readonly workDataList: WorkData[] = inject(WORK_DATA_TOKEN);
  
  private readonly _showFullscreen = signal(false);
  public readonly showFullscreen = this._showFullscreen.asReadonly();

  public openOverlay() {
    this._showFullscreen.set(true);
    this.headerService.hideHeader();
  }

  public closeOverlay() {
    this._showFullscreen.set(false);
    this.headerService.showHeader();
  }
}
