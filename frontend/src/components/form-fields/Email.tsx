import { FormControl, TextField } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'
import React from 'react'

export default function Email() {
  const name = 'email'
  const [field] = useField(name)
  const { errors, touched }: any = useFormikContext()

  return (
    <FormControl fullWidth margin="dense">
      <TextField
        label="Email"
        variant="outlined"
        id="email"
        type="email"
        {...field}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
      />
    </FormControl>
  )
}
