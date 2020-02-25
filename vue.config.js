const localUrl = 'http://127.0.0.1:6677'
const devUrl = 'http://119.23.250.47:6677'
const proUrl = ''
const target = devUrl

const proxy = {}
const proxyUrls = [
    'menu'
]

proxyUrls.forEach(url => {
    proxy[url] = {
        target: target,
        changeOrigin: true
    }
})

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',
    devServer: {
        proxy: proxy
    }
}
