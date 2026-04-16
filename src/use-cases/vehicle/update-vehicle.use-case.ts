import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VehicleModel } from 'src/domain/models/vehicle.model';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly _vehicleRepository: VehicleRepository,
  ) {}

  async execute(
    id: number,
    data: Partial<VehicleModel>,
  ): Promise<VehicleModel | null> {

    //check if vehicle exists
    const existingVehicle = await this._vehicleRepository.findById(id);
    if (!existingVehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`)
    }

    //update vehicle
    let updateRequired = false;

    if (data.title && data.title !== existingVehicle.title) {
      updateRequired = true;
      existingVehicle.title = data.title;
    }

    if (data.hourlyRate && data.hourlyRate !== existingVehicle.hourlyRate) {
      updateRequired = true;
      existingVehicle.hourlyRate = data.hourlyRate;
    }

    if (data.dailyRate && data.dailyRate !== existingVehicle.dailyRate) {
      updateRequired = true;
      existingVehicle.dailyRate = data.dailyRate;
    }

  
    if (data.status && data.status !== existingVehicle.status) {
      updateRequired = true;
      existingVehicle.status = data.status;
    }
    
    if (!updateRequired) {
      return existingVehicle;
    }

    return this._vehicleRepository.update(existingVehicle);
  }
}
