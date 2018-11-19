// const yargs = require('yags')
const name = 'Chuloo'
const map = Array.prototype.map
const newName = map.call(name, eachLetter => {
  return `${eachLetter}a`
})
console.log(newName) // ["Ca", "ha", "ua", "la", "oa", "oa"]

const myUsers = [{
  name: 'chuloo',
  likes: 'grilled chicken'
},
{
  name: 'chris',
  likes: 'cold beer'
},
{
  name: 'sam',
  likes: 'fish biscuits'
}
]
const usersByFood = myUsers.map(item => {
  const container = {}
  container[item.name] = item.likes
  container.age = item.name.length * 10
  return container
})
console.log(usersByFood)
