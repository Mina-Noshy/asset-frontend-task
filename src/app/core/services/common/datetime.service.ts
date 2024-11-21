// datetime.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DateTimeService {
    private currentDateSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

    constructor() {
        // Update current date and time every second
        setInterval(() => {
            this.currentDateSubject.next(new Date());
        }, 1000);
    }

    getCurrentDate(): BehaviorSubject<Date> {
        return this.currentDateSubject;
    }

    formatDate(date: Date): string {
        return date.toLocaleString(); // Example formatting
    }

}
