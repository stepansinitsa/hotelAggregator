import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { EventGateway } from './event.gateway';
import { AccountModule } from './modules/account/account.module';
import { UsersModule } from './modules/users/users.module';
import { LodgingsModule } from './modules/lodgings/lodgings.module';
import { AccommodationsModule } from './modules/accommodations/accommodations.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AssistanceModule } from './modules/assistance/assistance.module';
import { EventBusModule } from './modules/event-bus/event-bus.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      maxListeners: 100,
    }),
    AccountModule,
    UsersModule,
    LodgingsModule,
    AccommodationsModule,
    BookingsModule,
    AssistanceModule,
    EventBusModule,
  ],
  controllers: [],
  providers: [EventGateway],
})
export class ApplicationModule {}