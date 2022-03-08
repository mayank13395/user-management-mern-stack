import { Box, Button, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserProfile } from '../api/user-service'
import ProfilePic from '../components/profile-pic/ProfilePic'
import { IUser } from '../types/user'

type TProps = {
    user: IUser
    handleSetUser(user: IUser): void
}

function Dashboard({ user, handleSetUser }: TProps) {
  console.log('DashBoard Component:-', user)

  useEffect(() => {
    console.log('UseEffect called in Dashboard:-')

    getUserProfile()
      .then((res) => {
        console.log('User Data:-', res.data?.user)
        const user = res?.data?.user
        handleSetUser(user)
      })
  }, [])

  const history = useHistory()
  const editProfile = () => {
    history.push('/edit-profile')
  }

  return (

    <Box>
      <ProfilePic key={user?.photo} photo={user?.photo} />
      <Box>
        <Typography variant="h5">
          FirstName:
          {user.firstName}
        </Typography>
        <Typography variant="h5">
          LastName:
          {user.lastName}
        </Typography>
        <Typography variant="h5">
          Email:
          {user.email}
        </Typography>
      </Box>
      <Button onClick={editProfile} variant="contained" color="primary">
        Edit
      </Button>
    </Box>
  )
}

export default React.memo(Dashboard)
