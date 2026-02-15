import { inject, Injectable, signal } from '@angular/core';
import { HeaderService } from '../header-service/header-service';
import { WorkData } from '@core/models';
import { WORK_DATA_TOKEN } from '@core/tokens/work-data.token';

@Injectable({ providedIn: 'root' })
export class WorkService {
  private readonly headerService = inject(HeaderService);
  public readonly workDataList: WorkData[] = inject(WORK_DATA_TOKEN);
  
  private readonly _isWorkFullscreen = signal(false);
  public readonly isWorkFullscreen = this._isWorkFullscreen.asReadonly();

  private readonly _activeWork = signal(this.workDataList[0]);
  public readonly activeWork = this._activeWork.asReadonly();

  public openFullscreen(work: WorkData) {
    this._activeWork.set(work)
    this._isWorkFullscreen.set(true);
    this.headerService.hideHeader();
  }

  public closeFullscreen() {
    this._isWorkFullscreen.set(false);
    this.headerService.showHeader();
    this._activeWork.set(this.workDataList[0])
  }
}
