import React from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Avatar, Badge } from "antd";
import { UserOutlined } from '@ant-design/icons';
import styles from "./style.module.scss";

class ProfileMenu extends React.Component {
  state = {
    count: 7,
  };

  logout = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: "user/LOGOUT",
    });
  };

  addCount = () => {
    let { count } = this.state;
    count += 1;
    this.setState({
      count,
    });
  };

  render() {
    const { user } = this.props;
    const { count } = this.state;
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>
            topBar.profileMenu.hello
            {user.name || "Anonymous"}
          </strong>
          <div>
            <strong className="mr-1">
              topBar.profileMenu.billingPlan
            </strong>
            Professional
          </div>
          <div>
            <strong>
              topBar.profileMenu.role
            </strong>
            {user.role}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div>
            <strong>
              topBar.profileMenu.email
            </strong>
            {user.email}
            <br />
            <strong>
              topBar.profileMenu.phone
            </strong>
            {user.phone || "— "}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <i className="fe fe-user mr-2" />
            topBar.profileMenu.editProfile
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="#" onClick={this.logout}>
            <i className="fe fe-log-out mr-2" />
            topBar.profileMenu.logout
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        onVisibleChange={this.addCount}
      >
        <div className={styles.dropdown}>
          <Badge count={count}>
            <Avatar
              className={styles.avatar}
              shape="square"
              size="large"
              icon={ <UserOutlined />}
            />
          </Badge>
        </div>
      </Dropdown>
    );
  }
}

export default connect(state => state)(ProfileMenu);
