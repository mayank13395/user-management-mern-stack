import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import logger from '../../logger'
import { UserModel } from '../../model/user.model'

const registerUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    firstName, lastName, email, password,
  } = req.body
  logger.debug(`req body:- ${req.body}`)

  try {
    // check if user exists
    let user = await UserModel.findOne({ email })
    if (user) {
      return res.status(400).json({ error: [{ msg: 'user already exists' }] })
    }

    user = new UserModel({
      firstName, lastName, email, password, photo: '',
    })

    // encrypt the password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    // saving to database
    await user.save()

    // send jwt
    // Create token
    const token = user.getAuthToken()
    console.log('token', token)
    return res.send({ token })
  } catch (err) {
    console.log(err.message)
    return res.status(500).send('Sever error!')
  }
}

export default registerUser
