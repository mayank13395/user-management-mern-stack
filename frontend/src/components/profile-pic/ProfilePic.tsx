import { Avatar, Box, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { updateProfileImage } from '../../api/user-service';
import DefaultAvatarImage from '../../assets/avatar.png';

type TProps = {
    photo: string
}
function ProfilePic({ photo }: TProps) {

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
        updateProfileImage(formData)
    }

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <Avatar src={photo ? photo : DefaultAvatarImage} />
            <Button type='submit' variant="contained" color="primary">
                <input type="file" accept="image/*" onChange={handleChooseFile} multiple={false} />
            </Button>
            <Button disabled={!imageFile} onClick={handleImageUpload} variant="contained" color="primary">
                Upload
            </Button>
            {/* <Link onClick={handleImageUpload}>{photo ? 'Change Profile image' : 'Add Profile image'}</Link> */}
        </Box>
    )
}

export default ProfilePic