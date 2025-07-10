import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TokenAuthGuard } from 'src/guard/token-auth.guard';
import { ID } from '../../infrastructure/types.global';
import { BookingRequest } from './dto/booking-request.dto';
import { BookingsService } from './bookings.service';
import { Booking } from './schema/booking.schema';

@UseGuards(TokenAuthGuard)
@Controller('api/bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  createBooking(@Body() bookingData: BookingRequest): Promise<Booking> {
    return this.bookingsService.create(bookingData);
  }

  @Delete(':id')
  removeBooking(
    @Param('id') bookingId: ID,
    @Body() data: { userId: ID },
  ): Promise<Booking> {
    return this.bookingsService.delete(bookingId, data.userId);
  }

  @Get()
  searchBookings(
    @Query() filters: Partial<BookingRequest>,
  ): Promise<Booking[]> {
    return this.bookingsService.find(filters);
  }
}