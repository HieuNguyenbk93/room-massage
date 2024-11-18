import './App.css'
import { useContext } from 'react'
import { UserContext } from './hooks/authContext'
import AppRoute from './routers/AppRoute'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { HomeOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function App() {
  const { user, logout } = useContext(UserContext);

  const menu = (
    <Menu>
      {/* <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item> */}
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  
  return (
    <>
    <Layout>
      <Header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{width: '200px'}}>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <a href="/business/home">Home</a>
          </Menu.Item>
          <Menu.Item key="2" icon={<HistoryOutlined />}>
            <a href="/business/log">History</a>
          </Menu.Item>
        </Menu>
        </div>
        
        {user ?
        <>
          <div>
          <span style={{ color: 'white' }}>Xin chào {user.name} </span>
          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar
              src={user.photo}
              alt="User Avatar"
              style={{ marginRight: '16px' }}
            />
          </Dropdown>
          </div>
        </>
        : <></>}
        
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <AppRoute />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by NBH
      </Footer>
    </Layout>
    <ToastContainer
      position='bottom-right'
    />
    </>
  )
}

export default App
