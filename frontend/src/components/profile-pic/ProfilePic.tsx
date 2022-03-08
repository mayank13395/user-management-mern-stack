import { Avatar, Box, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { updateProfileImage } from '../../api/user-service';
import DefaultAvatarImage from '../../assets/avatar.png';

type TProps = {
    photo: string
}
function ProfilePic({ photo }: TProps) {

    const [profilePhoto, setProfilePhoto] = useState(photo)

    console.log("profilePhoto:-", profilePhoto);


    const [imageFile, setImageFile] = useState(null)


    const handleChooseFile = (e: any) => {
        const [file] = e.target.files;
        if (file) {
            setImageFile(file)
            console.log(file);
        }
    };

    const handleImageUpload = () => {
        // call api to add to database and s3
        const formData: any = new FormData()
        formData.append('image', imageFile)
        console.log("Image to save in databse:-", imageFile);

        updateProfileImage(formData)
            .then((res) => {
                console.log("Response after successful profile pic upload:-", res);
                setProfilePhoto(res.data.user.photo)
            })
    }

    return (
        <Box m={4} display={'flex'} justifyContent={'center'}>
            <Avatar src={profilePhoto ? profilePhoto : DefaultAvatarImage} />
            <Button type='submit' variant="contained" color="primary">
                <input type="file" accept="image/*" onChange={handleChooseFile} multiple={false} />
            </Button>
            <Box ml={3}>
                <Button disabled={!imageFile} onClick={handleImageUpload} variant="contained" color="primary">
                    Upload
                </Button>
            </Box>
            {/* <Link onClick={handleImageUpload}>{photo ? 'Change Profile image' : 'Add Profile image'}</Link> */}
        </Box>
    )
}

export default ProfilePic