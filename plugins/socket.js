import Vue from 'vue'
import io from 'socket.io-client'
import config from '~/config.js'

const socket = io(config.socket.url)
socket._topics = {}

socket.on('connect', () => {
  console.log('socket ready')
  socket.emit('signin', {user: config.socket.user, pass: config.socket.pass})
  Object.keys(socket._topics).forEach(topic => socket.subscribe(topic))
})

socket.publish = function(topic, payload) {
  socket.emit('publish', topic, payload)
}

socket.subscribe = function(topic, cb) {
  if (socket._topics[topic]) {
    socket.off(topic, socket._topics[topic])
  }
  socket._topics[topic] = cb
  socket.on(topic, cb)
  socket.emit('subscribe', topic)
}

socket.unsubscribe = function(topic) {
  if (socket._topics[topic]) {
    socket.off(topic, socket._topics[topic])
  }
  delete socket._topics[topic]
  socket.emit('unsubscribe', topic)
}

Vue.socket = socket
Vue.prototype.$socket = socket
