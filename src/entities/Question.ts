import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import bcrypt from 'bcryptjs';
import Reply from './Reply';

@Entity()
class Question extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'text', nullable: true })
  phone!: string | null;

  @Column({ type: 'text', nullable: true })
  @IsEmail()
  email!: string | null;

  @Column({ type: 'boolean' })
  isReply!: boolean;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  // Relation
  @Column({ nullable: true })
  replyId!: string;

  @OneToOne((type) => Reply, (reply) => reply.question, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'replyId' })
  reply!: Reply;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async setPassword(password: string): Promise<void> {
    this.password = await this.hashPassword(password);
  }

  async validPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export default Question;
