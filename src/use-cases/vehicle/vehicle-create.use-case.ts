import { Inject, Injectable } from '@nestjs/common';
import { VehicleModel } from 'src/domain/models/vehicle.model';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';

@Injectable()
export class VehicleCreateUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly _vehicleRepository: VehicleRepository,
  ) {}

  async execute(data: Partial<VehicleModel>): Promise<VehicleModel> {
    return this._vehicleRepository.create(data);
  }
}
