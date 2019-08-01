import Vue from 'vue'
import session from './store/session'

let server = null

Vue.prototype.$call = async function call(method, data) {
  if (!data) {
    data = {}
  }

  if (data.server) {
    server = data.server
    delete data.server
  }

  console.log(window.cordova)

  if (window.cordova) {
    return nativeCall(method, data)
  }

  const res = await fetch(`${server || ''}/api/method/${method}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const data = await res.json()
    if (data.docs) {
      return data
    }
    return data.message
  } else {
    const data = await res.json()
    if (data.exc) {
      const error = JSON.parse(data.exc)
      console.error(error[0]) // eslint-disable-line
    }
  }
}

function nativeCall(method, data) {
  let http = window.cordova.plugin.http

  // set sid if found
  let sid = localStorage.getItem('sid')
  if (sid) {
    data.sid = sid
    server = localStorage.getItem('server')
  }

  if (!server) {
    session.setLoggedIn(false)
    return
  }

  return new Promise((resolve, reject) => {
    let options = {
      method: 'post',
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    http.sendRequest(
      `${server || ''}/api/method/${method}`,
      options,
      response => {
        // success
        if (response.status === 200) {
          captureSidAndServer()
          setLoggedIn()

          let data = JSON.parse(response.data)
          if (data.docs) {
            resolve(data)
          }
          resolve(data.message)
        }
      },
      response => {
        // error
        let data
        try {
          data = JSON.parse(response.error)
        } catch (e) {
          data = {}
        }
        if (data.exc) {
          const error = JSON.parse(data.exc)
          console.error(error[0]) // eslint-disable-line
        }

        if (response.status === 401) {
          // unauthorized
          localStorage.clear()
          session.setLoggedIn(false)
        }
        reject(response.status)
      }
    )
  })
}

function captureSidAndServer() {
  let sid = getCookies().sid
  if (sid) {
    localStorage.setItem('sid', sid)
    localStorage.setItem('server', server)
  }
}

function setLoggedIn() {
  let cookies = getCookies()
  session.setLoggedIn(cookies.sid && cookies.sid !== 'Guest')
}

function getCookies() {
  return Object.fromEntries(
    window.cordova.plugin.http
      .getCookieString(server)
      .split('; ')
      .map(part => part.split('='))
  )
}
