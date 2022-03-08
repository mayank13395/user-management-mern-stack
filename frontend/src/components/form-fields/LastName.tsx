import { FormControl, TextField } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'
import React from 'react'


export const LastName = () => {
    const name = 'lastName'
    const [field] = useField(name)
    const { errors, touched }: any = useFormikContext()

    return (
        <FormControl fullWidth margin='dense'>
            <TextField label="LasttName" variant="outlined"
                id="lastName"
                type="text"
                {...field}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
            />
        </FormControl>
    )
}
