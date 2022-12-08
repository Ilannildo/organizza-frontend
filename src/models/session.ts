import { IEvent } from "./event";
import { ISessionCover } from "./sessionCover";
import { ISessionType } from "./sessionType";

export interface ISession {
    id: string;
    ref_code: string;
    title: string;
    credit_hour?: number;
    summary: string;
    responsible_name: string;
    event_id: string;
    session_type_id: string;
    place: string;
    start_date: Date;
    start_time: Date;
    end_date: Date;
    end_time: Date;
    status: "published" | "started" | "finished";
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    event?: IEvent;
    session_cover?: ISessionCover;
    session_type?: ISessionType;
}