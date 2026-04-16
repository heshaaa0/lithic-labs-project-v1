import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';

@Injectable()
export class DeleteVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly _vehicleRepository: VehicleRepository,
  ) {}

  async execute(id: number): Promise<boolean> {
    //check if vehicle exists
    const existingVehicle = await this._vehicleRepository.findById(id);
    if (!existingVehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }

    //delete vehicle
    const deleted = await this._vehicleRepository.deleteById(id);
    if (!deleted) {
      throw new BadRequestException(
        `Vehicle with id ${id} could not be deleted`,
      );
    }

    return deleted;
  }
}
