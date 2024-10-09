import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }
  formatDate(dateString: string | null): string | null {
    if (!dateString) return null; 
    const parsedDate = new Date(dateString);
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
