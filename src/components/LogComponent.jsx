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
        {/* {isLoading ? 
        <>
        <div className="d-flex justify-content-center modal fade show py-5" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        </> 
        :
        <></>
        }
        <h3>Lịch sử checkin</h3>
        <div>
            {listLog.map((log, index) => {
                return (
                    <p key={index}>
                        {log.index} - {log.time} - Checkin cho khách {log.userName}
                    </p>
                )
            })}
        </div>
        <div className="d-flex justify-content-between align-items-start">
            <label>
                <span>Hiển thị:&nbsp;</span>
                <select value={pageSize} onChange={changePageSize}>
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                &nbsp; Tổng số {total} bản ghi
            </label>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${isDisablePre ? 'disabled': ''}`} onClick={handlerPre}>
                        <a className="page-link" href="#">
                            Previous
                        </a>
                    </li>
                    <li className={`page-item ${isDisableNext ? 'disabled': ''}`} onClick={handlerNext}>
                        <a className="page-link" href="#">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div> */}
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
        />
        </>
    )
}

export default LogComponent;