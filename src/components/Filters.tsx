import React, {useState} from 'react';
import {Select, DatePicker, Input} from 'antd';
import {GroupByType} from "../types";

const {Option} = Select;
const {RangePicker} = DatePicker;
const {Search} = Input;

interface FiltersProps {
    onPeriodChange: (key: string, value: Date[] | null) => void;
    onGroupByChange: (value: GroupByType) => void;
    onAdditionalGroupByChange: (value: GroupByType | null) => void;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters: React.FC<FiltersProps> = ({
                                             onPeriodChange,
                                             onGroupByChange,
                                             onAdditionalGroupByChange,
                                             onSearchChange
                                         }) => {
    const [selectedGroupBy, setSelectedGroupBy] = useState<GroupByType>('campaign');
    const [selectedAdditionalGroupBy, setSelectedAdditionalGroupBy] = useState<GroupByType | null>(null);

    const handleGroupByChange = (value: GroupByType) => {
        if (value === selectedAdditionalGroupBy) {
            setSelectedAdditionalGroupBy(null);
            onAdditionalGroupByChange(null);
        }

        setSelectedGroupBy(value);
        onGroupByChange(value);
    };

    const handleAdditionalGroupByChange = (value: GroupByType | null) => {
        setSelectedAdditionalGroupBy(value);
        onAdditionalGroupByChange(value);
    };

    const groupByOptions = [
        {value: 'campaign', label: 'Campaign'},
        {value: 'ad_name', label: 'Ad Name'},
        {value: 'creative_name', label: 'Creative Name'},
    ];

    const remainingOptions = groupByOptions.filter(option => option.value !== selectedGroupBy);

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Select
                placeholder="Select Group By"
                onChange={handleGroupByChange}
                defaultActiveFirstOption
                defaultValue={'campaign'}
                style={{width: 200, marginRight: 10}}
            >
                {groupByOptions.map(option => (
                    <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
            </Select>
            <Select
                placeholder="Additional Group By"
                onChange={handleAdditionalGroupByChange}
                defaultActiveFirstOption
                value={selectedAdditionalGroupBy}
                style={{width: 200, marginRight: 10}}
                allowClear
            >
                {remainingOptions.map(option => (
                    <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
            </Select>
            <Search
                placeholder="Search by Name"
                allowClear
                onChange={onSearchChange}
                style={{width: 200, marginRight: 10}}
            />
            <RangePicker
                onChange={(dates) => {
                    // @ts-ignore
                    return onPeriodChange('date', dates);
                }}
                style={{marginRight: 10}}
            />
        </div>
    );
};

export default Filters;