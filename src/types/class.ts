import { Instructor } from "./instructor";
import { Room } from "./room";
import { Schedule } from "./schedule";
import { Section } from "./section";
import { Subject } from "./subject";

export type Class = {
    _id: string,
    code: string;
    subject?: Subject;
    section?: Section;
    room?: Room;
    instructor?: Instructor;
    isOpen?: boolean;
    scheduleDay?: string;
    schedule?: Schedule[];
    createdBy?: string,
    lastUpdatedBy?: string,
    dateCreated?: string,
    dateLastUpdated?: string
}