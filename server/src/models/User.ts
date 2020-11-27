import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, PrimaryColumn } from "typeorm";

@Entity('users')
export default class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}