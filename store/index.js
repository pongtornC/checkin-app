import Vue from 'vue'

export const state = () => ({
  online: false,
  drawer: false,
  student: [],
})

export const mutations = {
  setOnline(state, status) {
    state.online = status
  },
  setDrawer(state, status) {
    state.drawer = status
  },
  setStudent(state, data) {
    state.student = data
  },
}

export const actions = {
  async loadStudents(store) {
    // 1. โหลดข้อมูลเก่าจาก localStorage ก่อน
    let students = JSON.parse(window.localStorage.getItem('students') || '[]')
    // 2. commit
    store.commit('setStudent', students)
    // 3. ยิง api เพื่อข้อมูลใหม่จาก server
    let res = await Vue.axios.post('/student/list2?key=1&key2=3', {room: '2', year: '4'})

    // ตัวอย่างการ ส่งข้อมูลแบบ get
    // let res = await Vue.axios.get('/student/list2?key=1')
    // let res = await Vue.axios.get('/student/list2', { params: {room: 2 } })

    // 4.commit
    store.commit('setStudent', res.data)
    // 5. เก็บลง localStorage
    window.localStorage.setItem('students', JSON.stringify(res.data))

    /* let students = JSON.parse(window.localStorage.getItem('students') || '[]')
    store.commit('setStudent', students)
    let newData = []
      for (let i = 1; i <= 100; i++) {
        newData.push({
          code: ('' + i).padStart(4, '0'),
          name: `Name${i}`,
          room: '' + Math.ceil(i / 30),
        })
      }
      store.commit('setStudent', newData)
      window.localStorage.setItem('students', JSON.stringify(newData))
    */
  },
}
