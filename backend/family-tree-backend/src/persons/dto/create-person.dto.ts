import { DatePlace, Relationships } from "../entities/person.entity";

export class CreatePersonDto {
    name: string;
    firstName: string;
    middleName: string;
    lastName: string;
    otherNames: string[];
    birth: DatePlace;
    death: DatePlace;
    currentLocation: string;
    relationships: Relationships;
    notes: string;
}
