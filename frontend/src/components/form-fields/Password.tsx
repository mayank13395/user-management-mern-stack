import { FormControl, TextField } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'
import React from 'react'


export const Password = () => {
    const name = 'password'
    const [field] = useField(name)
    const { errors, touched }: any = useFormikContext()

    return (
        <FormControl fullWidth margin='dense'>
            <TextField label="Password" variant="outlined"
                id="password"
                type="password"
                {...field}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
            />
        </FormControl>
    )
}
