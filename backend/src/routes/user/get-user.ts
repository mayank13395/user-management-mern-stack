import { UserModel } from '../../model/user.model'

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id)
    // .select('-password');
    if (!user) {
      return res.status(400).json({ error: [{ msg: 'Access denied!' }] })
    }

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).send('Sever error!')
  }
}

export default getUser
