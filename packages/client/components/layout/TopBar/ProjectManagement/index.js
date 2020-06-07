import React from 'react'
// import { FormattedMessage } from 'react-intl'
import { Menu, Dropdown } from 'antd'
import Link from 'next/link';
import styles from './style.module.scss'

class ProjectManagement extends React.Component {
  render() {
    const menu = (
      <Menu selectable={false}>
        <Menu.ItemGroup title="Active">
          <Menu.Item>
            <Link href="/">Project Management</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/">User Interface Development</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/">Documentation</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Inactive">
          <Menu.Item>
            <Link href="/">Marketing</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Item>
          <Link href="/">
            <i className="fe fe-settings mr-2" /> Settings
          </Link>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
        <div className={styles.dropdown}>
          <i className={`${styles.icon} fe fe-database`} />
          <span className="d-none d-xl-inline">
            topBar.projectManagement
          </span>
        </div>
      </Dropdown>
    )
  }
}

export default ProjectManagement
