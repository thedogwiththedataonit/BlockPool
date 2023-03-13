const login = () => {
    return new Promise(resolve => {
      const redirectUrl = encodeURIComponent('http://local.qa.betblockpool.com:8080/home')
      const authUrl = `http://qa.api.betblockpool.com:3000/auth/google/login?redirectUrl=${redirectUrl}`
      window.location.replace(authUrl)
      resolve()
    })
  }

const rejectPromise = promise => promise.then(value => Promise.reject(value))

const isJsonContentType = response => {
    const contentType = response.headers.get('content-type') ?? ''
    return contentType.includes('application/json')
  }

const isAuthenticated = response => {
    return response.status !== 401
  }

const responseBodyResolver = response =>
    isJsonContentType(response) ? response.json() : response.text()

export const authenticatedFetch = (url, options) => {
    const optionsWithDefaultsAndOverrides = { ...options, credentials: 'include' }
    return fetch(url, optionsWithDefaultsAndOverrides).then(response => {
      const status = response.status
      const isSuccessfulResponse = response.ok
      const resolvedResponsePromise = responseBodyResolver(response).then(
        body => ({
          body,
          status,
          ok: isSuccessfulResponse,
        })
      )
      if (isSuccessfulResponse) {
        return resolvedResponsePromise
      }
      const rejectedResponsePromise = rejectPromise(resolvedResponsePromise)
      if (isAuthenticated(response)) {
        return rejectedResponsePromise
      }
      return login().then(() => {
        return rejectedResponsePromise
      })
    })
  }