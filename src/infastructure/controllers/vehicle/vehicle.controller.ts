import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { VehicleModel } from 'src/domain/models/vehicle.model';
import { CreateVehicleDto } from './dto/vehicle.dto';
import { VehicleCreateUseCase } from 'src/use-cases/vehicle/vehicle-create.use-case';
import { GetAllVehicleUseCase } from 'src/use-cases/vehicle/get-all-vehicle.use-case';
import { GetByIdVehicleUseCase } from 'src/use-cases/vehicle/get-by-id-vehicle.use-case';

@Controller('vehicles')
export class VehicleController {
  constructor(
    @Inject(VehicleCreateUseCase)
    private readonly _vehicleCreateUseCase: VehicleCreateUseCase,

    @Inject(GetAllVehicleUseCase)
    private readonly _getAllVehicleUseCase: GetAllVehicleUseCase,

    @Inject(GetByIdVehicleUseCase)
    private readonly _getByIdVehicleUseCase: GetByIdVehicleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateVehicleDto): Promise<VehicleModel> {
    return this._vehicleCreateUseCase.execute(dto);
  }

  @Get('all')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: VehicleModel[];
    total: number;
    page: number;
    limit: number;
  }> {
    const result = await this._getAllVehicleUseCase.execute(page, limit);

    return {
      data: result.data,
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<VehicleModel> {
    const vehicle = await this._getByIdVehicleUseCase.execute(id);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }

    return vehicle;
  }
}
