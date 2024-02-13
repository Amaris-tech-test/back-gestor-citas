import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctors } from "./doctor.entity";
import { Users } from "./user.entity";
import { Specialties } from "./specialty.entity";


@Entity({ name: 'appointments'})
export class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({type: 'timestamp'})
  appointmentDate: Date;
  
  @Column('text', {
    default: 'agendada'
  })
  status: string;

  @ManyToOne(()=> Doctors, doctor=>  doctor.appointments)
  doctor?: Doctors; 
  
  @ManyToOne(()=> Users, user => user.appointments)
  user?: Users; 

  @ManyToOne(()=> Specialties, specialty => specialty.appointments)
  specialty?: Specialties; 
}
