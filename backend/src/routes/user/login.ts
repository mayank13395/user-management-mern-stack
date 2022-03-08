import { validationResult } from "express-validator";
import { UserModel } from "../../model/user.model";
import bcrypt from 'bcryptjs'
import logger from "../../logger";

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    logger.debug(`req.body in login:-`, req.body)

    try {
        // check if user exists
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: [{ msg: 'Wrong credentials' }] })
        }

        // check for valid password 
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(400).json({ error: [{ msg: 'Wrong credentials' }] });

        // send jwt 
        let token = user.getAuthToken();
        console.log("token", token);
        res.send({ token: token })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sever error!')
    }

}

export default login