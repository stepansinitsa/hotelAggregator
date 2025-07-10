import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageUploadInterceptor } from 'src/interceptors/image-upload.interceptor';
import { AllowedRoles } from '../../decorators/allowed-roles.decorator';
import { TokenAuthGuard } from '../../guard/token-auth.guard';
import { RoleBasedGuard } from '../../guard/role-based.guard';
import { ID } from '../../infrastructure/types.global';
import { AccommodationCreateDto } from './dto/accommodation-create.dto';
import { SearchAccommodationParamsDto } from './dto/search-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { AccommodationsService } from './accommodations.service';
import { Accommodation } from './schema/accommodation.schema';

@Controller('api/accommodations')
export class AccommodationsController {
  constructor(private accommodationsService: AccommodationsService) {}

  @Post()
  @UseGuards(TokenAuthGuard, RoleBasedGuard)
  @AllowedRoles('admin')
  @UseInterceptors(ImageUploadInterceptor())
  createAccommodation(
    @Body() data: AccommodationCreateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Accommodation> {
    if (files?.length) {
      data.images = files.map((file) => file.filename);
    }

    return this.accommodationsService.add(data);
  }

  @Put(':id')
  @UseGuards(TokenAuthGuard, RoleBasedGuard)
  @AllowedRoles('admin')
  @UseInterceptors(ImageUploadInterceptor())
  updateAccommodation(
    @Param('id') accommodationId: ID,
    @Body() updates: UpdateAccommodationDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Accommodation> {
    if (files?.length) {
      updates.images = files.map((file) => file.filename);
    }

    return this.accommodationsService.modify(accommodationId, updates);
  }

  @Get()
  searchAccommodations(
    @Query() filters: SearchAccommodationParamsDto,
  ): Promise<Accommodation[]> {
    return this.accommodationsService.find(filters);
  }
}