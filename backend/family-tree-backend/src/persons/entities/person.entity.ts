
import { Entity, Column, ObjectIdColumn } from 'typeorm';

export class DatePlace {
  @Column()
  date: string;

  @Column()
  location: string;
}

export class Relationships {

  @Column()
  mother: number;

  @Column()
  father: number;

  @Column()
  stepParents: number[];

  @Column()
  siblings: number[];

  @Column()
  stepSiblings: number[];

  @Column()
  spouses: number[];
}

@Entity()
export class Person {
  @ObjectIdColumn()
  _id: string;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  otherNames: string[];

  @Column((type) => DatePlace)
  birth: DatePlace;

  @Column((type) => DatePlace)
  death: DatePlace;

  @Column()
  currentLocation: string;

  @Column((type) => Relationships)
  relationships: Relationships;

  @Column()
  notes: string;
}