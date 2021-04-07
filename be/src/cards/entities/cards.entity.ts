import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cards {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  text: string;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];
}
