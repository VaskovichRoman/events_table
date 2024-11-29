import React, {useState, useMemo} from 'react';
import {Table, Button} from 'antd';
import '../styles.css';
import {sortEvents} from '../utils/dataProcessing';
import {DetailsModel, TableComponentProps, TableRecordModel} from "../types";
import {DetailsModal} from "./DetailsModal";


const TableComponent: React.FC<TableComponentProps> = ({data, isAdditionalGroupSelected}) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [detailsData, setDetailsData] = useState<DetailsModel[]>([]);

    const handleExpand = (record: TableRecordModel) => {
        if (!isAdditionalGroupSelected) {
            return;
        }

        const key = record.key;
        if (expandedRowKeys.includes(key)) {
            setExpandedRowKeys(expandedRowKeys.filter(k => k !== key));
        } else {
            setExpandedRowKeys([...expandedRowKeys, key]);
        }
    };

    const handleDetailsClick = (record: TableRecordModel) => {
        const sortedEvents = sortEvents(record.events);

        setDetailsData(sortedEvents);
        setDetailsVisible(true);
    };

    const expandedRowRender = (record: TableRecordModel) => {
        if (record.secondaryData) {
            return (
                <Table
                    columns={columns}
                    dataSource={record.secondaryData}
                    pagination={false}
                    rowClassName={() => 'nested-row'}
                />
            );
        }
        return null;
    };

    const columns = useMemo(() => [
        {title: 'Group By', dataIndex: 'key', key: 'key'},
        {title: 'Page View', dataIndex: 'page view', key: 'page view'},
        {title: 'Click', dataIndex: 'click', key: 'click'},
        {title: 'Subscribe', dataIndex: 'subscribe', key: 'subscribe'},
        {title: 'Contact', dataIndex: 'contact', key: 'contact'},
        {title: 'Registration', dataIndex: 'registration', key: 'registration'},
        {title: 'FD', dataIndex: 'fd', key: 'fd'},
        {title: 'RD', dataIndex: 'rd', key: 'rd'},
        {
            key: 'details',
            render: (_: string, record: TableRecordModel) => (
                <Button type="default" onClick={(event) => {
                    event.stopPropagation();
                    handleDetailsClick(record);
                }}>
                    Details
                </Button>
            ),
        },
    ], []);

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                onRow={(record) => ({
                    onClick: () => handleExpand(record),
                })}
                expandable={{
                    expandedRowRender,
                    rowExpandable: record => !!record.secondaryData && record.secondaryData.length > 0,
                    expandedRowKeys,
                    onExpand: (_, record) => handleExpand(record),
                }}
                pagination={false}
            />
            {detailsVisible && (
                <DetailsModal
                    visible={detailsVisible}
                    onCancel={() => setDetailsVisible(false)}
                    data={detailsData}
                />
            )}
        </>
    );
};


export default TableComponent;