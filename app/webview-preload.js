import { webFrame } from 'electron'
import DatArchive from './lib/web-apis/dat-archive'
import UserSession from './lib/web-apis/user-session'
import beaker from './lib/web-apis/beaker'
import experimental from './lib/web-apis/experimental'
import { setup as setupLocationbar } from './webview-preload/locationbar'
import { setup as setupPrompt } from './webview-preload/prompt'
import setupRedirectHackfix from './webview-preload/redirect-hackfix'
import setupExitFullScreenHackfix from './webview-preload/exit-full-screen-hackfix'

// HACKS
setupRedirectHackfix()
setupExitFullScreenHackfix()

// register protocol behaviors
/* This marks the scheme as:
 - Secure
 - Allowing Service Workers
 - Supporting Fetch API
 - CORS Enabled
*/
webFrame.registerURLSchemeAsPrivileged('dat', { bypassCSP: false })

// setup APIs
if (['beaker:', 'dat:', 'https:'].includes(window.location.protocol) ||
    (window.location.protocol === 'http:' && window.location.hostname === 'localhost')) {
  window.DatArchive = DatArchive
}
if (['beaker:', 'dat:'].includes(window.location.protocol)) {
  // window.UserSession = UserSession
  window.beaker = beaker
  window.experimental = experimental
}
setupLocationbar()
setupPrompt()
