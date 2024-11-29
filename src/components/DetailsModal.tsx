import React, {useMemo, useState} from "react";
import {Modal, Pagination, Table} from "antd";
import {DetailsModel} from "../types.ts";

interface DetailsModalProps {
    visible: boolean;
    onCancel: () => void;
    data: DetailsModel[];
}

export const DetailsModal: React.FC<DetailsModalProps> = ({visible, onCancel, data}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 10;

    const columns = useMemo(() => [
        {title: 'Date', dataIndex: 'date', key: 'date'},
        {title: 'Ad Name', dataIndex: 'ad_name', key: 'ad_name'},
        {title: 'Creative Name', dataIndex: 'creative_name', key: 'creative_name'},
        {title: 'Type', dataIndex: 'type', key: 'type'},
    ], []);

    const paginatedData = useMemo(() => data.slice((currentPage - 1) * pageSize, currentPage * pageSize), [data, currentPage, pageSize]);

    return (
        <Modal
            title="Details"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
            style={{height: '800px'}}
        >
            <Table
                columns={columns}
                dataSource={paginatedData}
                pagination={false}
                rowKey="id"
            />
            <Pagination
                current={currentPage}
                total={data.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                align={'center'}
                style={{marginTop: 16, textAlign: 'center'}}
                showSizeChanger={false}
            />
        </Modal>
    );
};