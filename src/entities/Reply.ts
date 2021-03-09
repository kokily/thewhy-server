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
import Question from './Question';

@Entity()
class Reply extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  body!: string;

  // Relation
  @Column({ nullable: true })
  questionId!: string;

  @OneToOne((type) => Question, (question) => question.reply)
  @JoinColumn({ name: 'questionId' })
  question!: Question;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;
}

export default Reply;
