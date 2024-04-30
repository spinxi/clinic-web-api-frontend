import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  // Set a value in local storage
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)){
      localStorage.setItem(key, value);
    }
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)){
      return localStorage.getItem(key);
    }
    return null;
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem(key);
    }
  }

  // Clear all items from local storage
  clear(): void {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
    }
  }
}