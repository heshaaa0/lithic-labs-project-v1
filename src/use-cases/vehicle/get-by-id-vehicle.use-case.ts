import { Inject, Injectable } from '@nestjs/common';
import { VehicleModel } from 'src/domain/models/vehicle.model';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';

@Injectable()
export class GetByIdVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly _vehicleRepository: VehicleRepository,
  ) {}

  async execute(id: number): Promise<VehicleModel | null> {
    return this._vehicleRepository.findById(id);
  }
}
