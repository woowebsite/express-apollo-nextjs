import React from 'react'
// import { FormattedMessage } from 'react-intl'
import { Menu, Dropdown } from 'antd'
// import Link from 'next/Link';
import styles from './style.module.scss'

class IssuesHistory extends React.Component {
  render() {
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <a href="/">Current Search</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/">Search for issues</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.ItemGroup title="Opened">
          <Menu.Item>
            <a href="/">
              <i className="fe fe-check-circle mr-2" /> CUI-125 Project Implemen...
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/">
              <i className="fe fe-check-circle mr-2" /> CUI-147 Active History Is...
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/">
              <i className="fe fe-check-circle mr-2" /> CUI-424 Ionicons Integrat...
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/">More...</a>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Filters">
          <Menu.Item>
            <a href="/">My Open Issues</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/">Reported by Me</a>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Item>
          <a href="/">
            <i className="fe fe-settings mr-2" /> Settings
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
        <div className={styles.dropdown}>
          <i className={`${styles.icon} fe fe-folder`} />
          <span className="d-none d-xl-inline">
            topBar.issuesHistory
          </span>
        </div>
      </Dropdown>
    )
  }
}

export default IssuesHistory
