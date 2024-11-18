import { useEffect, useState } from "react";
import CheckinCotroller from "../controllers/checkinCotroller";
import usersController from "../controllers/usersController";
import { Pagination, Table } from 'antd';

const { Column } = Table;

const LogComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [listLog, setListLog] = useState([]);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);

    const handlerSearch = async () => {
        setIsLoading(true);
        const result = await CheckinCotroller.GetLogCheckin(pageSize, pageIndex);
        let listLog = result.data.data;
        const listUser = await Promise.all(
            listLog.map(log => {
                return usersController.GetByUserId(log.userId)
            })
        );
        console.log(listUser);
        listLog = listLog.map((log, index) => {
            let item = {...log};
            item.userName = "Checkin cho khách " + listUser[index].data.name;
            return item;
        });
        setListLog(listLog);
        setTotal(result.data.total);
        setIsLoading(false)
    }

    useEffect(() => {
        handlerSearch();
    }, [pageSize, pageIndex])

    return (
        <>
        <h3>Lịch sử checkin</h3>
        <Table dataSource={listLog} pagination={false} loading={isLoading}>
            <Column
                title="STT"
                dataIndex="index"
            />
            <Column
                title="Thời gian"
                dataIndex="time"
            />
            <Column
                title="Nội dung"
                dataIndex = "userName"
            />
        </Table>
        <Pagination
            total={total}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={pageSize}
            defaultCurrent={1}
            current={pageIndex+1}
            onChange={(page) => setPageIndex(page-1)}
            showSizeChanger
            onShowSizeChange={(current, size) => setPageSize(size)}
            style={{marginTop: '10px'}}
        />
        </>
    )
}

export default LogComponent;