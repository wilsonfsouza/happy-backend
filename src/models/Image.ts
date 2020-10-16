import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Facility from './Facility';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Facility, facility => facility.images)
  @JoinColumn({ name: 'facility_id' })
  facility: Facility
}
