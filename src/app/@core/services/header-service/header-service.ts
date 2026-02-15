import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly _isHeaderVisible = signal(true)

  public readonly isHeaderVisible = this._isHeaderVisible.asReadonly();

  public hideHeader(): void {
    this._isHeaderVisible.set(false);
  }
  public showHeader(): void {
    this._isHeaderVisible.set(true);
  }
}
