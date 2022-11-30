import { Entity, Column, OneToOne, JoinColumn, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'desenho_file_tmp'})
export class DesenhoFileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128})
  filename: string;
  
  @Column({ length: 64})
  originalname: string;

}