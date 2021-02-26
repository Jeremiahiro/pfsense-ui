const API_BASE_URL = process.env.API_BASE_URL;
const API_PUBLIC_URL = process.env.API_PUBLIC_URL;
const API_URL = process.env.API_PUBLIC_URL + process.env.API_BASE_URL;
const UI_URL = process.env.UI_PUBLIC_URL;

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ui-pfsense',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
    middleware: ["auth"],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './node_modules/bootstrap/dist/css/bootstrap.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/mixins/user.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: API_URL,

    auth: {
      strategies: {
        laravelJWT: {
          provider: "laravel/jwt",
          url: API_PUBLIC_URL,
          endpoints: {
            login: {
              url: `${API_BASE_URL}/login`,
              method: "post",
              propertyName: "token",
            },
            refresh: {
              url: `${API_BASE_URL}/refresh`,
              method: "post",
            },
            user: {
              url: `${API_BASE_URL}/user`,
              method: "get",
              propertyName: "data",
            },
            logout: {
              url: `${API_BASE_URL}/logout`,
              method: "post",
            },
          },
          token: {
            property: "access_token",
            maxAge: 60 * 60,
          },
          refreshToken: {
            maxAge: 20160 * 60,
          },
        },
      },
    },
    redirect: {
      login: "/auth/login",
      logout: "/auth/login",
      callback: "/auth/login",
      home: "/",
    },
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
