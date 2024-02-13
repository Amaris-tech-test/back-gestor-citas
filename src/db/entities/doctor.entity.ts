import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Specialties } from "./specialty.entity";
import { Appointments } from "./appointment.entity";

@Entity({ name: 'doctors'})
export class Doctors {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text')
  name: string;
  
  @Column('text')
  lastname: string;

  // TODO: Relacion especialidad
  @ManyToOne(() => Specialties, specialties => specialties.doctors)
  specialty?: Specialties;

  @OneToMany(()=> Appointments, appointments => appointments.doctor)
  appointments: Appointments[];

}
