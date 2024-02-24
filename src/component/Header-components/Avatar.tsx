import React from 'react'

import Avatar from './Avatar.svg'

const AvatarMenu: React.FC = () =>{
     return(
        <>
        <img className='avatar' src={Avatar} alt="avatar" />
        </>
     )
}

export default AvatarMenu