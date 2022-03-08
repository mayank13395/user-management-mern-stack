import { UserModel } from "../../model/user.model";

const updateUserProfile = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    const profileObj = {
        user: req.user.id,
        firstName,
        lastName,
        email,
        password
    }

    try {
        // need to update
        let profile = await UserModel.findByIdAndUpdate({ _id: req.user.id },
            profileObj,
            { new: true });
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever error!')
    }
}

export default updateUserProfile
