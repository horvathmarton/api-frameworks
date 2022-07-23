import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Framework } from './framework.model';
import { Vote } from './vote.model';

@Entity()
export class User {
  @PrimaryColumn()
  public username: string;

  @Column({ name: 'full_name', type: 'text', nullable: false })
  public fullName: string;

  @Column({ name: 'password_hash', type: 'text', nullable: false })
  public passwordHash: string;

  @Column({
    name: 'is_admin',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  public isAdmin: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @OneToMany(() => Framework, (framework) => framework.createdBy)
  public createdFrameworks: Framework[];

  @OneToMany(() => Framework, (framework) => framework.createdBy)
  public updatedFrameworks: Framework[];

  @OneToMany(() => Vote, (vote) => vote.voter)
  public votes: Vote[];
}
