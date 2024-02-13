import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Doctors } from './doctor.entity';
import { Appointments } from './appointment.entity';

@Entity({ name: 'specialties' })
export class Specialties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  specialty: string;

  @OneToMany(() => Doctors, (doctor) => doctor.specialty)
  doctors: Doctors[];

  @OneToMany(()=> Appointments, appointment => appointment.specialty)
  appointments: Appointments[]
}
