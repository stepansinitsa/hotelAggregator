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
import { TokenAuthGuard } from 'src/guard/token-auth.guard';
import { ImageUploadInterceptor } from 'src/interceptors/image-upload.interceptor';
import { AllowedRoles } from '../../decorators/allowed-roles.decorator';
import { RoleBasedGuard } from '../../guard/role-based.guard';
import { ID } from '../../infrastructure/types.global';
import { LodgingCreateDto } from './dto/lodging-create.dto';
import { SearchLodgingParamsDto } from './dto/search-lodging.dto';
import { UpdateLodgingDto } from './dto/update-lodging.dto';
import { LodgingsService } from './lodgings.service';
import { Lodging } from './schema/lodging.schema';

@Controller('api/lodgings')
export class LodgingsController {
  constructor(private lodgingsService: LodgingsService) {}

  @Post()
  @UseGuards(TokenAuthGuard, RoleBasedGuard)
  @AllowedRoles('admin')
  @UseInterceptors(ImageUploadInterceptor())
  createLodging(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: LodgingCreateDto,
  ): Promise<Lodging> {
    if (files?.length) {
      data.images = files.map((file) => file.filename);
    }

    return this.lodgingsService.add(data);
  }

  @Put(':id')
  @UseGuards(TokenAuthGuard, RoleBasedGuard)
  @AllowedRoles('admin')
  @UseInterceptors(ImageUploadInterceptor())
  updateLodging(
    @Param('id') lodgingId: ID,
    @Body() updates: UpdateLodgingDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Lodging> {
    if (files?.length) {
      updates.images = files.map((file) => file.filename);
    }

    return this.lodgingsService.modify(lodgingId, updates);
  }

  @Get()
  searchLodgings(@Query() filters: SearchLodgingParamsDto): Promise<Lodging[]> {
    return this.lodgingsService.find(filters);
  }

  @Get('/find/:id')
  findById(@Param('id') lodgingId: ID): Promise<Lodging> {
    return this.lodgingsService.fetchById(lodgingId);
  }
}