import { StateVariable } from 'impera-js';
import { systemError, systemAlarm } from './Types.js';
export declare class ErrorTray extends StateVariable {
    errorExpiry_days: number;
    swipe_interval_ID: number;
    constructor(name: string);
    GetAll(): any;
    setSwipeInterval(interval_ms: number): void;
    Create(error: systemError): void;
    _create(error: systemError): void;
    Acknoweldge(ID: number): void;
    _ack(ID: number): void;
    GetUnack(): systemError[];
    CleanAll(): void;
    _cleanup(cleanAll: boolean): void;
}
export declare class AlarmTray extends ErrorTray {
    Create(alarm: systemAlarm): void;
    _create(alarm: systemAlarm): void;
    UpdateOrCreate(): void;
    GetActiveAlarms(): void;
}
