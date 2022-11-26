import React from 'react'

const ColorContainer = ({ colors, title, setColor, selectedColor }) => {
    return (
        <div className='flex flex-col gap-2 py-2'>
            <p className='m-0 font-medium'>{title}</p>
            <div className='flex gap-2'>
                {colors.map(colorHex => <div className={`h-6 w-6 rounded-full ${selectedColor === colorHex ? 'outline outline-2 outline-gray-800  outline-offset-2' : ''}`} style={{ backgroundColor: colorHex }} onClick={() => setColor(colorHex)}></div>)}
            </div>
        </div>
    )
}

export default ColorContainer