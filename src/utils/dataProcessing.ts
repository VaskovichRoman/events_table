import {EventModel, GroupByType, GroupDataModel, PeriodFilter} from "../types";

export const filterData = (data: EventModel[], filters: PeriodFilter, groupBy: GroupByType, searchText: string) => {
    return data.filter((item) => {
        if (!item.id) return false;

        const matchesSearch = item[groupBy].toLowerCase().includes(searchText.toLowerCase());

        return Object.keys(filters).every((key) => {
            if (key === 'date' && filters[key]) {
                const itemDate = new Date(item[key]).getTime();

                if (!filters[key]) return false;

                const filterStartDate = new Date(filters[key][0]).getTime();
                const filterEndDate = new Date(filters[key][1]).getTime();

                if (itemDate === filterStartDate) console.log('23232323: ', itemDate)

                return itemDate >= filterStartDate && itemDate <= filterEndDate;
            } else {
                return data;
            }
        }) && matchesSearch;
    });
};

export const groupData = (filteredData: EventModel[], groupBy: GroupByType) => {
    return filteredData.reduce((acc, item) => {
        const key = item[groupBy];

        if (!acc[key]) {
            acc[key] = {
                campaign: item.campaign,
                ad_name: item.ad_name,
                creative_name: item.creative_name,
                'page view': 0,
                click: 0,
                subscribe: 0,
                contact: 0,
                registration: 0,
                fd: 0,
                rd: 0,
                events: []
            };
        }

        // @ts-ignore
        acc[key][item.type] += 1;
        acc[key].events.push(item);

        return acc;
    }, {} as { [key: string]: GroupDataModel });
};

export const groupDataWithAdditionalGroup = (filteredData: EventModel[], groupBy: GroupByType, additionalGroupBy: GroupByType | null) => {
    return filteredData.reduce((acc, item) => {
        const key = item[groupBy];
        if (!additionalGroupBy) {
            return acc;
        }
        const additionalKey = item[additionalGroupBy];

        if (!acc[key]) {
            // @ts-ignore
            acc[key] = {};
        }

        // @ts-ignore
        if (!acc[key][additionalKey]) {
            // @ts-ignore
            acc[key][additionalKey] = {
                campaign: item.campaign,
                ad_name: item.ad_name,
                creative_name: item.creative_name,
                'page view': 0,
                click: 0,
                subscribe: 0,
                contact: 0,
                registration: 0,
                fd: 0,
                rd: 0,
                events: []
            };
        }

        // @ts-ignore
        acc[key][additionalKey][item.type] += 1;
        // @ts-ignore
        acc[key][additionalKey].events.push(item);

        return acc;
    }, {} as { [key: string]: GroupDataModel });
};

export const sortEvents = (events: EventModel[]) => {
    return events.map((event, index) => ({
        ...event,
        key: event.id ? String(event.id) : `event-${index}`,
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};