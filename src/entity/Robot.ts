import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Robot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  color: string;

  
}
