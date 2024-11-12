// import { useState } from 'react';
import { useParams } from 'react-router-dom';
const UserComponent = () => {
    const { userId } = useParams();
    console.log(userId);
    const title = userId ? 'Sửa người dùng' : 'Thêm mới người dùng';
    return (
        <>
        <h3>{title}</h3>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Tên</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Năm sinh</label>
                <input type="number" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    )
}

export default UserComponent

