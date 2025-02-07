import React from 'react'
import tyler from 'src/app/components/PhotoIDCard/tyler.png'

//todo
//1.round a card corner 
// 2. จัดtextฝั่งขวาปรับขนาดฟ้อน 
// 3.  เส้น______ ทำให้เป็นเส้นดีๆ
const PhotoIDCard = () => {
  return (
    <div className='bg-amber-200'> 
        <div className='flex w-3/4 bg-lime-400 gap-3 m-auto ' >
            <div className='w-1/4'>
                <img src = {tyler.src} className='w-full h-4/5 m-4' />
            </div>
            <div className='w-3/4 m-4'>
                <div className='flex'> 
                    <div className='w-3/4'>
                        <p>name___________</p>
                    </div>
                    <div className='w-1/4'>
                        <img src = {tyler.src} className='w-full h-auto'/>
                    </div>
                </div>
                <div>
                    <p>date of birth________</p>
                    <p>hobby_______</p>
                    <p>spirit animal_________</p>
                </div>
            </div>
        </div>
        <div className='flex gap-2 bg-lime-400 w-3/4 m-auto'>
            <div className='m-2'>
                Date of issue ________
            </div>
            <div className='m-2'>
                <div>
                    ____________
                </div>
                <div>
                    signature
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default PhotoIDCard