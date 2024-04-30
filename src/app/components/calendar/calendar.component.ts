import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common'; 

interface CalendarDay {
  date: Date;
  working: boolean;
}

interface Booking {

  date: Date;
  time: string;
  
}
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [DatePipe],
})
export class CalendarComponent implements OnInit {
  days: CalendarDay[] = [];
  times: string[] = [];
  bookingsData: any
  bookings: Booking[][] = [];
  currentDate: Date;
  doctorId: number | null = null;

  constructor(
    private datePipe: DatePipe,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {
    this.currentDate = new Date();
    this.generateCalendar();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const doctorIdParam = params.get('doctorId');
      if (doctorIdParam) {
        this.doctorId = parseInt(doctorIdParam, 10);
        this.fetchBookingsByDoctor(this.doctorId);
      } else {
        console.error('Doctor ID not found in URL');
      }
    });
  }

  fetchBookingsByDoctor(doctorId: number): void {
    this.bookingService.getBookingsByDoctor(doctorId).subscribe(
      bookings => {
        this.bookingsData = bookings;
        console.log(this.bookingsData);
        // this.markBookingsOnCalendar();
      },
      error => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  generateCalendar(): void {
    const startDate = new Date(this.currentDate);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from the beginning of the current week
    this.days = Array.from({ length: 7 }, (_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);
      const formattedDate = this.datePipe.transform(currentDate, 'fullDate', 'ka'); // Format date in Georgian
      return { date: currentDate, dateString: formattedDate, working: index % 2 === 0 }; // Alternate days are working
    });

    const startTime = 10; // 10:00 AM
    const endTime = 18; // 6:00 PM
    this.times = Array.from({ length: endTime - startTime }, (_, index) => {
      const hour = startTime + index;
      return `${hour}:00 - ${hour + 1}:00`;
    });

    this.bookings = Array.from({ length: this.days.length }, () => Array(this.times.length).fill(null));
  }

  bookSlot(dayIndex: number, timeIndex: number): void {
    const selectedDay = this.days[dayIndex];
    const selectedTime = this.times[timeIndex];

    if (selectedDay.working && !this.bookings[dayIndex][timeIndex]) {
      const booking: Booking = { date: selectedDay.date, time: selectedTime };
      this.bookings[dayIndex][timeIndex] = booking;
      console.log('Booked:', booking);
    } else {
      console.log('Cannot book on this day or time');
    }
  }

  previousWeek(): void {
    const prevWeekStartDate = new Date(this.currentDate);
    prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
    if (prevWeekStartDate >= new Date()) {
      this.currentDate = prevWeekStartDate;
      this.generateCalendar();
    }
  }

  nextWeek(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateCalendar();
  }

  disablePrevious(): boolean {
    return this.days[0]?.date <= new Date();
  }
}