import { Column, Entity, ObjectIdColumn } from "typeorm";


@Entity()
export class Tree {
    @ObjectIdColumn()
    _id: string;

    @Column()
    name: string;

    @Column()
    notes: string;

    @Column()
    personIDs: string[];
}