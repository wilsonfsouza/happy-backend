import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('facilities')
export default class Facility {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  open_hours: string;

  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.facility, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'facility_id' })
  images: Image[];
}
