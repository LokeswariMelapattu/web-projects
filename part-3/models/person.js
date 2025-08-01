
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url) 
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const phoneValidator =[ {
    validator: function(v) {
      return /^(\d{2,3}-\d{6,})$/.test(v);
    },
    message: props => `${props.value} is not a valid phone number!`
  }, 
  {
    validator: function (v) {
      return v.length >= 8;
    },
    message: props => `Phone number must be at least 8 characters long.`
  }];
const personSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    minlength: 3
  },
  number: { 
    type: String, 
    required: true ,
    validate: phoneValidator
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)