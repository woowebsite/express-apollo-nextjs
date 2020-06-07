import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import style from './style.module.scss'

class General14 extends React.Component {
  render() {
    return (
      <div>
        <div className="height-300 d-flex flex-column justify-content-end">
          <Scrollbars
            renderThumbVertical={({ styles, ...props }) => (
              <div
                {...props}
                style={{
                  ...styles,
                  width: '4px',
                  borderRadius: 'inherit',
                  backgroundColor: '#c5cdd2',
                  left: '1px',
                }}
              />
            )}
            autoHide
          >
            <div className={style.contentWrapper}>
              <div className={style.message}>
                <div className={style.messageContent}>
                  <div className="text-gray-4 font-size-12 text-uppercase">You, 5 min ago</div>
                  <div>Hi! Anyone here? I want to know how I can buy Clean UI KIT Pro?</div>
                </div>
                <div className={`${style.messageAvatar} kit__utils__avatar`}>
                  <img src="resources/images/avatars/avatar-2.png" alt="You" />
                </div>
              </div>
              <div className={`${style.message} ${style.answer}`}>
                <div className={style.messageContent}>
                  <div className="text-gray-4 font-size-12 text-uppercase">Mary, 14 sec ago</div>
                  <div>Please call us + 100 295 000</div>
                </div>
                <div className={`${style.messageAvatar} kit__utils__avatar`}>
                  <img src="resources/images/avatars/2.jpg" alt="Mary Stanform" />
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className="pt-2 pb-2">Mary is typing...</div>
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Send message..."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fe fe-send align-middle" />
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default General14
