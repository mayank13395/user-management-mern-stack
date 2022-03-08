import { UserModel } from "../../model/user.model";

const getUser = async (req, res) => {
    try {
        let user = await UserModel.findById(req.user.id)
        // .select('-password');
        if (!user) {
            return res.status(400).json({ error: [{ msg: 'Access denied!' }] })
        }

        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).send('Sever error!')
    }

}

export default getUser