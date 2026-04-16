import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { VehicleModel } from 'src/domain/models/vehicle.model';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';
import { CreateVehicleDto } from './dto/vehicle.dto';
import { VehicleCreateUseCase } from 'src/use-cases/vehicle/vehicle-create.use-case';

@Controller('vehicles')
export class VehicleController {
  constructor(
    @Inject(VehicleCreateUseCase)
    private readonly _vehicleCreateUseCase: VehicleCreateUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateVehicleDto): Promise<VehicleModel> {
    return this._vehicleCreateUseCase.execute(dto);
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
