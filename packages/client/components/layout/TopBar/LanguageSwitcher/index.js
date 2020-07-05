import React from "react";
import { Menu, Dropdown } from "antd";
import { connect } from "react-redux";
import styles from "./style.module.scss";

// @connect(({ settings }) => ({ settings }))
class LanguageSwitcher extends React.Component {
  changeLanguage = ({ key }) => {
    const { dispatch } = this.props;
    dispatch({
      type: "settings/CHANGE_SETTING",
      payload: {
        setting: "locale",
        value: key,
      },
    });
  };

  render() {
    const { locale } = this.props.settings;
    
    const language = locale ? locale.substr(0, 2) : 'en';
    const menu = (
      <Menu selectedKeys={[locale]} onClick={this.changeLanguage}>
        <Menu.Item key="en-US">
          <span className="text-uppercase font-size-12 mr-2">EN</span>
          English
        </Menu.Item>
        <Menu.Item key="fr-FR">
          <span className="text-uppercase font-size-12 mr-2">FR</span>
          French
        </Menu.Item>
        <Menu.Item key="ru-RU">
          <span className="text-uppercase font-size-12 mr-2">RU</span>
          Русский
        </Menu.Item>
        <Menu.Item key="zh-CN">
          <span className="text-uppercase font-size-12 mr-2">CN</span>
          简体中文
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
        <div className={styles.dropdown}>
          <span className="text-uppercase">{language}</span>
        </div>
      </Dropdown>
    );
  }
}

export default connect(state => state)(LanguageSwitcher);
