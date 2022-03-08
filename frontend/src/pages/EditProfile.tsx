import { Box, Button, Link, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { updateUserProfile } from '../api/user-service';
import { Email } from '../components/form-fields/Email';
import { FirstName } from '../components/form-fields/FirstName';
import { LastName } from '../components/form-fields/LastName';
import { Password } from '../components/form-fields/Password';
import { IUser } from '../types/user';


const validationSchema = yup.object({
    firstName: yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),

});

type TProps = {
    userProfile: IUser
}
function EditProfile(props: TProps) {
    const [editProfileStatus, setEditProfileStatus] = useState(false)

    const { firstName, lastName, email, password } = props.userProfile

    const handleSubmit = (values: any, { setSubmitting }: any) => {
        console.log("Updating profile----");

        updateUserProfile(values)
            .then(() => {
                console.log("Registeration Succes")
                setEditProfileStatus(true)
                setSubmitting(false);
            })

    }
    return (
        <>
            <h1>Edit Profile Info</h1>
            {editProfileStatus && <Typography >Your profile updated Successfully</Typography >}

            <Formik
                initialValues={{ firstName, lastName, email, password }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <FirstName />
                        <LastName />
                        <Email />
                        <Password />

                        <Button type='submit' variant="contained" color="primary">
                            Update
                        </Button>

                        <Box>
                            <Link>Change Password</Link>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )

}

export default EditProfile