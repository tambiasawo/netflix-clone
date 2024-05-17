import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'

const SocialRow = () => {
  return (
    <div className="flex space-x-4 items-center">
      <FacebookIcon fontSize="large" className="cursor-pointer " />
      <TwitterIcon fontSize="large" className="cursor-pointer " />
      <InstagramIcon fontSize="large" className="cursor-pointer " />
      <YouTubeIcon fontSize="large" className="cursor-pointer " />
    </div>
  )
}

export default SocialRow
