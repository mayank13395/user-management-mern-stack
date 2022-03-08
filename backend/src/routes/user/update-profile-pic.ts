import { UserModel } from '../../model/user.model'
import uploadToS3 from '../../utils/s3-image-upload'

const uploadSingle = uploadToS3.single('image')

const updateProfilePic = (req, res) => {
  // upload profile pic to s3
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: 'Image Upload Error',
          detail: err.message,
          error: err,
        },
      })
    }

    const update = { photo: req.file.location }

    // update url in the document database
    return UserModel.findByIdAndUpdate(req.user.id, update, { new: true })
      .then((user) => res.status(200).json({ success: true, user }))
      .catch((err) => res.status(400).json({ success: false, error: err }))
  })
}

export default updateProfilePic
