import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Framework } from './framework.model';
import { User } from './user.model';

@Entity()
@Exclude()
export class Vote {
  @PrimaryColumn({ name: 'framework__name' })
  @Expose()
  public frameworkName: string;

  @PrimaryColumn({ name: 'user__username' })
  @Expose()
  public voterUsername: string;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public documentation: number;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public configuration: number;

  @Column({ name: 'dependency_management', type: 'int', nullable: true })
  @Expose()
  public dependencyManagement: number;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public routing: number;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public debugging: number;

  @Column({ name: 'input_validation', type: 'int', nullable: true })
  @Expose()
  public inputValidation: number;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public auth: number;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public serialization: number;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public testing: number;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public logging: number;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public caching: number;

  @Column({ name: 'http_requests', type: 'int', nullable: true })
  @Expose()
  public httpRequests: number;

  @Column({ name: 'queue_handling', type: 'int', nullable: true })
  @Expose()
  public queueHandling: number;

  @Column({ type: 'int', nullable: true })
  @Expose()
  public websockets: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ManyToOne(() => Framework, (framework) => framework.votes, {
    nullable: false,
  })
  @JoinColumn({ name: 'framework__name' })
  public framework: Framework;

  @ManyToOne(() => User, (user) => user.votes, { nullable: false })
  @JoinColumn({ name: 'user__username' })
  public voter: User;
}
