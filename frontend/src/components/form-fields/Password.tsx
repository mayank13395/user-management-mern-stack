import { FormControl, TextField } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'
import React from 'react'

export default function Password() {
  console.log('Password Component')

  const name = 'password'
  const [field] = useField(name)
  const { errors, touched }: any = useFormikContext()

  return (
    <FormControl fullWidth margin="dense">
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        {...field}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
      />
    </FormControl>
  )
}
