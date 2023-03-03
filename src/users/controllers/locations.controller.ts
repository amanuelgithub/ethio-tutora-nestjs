import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Location } from '../entities/locations.entity';
import { LocationsService } from '../services/locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createLocation(
    @Req() req: any,
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationsService.createLocation(req.user, createLocationDto);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  findLocationByUserId(
    @Param('userId') userId: string,
    @Req() req: any,
  ): Promise<Location> {
    return this.locationsService.findLocationByUserId(req.user, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateLocation(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationsService.updateLocation(
      id,
      req.user,
      updateLocationDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteLocation(@Req() req: any, @Param('id') id: string): Promise<void> {
    return this.locationsService.deleteLocation(req.user, id);
  }
}
