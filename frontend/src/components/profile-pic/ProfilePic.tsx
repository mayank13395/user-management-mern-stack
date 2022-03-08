import {
  Avatar, Box, Button, CircularProgress, Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { updateProfileImage } from '../../api/user-service'
import DefaultAvatarImage from '../../assets/avatar.png'

type TProps = {
    photo: string
}
function ProfilePic({ photo }: TProps) {
  const [profilePhoto, setProfilePhoto] = useState(photo)
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState<any>('')

  console.log('profilePhoto:-', profilePhoto)

  const [imageFile, setImageFile] = useState(null)

  const handleChooseFile = (e: any) => {
    const [file] = e.target.files
    if (file) {
      setImageFile(file)
      console.log(file)
    }
  }

  const handleImageUpload = async () => {
    // call api to add to database and s3
    setLoading(true)
    setUploadError('')
    const formData: any = new FormData()
    formData.append('image', imageFile)
    console.log('Image to save in databse:-', imageFile)

    try {
      const res:any = await updateProfileImage(formData)
      console.log('Response after successful profile pic upload:-', res)

      if (!res.data?.success) {
        const errorMessage:string = res.data?.errors?.detail
        throw new Error(errorMessage)
      }
      setProfilePhoto(res?.data?.user?.photo)
      setLoading(false)
    } catch (err:any) {
      console.log('Error While uploading profile image', err?.message, typeof err)
      setLoading(false)
      setUploadError(err?.message)
    }
  }

  return (
    <>
      {uploadError && <Typography color="error">{uploadError}</Typography>}
      {loading && <CircularProgress />}

      <Box m={4} display="flex" justifyContent="center">
        <Avatar src={profilePhoto || DefaultAvatarImage} />
        <Button type="submit" variant="contained" color="primary">
          <input type="file" accept="image/*" onChange={handleChooseFile} multiple={false} />
        </Button>
        <Box ml={3}>
          <Button disabled={!imageFile} onClick={handleImageUpload} variant="contained" color="primary">
            Upload
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ProfilePic
