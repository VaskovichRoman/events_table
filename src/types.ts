export type TableComponentProps = {
    data: TableRecordModel[],
    isAdditionalGroupSelected: boolean,
}

export type EventModel = {
    ad_name: string,
    campaign: string,
    creative_name: string,
    date: string,
    id: number,
    type: string,
}

export type TableRecordModel = {
    ad_name: string,
    campaign: string,
    click: number,
    contact: number,
    creative_name: string,
    events: EventModel[],
    fd: number,
    key: string,
    ['page view']: number,
    rd: number
    registration: number,
    secondaryData: TableRecordModel[] | null,
    subscribe: number
}

export type GroupDataModel = {
    ad_name: string,
    campaign: string,
    click: number,
    contact: number,
    creative_name: string,
    events: EventModel[],
    fd: number,
    // key: string,
    ['page view']: number,
    rd: number
    registration: number,
    subscribe: number
}


export type DetailsModel = {
    ad_name: string,
    campaign: string,
    creative_name: string,
    date: string,
    id: number,
    key: number,
    type: string,
}

export type PeriodFilter = {
    [key: string]: Date[] | null
}

export type GroupByType = 'campaign' |  'ad_name' |'creative_name';
