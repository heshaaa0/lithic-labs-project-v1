import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { VehicleModel } from 'src/domain/models/vehicle.model';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';
import { CreateVehicleDto } from './dto/vehicle.dto';

@Controller('vehicles')
export class VehicleController {
  constructor() {}

  @Post()
  create(@Body() dto: CreateVehicleDto): Promise<VehicleModel> {
    console.log(dto);

    return undefined as unknown as Promise<VehicleModel>;
  }

  @Get()
  findAll(): Promise<VehicleModel[]> {
    console.log('findAll');
    throw new Error('Not implemented');
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<VehicleModel> {
    console.log('findById', id);
    throw new Error('Not implemented');
  }
}
