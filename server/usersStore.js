let users = [
  {
    id: 1,
    username: "john",
    email: "john@email.com",
    phone: "123456",
    age: 30,
    title: "Developer",
    address: "New York"
  }
]


module.exports = {
  getAll: () => users,
  add: (user) => {
    const newUser = { id: Date.now(), ...user, hobbies: user.hobbies || [] }
    users.push(newUser)
    return newUser
  },
  update: (id, data) => { users = users.map(u => u.id === id ? { ...u, ...data } : u) },
  remove: (id) => { users = users.filter(u => u.id !== id) }
}