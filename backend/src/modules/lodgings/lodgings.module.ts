import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LodgingsController } from './lodgings.controller';
import { LodgingsService } from './lodgings.service';
import { Lodging, LodgingSchema } from './schema/lodging.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lodging.name, schema: LodgingSchema },
    ]),
  ],
  controllers: [LodgingsController],
  providers: [LodgingsService],
  exports: [LodgingsService],
})
export class LodgingsModule {}