import React, { useState } from 'react'
import ColorContainer from './ColorContainer/ColorContainer'
import ColoredSleeves from './ColoredSleeves/ColoredSleeves'
import OneLine from './OneLine/OneLine'
import PlainJersey from './PlainJersey/PlainJersey'
import VerticalStripes from './VerticalStripes/VerticalStripes'

const JerseyGenerator = () => {
    const colors = ['#DC2626', '#06B6D4', '#FFFFFF', '#1e293b', '#facc15', '#34d399', '#1e40af', '#7c3aed']
    const textColors = ['#FFFFFF', '#1e293b']
    const [mainColor, setMainColor] = useState(colors[0])
    const [secondaryColor, setSecondaryColor] = useState(colors[1])
    const [textColor, setTextColor] = useState(textColors[0])
    const [lastName, setLastName] = useState('alvarez')
    const [number, setNumber] = useState('0')


    const [jerseyStyle, setJerseyStyle] = useState('coloredSleeves')
    const jerseyMapper = {
        plainJersey: <PlainJersey mainColor={mainColor} secondaryColor={secondaryColor} />,
        coloredSleeves: <ColoredSleeves mainColor={mainColor} secondaryColor={secondaryColor} />,
        oneLine: <OneLine mainColor={mainColor} secondaryColor={secondaryColor} />,
        verticalStripes: <VerticalStripes mainColor={mainColor} secondaryColor={secondaryColor} />
    }

    return (
        <>
            <div className='relative w-[355px]'>
                <p className=' text-center w-full font-jersey absolute top-[60px] text-[40px] ' style={{ color: textColor }}>{lastName}</p>
                <p className=' text-center w-full font-jersey absolute top-[70px] text-[180px] ' style={{ color: textColor }}>{number}</p>
                {jerseyMapper[jerseyStyle]}
            </div>
            <div className='flex flex-col gap-2 py-2'>
                <p className='m-0 font-medium'>Jersey Type</p>
                <div className='flex gap-2'>
                    {Object.keys(jerseyMapper).map(key =>
                        <div className={`bg-slate-100 h-12 w-12 rounded-md flex items-center justify-center  ${jerseyStyle === key ? 'outline outline-2 outline-gray-800 outline-offset-2' : ''}`}>
                            <div className='w-8'
                                onClick={() => setJerseyStyle(key)}> {jerseyMapper[key]}
                            </div>
                        </div>)}

                    {/*  <div className={"w-8"} onClick={() => setJerseyStyle(key)}>{jerseyMapper[key]}</div>)} */}
                </div>
            </div>
            <input type='text' onChange={(e) => setLastName(e.target.value)} />
            <input type='text' onChange={(e) => setNumber(e.target.value)} />
            <ColorContainer title={'Main Color'} colors={colors} selectedColor={mainColor} setColor={setMainColor} />
            <ColorContainer title={'Secondary Color'} colors={colors} selectedColor={secondaryColor} setColor={setSecondaryColor} />
            <ColorContainer title={'Text Color'} colors={textColors} selectedColor={textColor} setColor={setTextColor} />
        </>
    )
}

export default JerseyGenerator