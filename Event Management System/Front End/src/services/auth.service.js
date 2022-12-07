export default {
  login: function (data) {
    console.log(data)
    window.localStorage.setItem(
      'auth',
      JSON.stringify({
        isLoggedIn: true,
        token: data.accessToken,
        email: data.email,
        userId: data.userId,
        name: data.name,
      })
    )
  },
  parse: function () {
    return JSON.parse(window.localStorage.getItem('auth'))
  },
  getToken: function () {
    if (!this.isLoggedIn()) {
      throw new Error('Accessing token without logged in user')
    }

    return this.parse().token
  },
  isLoggedIn: function () {
    const parsed = this.parse()
    return parsed ? parsed.isLoggedIn : false
  },
  logout: function () {
    window.localStorage.removeItem('auth')
  },
}
