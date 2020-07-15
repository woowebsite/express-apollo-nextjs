import store from 'store'
import actions from './actions'

const initialState = {
  authProvider: 'jwt', // firebase, jwt
  logo: 'Clean UI Pro',
  locale: 'en-US',
  isSidebarOpen: false,
  isSupportChatOpen: false,
  isMobileView: false,
  isMobileMenuOpen: false,
  isMenuCollapsed: false,
  menuLayoutType: 'left', // left, top, nomenu
  routerAnimation: 'slide-fadein-up', // none, slide-fadein-up, slide-fadein-right, fadein, zoom-fadein
  menuColor: 'white', // white, dark, gray
  theme: 'light', // light, dark
  authPagesColor: 'white', // white, gray, image
  primaryColor: '#4b7cf3',
  leftMenuWidth: 256,
  isMenuUnfixed: false,
  isMenuShadow: false,
  isTopbarFixed: false,
  isGrayTopbar: false,
  isContentMaxWidth: false,
  isAppMaxWidth: false,
  isGrayBackground: false,
  isCardShadow: true,
  isSquaredBorders: false,
  isBorderless: false,
}

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
