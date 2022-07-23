import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.model';
import { Vote } from './vote.model';

@Entity()
@Exclude()
export class Framework {
  @PrimaryColumn()
  @Expose()
  public name: string;

  @Column({ type: 'text', nullable: true })
  @Expose()
  public description: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  public active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ManyToOne(() => User, (user) => user.updatedFrameworks, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  public createdBy: User;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ManyToOne(() => User, (user) => user.updatedFrameworks, { nullable: false })
  @JoinColumn({ name: 'updated_by' })
  public updatedBy: User;

  @OneToMany(() => Vote, (vote) => vote.framework)
  public votes: Vote[];
}
