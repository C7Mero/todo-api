import { Entity, Column, PrimaryGeneratedColumn, Repository } from "typeorm"

@Entity()
export class Todo {
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