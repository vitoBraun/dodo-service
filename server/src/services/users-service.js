const User = require('../models/users-model')
const bcrypt = require('bcryptjs')

function transformUser(user) {
  return {
    id: user._id.toString(),
    email: user.email,
    type: user.type,
    groups: user.groups,
    catalogUrl: user.catalogUrl
  }
}

module.exports.getUsers = () => {
  return User.find().then(users => users.map(transformUser))
}

module.exports.getUserById = id => {
  return User.findById(id).then(transformUser)
}

module.exports.createUser = async ({
  email,
  password,
  type,
  groups,
  catalogUrl
}) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('Пользователь уже существует')
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ email, passwordHash, type, groups, catalogUrl })
  await user.save()
  return transformUser(user)
}

module.exports.createDemoClient = async ({ email, password }) => {
  return await module.exports.createUser({
    email,
    password,
    type: 'demo-client',
    groups: ['maps']
  })
}

module.exports.updateUser = async (id, { type, groups, catalogUrl }) => {
  const user = await User.findById(id)
  if (type) user.type = type
  if (groups) user.groups = groups
  if (catalogUrl) user.catalogUrl = catalogUrl
  await user.save()
  return transformUser(user)
}

module.exports.deleteUser = async id => {
  const existingUser = await User.findById(id)
  if (!existingUser) {
    throw new Error('Пользователь не существует')
  }
  const user = await User.findByIdAndDelete(id)
  return transformUser(user)
}
