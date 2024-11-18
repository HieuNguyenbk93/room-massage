import { useEffect, useState } from "react";
import UsersController from "../controllers/usersController";
import CheckinController from "../controllers/checkinCotroller";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Button, Card, Col, Input, Row, Avatar, Modal } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Search } = Input;

const HomeComponent = () => {
	const navigate = useNavigate();
	const [listUsers, setListUsers] = useState([]);
	const [userSelected, setUserSelected] = useState({
		name: '',
		yearOfBirth: '',
		countRoom: '',
	});
	const [isModalCheckin, setIsModalCheckin] = useState(false);
	const [isModalDelete, setIsModalDelete] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const callApi = async () => {
			const result = await UsersController.GetAllUsers();
			setListUsers(result.data);
			setLoading(false);
		}
		try {
			setLoading(true);
			callApi();
			setLoading(false);
		}
		catch (err) {
			setLoading(false);
			console.log(err);
		}
	}, []);

	const onPressSearch = async (valueSearch) => {
        console.log(valueSearch);
		setLoading(true);
		const result = await UsersController.GetByUserName(valueSearch);
		if (result.ok) {
			setListUsers(result.data);
			setLoading(false);
		}
    }

	const goToUserProfile = (id) => {
		navigate(`/business/user/${id}`);
	};

	const onPressChecin = (user) => {
        if (user.countRoom <= 0) {
            toast.warning('Khách đã hết số buổi');
            return;
        }
        else {
            setIsModalCheckin(true);
            setUserSelected(user);
        }
	};
	const onPressDelete = (user) => {
		setIsModalDelete(true);
		setUserSelected(user);
	}
	const onConfirmDelete = async () => {
		const result = await UsersController.DeleteUser(userSelected.id);
		if (result.ok) {
			const resultList = await UsersController.GetAllUsers();
			setListUsers(resultList.data);
			toast.success('Xóa thành công');
		} else {
			toast.error('Xóa thất bại');
		}
		setIsModalDelete(false);
	}

	const onConfirmCheckin = async () => {
		const result = await CheckinController.CheckinByUserId(userSelected.id)
		if (result.ok) {
			const resultList = await UsersController.GetAllUsers();
			setListUsers(resultList.data);
			toast.success('Check in thành công');
		}
		else {
			toast.error('Check in thất bại');
		}
		setIsModalCheckin(false);
	}

	return (
		<>
		
		<Row gutter={16}>
			<Col xs={24} sm={24} md={12} lg={12}>
				<h3>Quản lý khách hàng</h3>
			</Col>
			<Col xs={24} sm={24} md={12} lg={12} style={{ textAlign: 'right' }}>
				<Button type="primary" icon={<UserAddOutlined />} onClick={() => goToUserProfile("")}>Thêm mới</Button>
			</Col>
		</Row>
		<Row style={{ textAlign: 'right' }}>
			<Col xs={24} sm={24} md={12} lg={12}></Col>
			<Col xs={24} sm={24} md={12} lg={12} style={{ textAlign: 'right' }}>
				<Search placeholder="Tìm kiếm theo tên" allowClear onSearch={onPressSearch} />
			</Col>
		</Row>
		<Row gutter={[16, 16]} wrap>
			{listUsers.map((user, index) => (
				<Col xs={24} sm={12} md={8} lg={6} key={index}>
					<Card loading={loading}
						actions ={[
							<CheckCircleOutlined key="checkin" title="Check in" style={{fontSize: 20}}
								onClick={() => onPressChecin(user)}
							/>,
							<EditOutlined key="edit" title="Sửa" style={{fontSize: 20}}
								onClick={() => goToUserProfile(user.id)}
								
							/>,
							<DeleteOutlined key="Xóa" title="Xóa" style={{fontSize: 20}}
								onClick={() => onPressDelete(user)}
							/>
						]}
					>
						<Card.Meta
						avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
						title={user.name}
						description={
							<>
							<p>Năm sinh: <b>{user.yearOfBirth}</b></p>
							<p>Số buổi: <b>{user.countRoom}</b></p>
							</>
						}
						/>
					</Card>
				</Col>
				
			))}
		</Row>
		<Modal title="XÓA" open={isModalDelete} onOk={onConfirmDelete} onCancel={() => setIsModalDelete(false)}>
			<p>Bạn có chắc chắn muốn xóa khách <b><i>{userSelected.name}</i></b></p>
		</Modal>
		<Modal title="CHECKIN" open={isModalCheckin} onOk={onConfirmCheckin} onCancel={() => setIsModalCheckin(false)}>
			<p>Bạn có chắc chắn check in cho khách {userSelected.name} <b><i>{userSelected.name}</i></b></p>
		</Modal>
		</>
	)
}

export default HomeComponent