import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointments } from "./appointment.entity";

@Entity({ name: 'users'})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text')
  name: string;
  
  @Column('text')
  lastname: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  password: string; 

  @Column('bool', {
    default: true
  })
  isActive?: boolean;

  @Column('text', {
    default: 'user'
  })
  rol: string;

  @OneToMany(()=> Appointments, appointment => appointment.user)
  appointments: Appointments[]

}
