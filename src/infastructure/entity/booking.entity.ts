import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VehicleEntity } from './vehicle.entity';
import { PricingMode } from 'src/domain/enums/booking.enum';

@Entity('bookings')
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  vehicleId: number;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.bookings, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: VehicleEntity;

  @Column({ type: 'timestamp' })
  pickupDateTime: Date;

  @Column({ type: 'timestamp' })
  returnDateTime: Date;

  @Column({
    type: 'enum',
    enum: PricingMode,
  })
  pricingMode: PricingMode;

  @Column({ type: 'int' })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;
}
