import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Link from 'next/link';
import { Menu, Layout } from "antd";
import classNames from "classnames";
import store from "store";
import { Scrollbars } from "react-custom-scrollbars";
import { find } from "lodash";
import style from "./style.module.scss";

// TODO: using MaptoState instead of this.props
// const mapStateToProps = ({ menu, settings, user }) => ({
//   menuData: menu.menuData,
//   isMenuCollapsed: settings.isMenuCollapsed,
//   isMobileView: settings.isMobileView,
//   isMobileMenuOpen: settings.isMobileMenuOpen,
//   isMenuUnfixed: settings.isMenuUnfixed,
//   isMenuShadow: settings.isMenuShadow,
//   leftMenuWidth: settings.leftMenuWidth,
//   menuColor: settings.menuColor,
//   logo: settings.logo,
//   role: user.role,
// });

@withRouter
class MenuLeft extends React.Component {
  state = {
    selectedKeys: [],
    openedKeys: [],
  };

  UNSAFE_componentWillMount() {
    this.setSelectedKeys(this.props);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.isMenuCollapsed && !newProps.isMobileView) {
      this.setState({
        openedKeys: [],
      });
    }
    this.setSelectedKeys(newProps);
  }

  setSelectedKeys = (props) => {
    const { menuData } = this.props.menu;
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item);
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key));
        }
        return flattenedItems;
      }, []);

    const selectedItem = find(flattenItems(menuData, "children"), [
      "url",
      //TODO: 
      // this.props.router.location.pathname,
    ]);
    this.setState({
      selectedKeys: selectedItem ? [selectedItem.key] : [],
    });
  };

  onCollapse = (value, type) => {
    const { dispatch, isMenuCollapsed } = this.props;
    if (type === "responsive" && isMenuCollapsed) {
      return;
    }

    dispatch({
      type: "settings/CHANGE_SETTING",
      payload: {
        setting: "isMenuCollapsed",
        value: !isMenuCollapsed,
      },
    });

    this.setState({
      openedKeys: [],
    });
  };

  onOpenChange = (openedKeys) => {
    // TODO: Save old settings to database instead localstorage
    // store.set("app.menu.openedKeys", openedKeys);
    this.setState({
      openedKeys,
    });
  };

  handleClick = (e) => {
    // TODO: Save old settings to database instead localstorage
    // store.set("app.menu.selectedKeys", [e.key]);
    this.setState({
      selectedKeys: [e.key],
      // openedKeys: e.keyPath,
    });
  };

  generateMenuItems = () => {
    const { menuData = [] } = this.props.menu;
    const { role } = this.props.user;
    const generateItem = (item) => {
      const { key, title, url, icon, disabled, count } = item;
      if (item.category) {
        return <Menu.ItemGroup key={Math.random()} title={item.title} />;
      }
      if (item.url) {
        return (
          <Menu.Item key={key} disabled={disabled}>
            <Link href={url}>
              <span className={style.title}>{title}</span>
            </Link>
          </Menu.Item>
        );
      }
      return (
        <Menu.Item key={key} disabled={disabled}>
          <span className={style.title}>{title}</span>
          {count && <span className="badge badge-success ml-2">{count}</span>}
          {icon && (
            <span className={`${icon} ${style.icon} icon-collapsed-hidden`} />
          )}
        </Menu.Item>
      );
    };

    const generateSubmenu = (items) =>
      items.map((menuItem) => {
        if (menuItem.children) {
          const subMenuTitle = (
            <span key={menuItem.key}>
              <span className={style.title}>{menuItem.title}</span>
              {menuItem.count && (
                <span className="badge badge-success ml-2">
                  {menuItem.count}
                </span>
              )}
              {menuItem.icon && (
                <span className={`${menuItem.icon} ${style.icon}`} />
              )}
            </span>
          );
          return (
            <Menu.SubMenu title={subMenuTitle} key={menuItem.key}>
              {generateSubmenu(menuItem.children)}
            </Menu.SubMenu>
          );
        }
        return generateItem(menuItem);
      });

    return menuData.map((menuItem) => {
      if (menuItem.roles && !menuItem.roles.includes(role)) {
        return null;
      }
      if (menuItem.children) {
        const subMenuTitle = (
          <span key={menuItem.key}>
            <span className={style.title}>{menuItem.title}</span>
            {menuItem.count && (
              <span className="badge badge-success ml-2">{menuItem.count}</span>
            )}
            {menuItem.icon && (
              <span className={`${menuItem.icon} ${style.icon}`} />
            )}
          </span>
        );
        return (
          <Menu.SubMenu title={subMenuTitle} key={menuItem.key}>
            {generateSubmenu(menuItem.children)}
          </Menu.SubMenu>
        );
      }
      return generateItem(menuItem);
    });
  };

  render() {
    const { selectedKeys, openedKeys } = this.state;
    const {
      isMobileView,
      isMenuCollapsed,
      menuColor,
      leftMenuWidth,
      logo,
      isMenuUnfixed,
      isMenuShadow,
    } = this.props.settings;

    const menuSettings = isMobileView
      ? {
        width: leftMenuWidth,
        collapsible: false,
        collapsed: false,
        onCollapse: this.onCollapse,
      }
      : {
        width: leftMenuWidth,
        collapsible: true,
        collapsed: isMenuCollapsed,
        onCollapse: this.onCollapse,
        breakpoint: "lg",
      };

    const menu = this.generateMenuItems();

    return (
      <Layout.Sider
        {...menuSettings}
        className={classNames(`${style.menu}`, {
          [style.white]: menuColor === "white",
          [style.gray]: menuColor === "gray",
          [style.dark]: menuColor === "dark",
          [style.unfixed]: isMenuUnfixed,
          [style.shadow]: isMenuShadow,
        })}
      >
        <div
          className={style.menuOuter}
          style={{
            width: isMenuCollapsed && !isMobileView ? 80 : leftMenuWidth,
            height:
              isMobileView || isMenuUnfixed
                ? "calc(100% - 64px)"
                : "calc(100% - 110px)",
          }}
        >
          <div className={style.logoContainer}>
            <div className={style.logo}>
              <img
                src="./assets/logo.svg"
                className="mr-2"
                alt="Clean UI"
              />
              <div className={style.name}>{logo}</div>
              {logo === "Clean UI Pro" && (
                <div className={style.descr}>React</div>
              )}
            </div>
          </div>
          <Scrollbars
            renderThumbVertical={({ ...props }) => (
              <div
                {...props}
                style={{
                  width: "4px",
                  borderRadius: "inherit",
                  backgroundColor: menuColor === "dark" ? "#32304b" : "#c5cdd2",
                  left: "1px",
                }}
              />
            )}
            autoHide
          >
            <Menu
              onClick={this.handleClick}
              selectedKeys={selectedKeys}
              openKeys={openedKeys}
              onOpenChange={this.onOpenChange}
              mode="inline"
              className={style.navigation}
              inlineIndent="15"
            >
              {menu}
            </Menu>
            <div className={style.banner}>
              <p>
                More components, more style, more themes, and premium support!
              </p>
              <a
                href="https://themeforest.net/item/clean-ui-react-admin-template/21938700"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-success btn-rounded px-3"
              >
                Buy Bundle
              </a>
            </div>
          </Scrollbars>
        </div>
      </Layout.Sider>
    );
  }
}

export default connect(state => state)(MenuLeft);
