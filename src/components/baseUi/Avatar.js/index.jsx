import React from 'react'
import PropTypes from 'prop-types'
import AvatarRaw from 'avataaars'
import './index.less'



function Avatar(props) {
    const { option = {}, size = 'small' } = props;
    const style = {}
    
    switch (size) {
        case 'small':
            style.width = '50px'
            break;
        case 'large':
            style.width = '100px'
            break;
        case 'minuteness':
            style.width = '40px'
            break;
        default:
            style.width = '50px'
            break;
    }

    return (
        <div className="c-atr" style={style}>
            <AvatarRaw 
            avatarStyle={option.AvatarStyle}
            topType= {option.Top}
            accessoriesType= {option.Accessories}
            hairColor= {option.HairColor}
            facialHairType={option.FacialHair}
            facialHairColor= {option.FacialHairColor}
            clotheType= {option.Cloth}
            clotheColor= {option.ClothColor}
            eyeType= {option.Eyes}
            eyebrowType= {option.Eyebrow}
            mouthType= {option.Mouth}
            skinColor= {option.Skin} 
            graphicType={option.GraphicType}
            />
        </div>
    )
}

Avatar.propTypes = {
    option: PropTypes.object,
    small: PropTypes.string,
}

export default Avatar

