import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { VehicleModel } from 'src/domain/models/vehicle.model';
import {
  DeleteVehicleResponseDto,
  PaginatedVehiclesResponseDto,
  VehicleResponseDto,
} from './dto/vehicle-response.dto';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { VehicleCreateUseCase } from 'src/use-cases/vehicle/vehicle-create.use-case';
import { GetAllVehicleUseCase } from 'src/use-cases/vehicle/get-all-vehicle.use-case';
import { GetByIdVehicleUseCase } from 'src/use-cases/vehicle/get-by-id-vehicle.use-case';
import { UpdateVehicleUseCase } from 'src/use-cases/vehicle/update-vehicle.use-case';
import { DeleteVehicleUseCase } from 'src/use-cases/vehicle/delete-vehicle.use-case';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(
    @Inject(VehicleCreateUseCase)
    private readonly _vehicleCreateUseCase: VehicleCreateUseCase,

    @Inject(GetAllVehicleUseCase)
    private readonly _getAllVehicleUseCase: GetAllVehicleUseCase,

    @Inject(GetByIdVehicleUseCase)
    private readonly _getByIdVehicleUseCase: GetByIdVehicleUseCase,

    @Inject(UpdateVehicleUseCase)
    private readonly _updateVehicleUseCase: UpdateVehicleUseCase,

    @Inject(DeleteVehicleUseCase)
    private readonly _deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a vehicle' })
  @ApiCreatedResponse({ type: VehicleResponseDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() dto: CreateVehicleDto): Promise<VehicleModel> {
    return this._vehicleCreateUseCase.execute(dto);
  }

  @Get('all')
  @ApiOperation({ summary: 'List vehicles (paginated)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({ type: PaginatedVehiclesResponseDto })
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
  @ApiOperation({ summary: 'Get vehicle by id' })
  @ApiOkResponse({ type: VehicleResponseDto })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<VehicleModel> {
    const vehicle = await this._getByIdVehicleUseCase.execute(id);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }

    return vehicle;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update vehicle' })
  @ApiOkResponse({ type: VehicleResponseDto })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVehicleDto,
  ): Promise<VehicleModel> {
    const updatedVehicle = await this._updateVehicleUseCase.execute(id, dto);

    if (!updatedVehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }

    return updatedVehicle;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete vehicle by id' })
  @ApiOkResponse({ type: DeleteVehicleResponseDto })
  @ApiBadRequestResponse({ description: 'Vehicle could not be deleted' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const deleted = await this._deleteVehicleUseCase.execute(id);

    if (!deleted) {
      throw new BadRequestException(
        `Vehicle with id ${id} could not be deleted`,
      );
    }

    return { message: 'Vehicle deleted successfully' };
  }
}
