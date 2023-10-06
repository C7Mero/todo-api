import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    name?: string;

    @Column()
    isDone?: boolean = false;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;
}
export default Todo