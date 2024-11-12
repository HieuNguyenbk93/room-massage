import { useEffect, useState } from "react";
import Modal from "./Modal";
import UsersController from "../controllers/usersController";
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
	const navigate = useNavigate();
	const [listUsers, setListUsers] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		const callApi = async () => {
			const result = await UsersController.GetAllUsers();
			setListUsers(result);
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

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};
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
									<button type="button" className="btn btn-success me-2" onClick={toggleModal}>Check in</button>
									<button type="button" className="btn btn-danger me-2" onClick={() => goToUserProfile(user.id)}>
										Sửa
									</button>
									<button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#deleteModal">Xóa</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Modal show={isModalVisible} onClose={toggleModal}>
				<p>This is a Bootstrap modal in React!</p>
			</Modal>
		</>
	)
}

export default HomeComponent