import { useEffect, useState } from "react";
import Modal from "./Modal";
import UsersController from "../controllers/usersController";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

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

	useEffect(() => {
		const callApi = async () => {
			const result = await UsersController.GetAllUsers();
			console.log(result);
			setListUsers(result.data);
		}
		try {
			callApi();
		}
		catch (err) {
			console.log(err);
		}
	}, []);

	const goToUserProfile = (id) => {
		navigate(`/business/user/${id}`);
	  };

	const onPressChecin = (user) => {
		setIsModalCheckin(true);
		setUserSelected(user);
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
		const user = {
			name: userSelected.name,
			yearOfBirth: userSelected.yearOfBirth,
			countRoom: userSelected.countRoom - 1,
		}
		const result = await UsersController.UpdateUser(userSelected.id, user);
		if (result.ok) {
			const resultList = await UsersController.GetAllUsers();
			setListUsers(resultList.data);
			toast.success('Check in thành công');
		} else {
			toast.error('Check in thất bại');
		}
		setIsModalCheckin(false);
	}

	return (
		<>
			<div className="row mt-1">
				<div className="col-md-6 com-sm-12">
					<h3>Quản lý khách hàng</h3>
				</div>
				<div className="col-md-6 col-sm-12 text-end">
					<button type="button" className="btn btn-info me-2" onClick={() => goToUserProfile("")}>
						Thêm mới
					</button>
				</div>
			</div>
			
			<div>
				
			</div>
			<table className="table table-success table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Tên</th>
						<th scope="col">Năm sinh</th>
						<th scope="col">Số buổi</th>
						<th scope="col">Chức năng</th>
					</tr>
				</thead>
				<tbody>
					{listUsers.map((user, index) => {
						return (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>{user.name}</td>
								<td>{user.yearOfBirth}</td>
								<td>{user.countRoom}</td>
								<td>
									<button type="button" className="btn btn-success me-2" onClick={() => onPressChecin(user)}>Check in</button>
									<button type="button" className="btn btn-danger me-2" onClick={() => goToUserProfile(user.id)}>
										Sửa
									</button>
									<button type="button" className="btn btn-warning" onClick={() => onPressDelete(user)}>Xóa</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Modal
				show={isModalCheckin}
				onClose={() => setIsModalCheckin(false)}
				onSave={() => onConfirmCheckin()}
				title="CHECK IN">
				<p>Bạn có chắc chắn check in cho khách {userSelected.name}</p>
			</Modal>
			<Modal
				show={isModalDelete}
				onClose={() => setIsModalDelete(false)}
				onSave={() => onConfirmDelete()}
				title="XÓA">
				<p>Bạn có chắc chắn muốn xóa khách {userSelected.name}</p>
			</Modal>
		</>
	)
}

export default HomeComponent