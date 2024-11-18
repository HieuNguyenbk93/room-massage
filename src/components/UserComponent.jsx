import { useEffect, useState } from "react";
import UsersController from "../controllers/usersController";
import { useParams } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Button, Row } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';

const UserSchema = Yup.object().shape({
    name: Yup.string().min(6, 'Too Short!').required('Required'),
    yearOfBirth: Yup.number().min(1920).max(2008).required('Required'),
    countRoom: Yup.number().min(0).required('Required')
})

const UserComponent = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const title = userId ? 'Sửa người dùng' : 'Thêm mới người dùng';
    const [user, setUser] = useState({
        name: '',
        yearOfBirth: '',
        countRoom: '',
    });

    useEffect(() => {
		const callApi = async () => {
			const result = await UsersController.GetByUserId(userId);
            console.log(result);
            setUser(result.data);
		}
		try {
            if (userId) {
                callApi();
            }
		}
		catch (err) {
			console.log(err);
		}
	}, []);

    const onPressSave = async (values) => {
        if (userId) {
            const result = await UsersController.UpdateUser(userId, values);
            console.log(result);
            if (result.ok) {
                navigate("/business/home");
            }
        }
        else {
            const result = await UsersController.CreateUser(values);
            if (result.ok) {
                toast.success('Thêm mới thành công');
                navigate("/business/home");
            }
            else {
                toast.error('Thêm mới thất bại');
            }
        }
    }

    return (
        <>
        <Row>
            <Button icon={<ArrowLeftOutlined />} shape="circle" onClick={() => navigate(-1)}/>
            <h3>&nbsp;{title}</h3>
        </Row>
        
        <Formik
            enableReinitialize
            initialValues={user}
            validationSchema={UserSchema}
            onSubmit={values => onPressSave(values)}
        >
            {({errors, touched}) => (
                <Form>
                    <div className="mb-3">
                        <label className="form-label">Tên</label>
                        <Field
                            name="name"
                            className="form-control"
                            placeholder="Nhập tên"
                            type="text"
                        />
                        {errors.name && touched.name ? (<i className="text-danger">*{errors.name}</i>) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Năm sinh</label>
                        <Field
                            name="yearOfBirth"
                            className="form-control"
                            placeholder="Nhập năm sinh"
                            type="number"
                        />
                        {errors.yearOfBirth && touched.yearOfBirth ? (<i className="text-danger">*{errors.yearOfBirth}</i>) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số buổi</label>
                        <Field
                            name="countRoom"
                            className="form-control"
                            placeholder="Nhập số buổi"
                            type="number"
                        />
                        {errors.countRoom && touched.countRoom ? (<i className="text-danger">*{errors.countRoom}</i>) : null}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {userId ? 'Lưu thay đổi' : 'Thêm mới'}
                    </button>
                </Form>
            )}
        </Formik>
        </>
    )
}

export default UserComponent

