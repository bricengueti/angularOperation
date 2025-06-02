import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostLoadingService {

   private _postLoading = new BehaviorSubject<boolean>(false);
  readonly postLoading$ = this._postLoading.asObservable();

  show() {
    this._postLoading.next(true);
  }

  hide() {
    this._postLoading.next(false);
  }
}
