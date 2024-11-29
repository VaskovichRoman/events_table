import React, {useState, useMemo} from 'react';
import Filters from './components/Filters.tsx';
import TableComponent from './components/TableComponent.tsx';
import useData from './hooks/useData.ts';
import './styles.css';
import {Spin} from 'antd';
import {filterData, groupData, groupDataWithAdditionalGroup} from './utils/dataProcessing';
import {GroupByType, PeriodFilter} from "./types";


const App: React.FC = () => {
    const {data, loading} = useData();
    const [filters, setFilters] = useState<PeriodFilter>({});
    const [groupBy, setGroupBy] = useState<GroupByType>('campaign');
    const [additionalGroupBy, setAdditionalGroupBy] = useState<GroupByType | null>(null);
    const [searchText, setSearchText] = useState<string>('');

    const handlePeriodChange = (key: string, value: Date[] | null) => {
        setFilters({...filters, [key]: value});
    };

    const handleGroupByChange = (value: GroupByType) => {
        setGroupBy(value);
    };

    const handleAdditionalGroupByChange = (value: GroupByType | null) => {
        setAdditionalGroupBy(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const filteredData = useMemo(() => filterData(data, filters, groupBy, searchText), [data, filters, groupBy, searchText]);
    const groupedData = useMemo(() => groupData(filteredData, groupBy), [filteredData, groupBy]);
    const groupedDataWithAdditionalGroup = useMemo(() => groupDataWithAdditionalGroup(filteredData, groupBy, additionalGroupBy), [filteredData, groupBy, additionalGroupBy]);

    const tableData = useMemo(() => Object.keys(groupedData).map((key) => ({
        key,
        ...groupedData[key],
        secondaryData: groupedDataWithAdditionalGroup[key] ? Object.keys(groupedDataWithAdditionalGroup[key]).map((additionalKey) => ({
            key: additionalKey,
            // @ts-ignore
            ...groupedDataWithAdditionalGroup[key][additionalKey],
        })) : null,
    })), [groupedData, groupedDataWithAdditionalGroup]);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Event Analytics Dashboard</h1>
            </header>
            <Filters
                onPeriodChange={handlePeriodChange}
                onGroupByChange={handleGroupByChange}
                onAdditionalGroupByChange={handleAdditionalGroupByChange}
                onSearchChange={handleSearchChange}
            />
            <div className="table-container">
                {loading ? (
                    <div className="spin-container">
                        <Spin size="large"/>
                    </div>
                ) : (
                    <TableComponent data={tableData} isAdditionalGroupSelected={!!additionalGroupBy}/>
                )}
            </div>
            <footer className="app-footer">
                <p>© 2024 Event Analytics Dashboard. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;