export interface Visit {
    id: number
    start: string
    end: string
    description: string
}

export enum VisitState {
    PLANNED = "planned",
    UNPLANNED = "unplanned",
    ACTIVE = "active",
}