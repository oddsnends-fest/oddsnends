import React from 'react'
import tyler from 'src/app/components/PhotoIDCard/tyler.png'

 
const PhotoIDCard = () => {
  return (
    <div> 
        <div className='flex w-4/5 bg-amber-200 gap-3 m-auto rounded-t-lg ' >
            <div className='w-1/3'>
                <img src = {tyler.src} className='w-full h-4/5 m-4' />
            </div>
            <div className='w-2/3 m-4'>
                <div className='flex '> 
                    <div className='w-3/4'>
                        <div className='flex items-baseline gap-2 mt-3'>
                            <p>Name</p>
                            <p className='flex-1 border-b border-black'>P'Fame</p>
                        </div>
                    </div>
                    <div className='w-1/4'>
                        <img src = {tyler.src} className='w-full h-auto'/>
                    </div>
                </div>
                <div>
                        <div className='flex items-baseline gap-2 mt-3'>
                            <p>Date of birth</p>
                            <p className='flex-1 border-b border-black'></p>
                        </div>
                        <div className='flex items-baseline gap-2 mt-3'>
                            <p>Hobby</p>
                            <div className='flex-1 border-b border-black'></div>
                        </div>
                        <div className='flex items-baseline gap-2 mt-3'>
                            <p>Spirit Animal</p>
                            <div className='flex-1 border-b border-black'></div>
                        </div>
                </div>
            </div>
        </div>
<div className="flex w-4/5 bg-amber-200 justify-between m-auto items-center rounded-b-lg">
  {/* Date of Issue Section */}
  <div className="flex items-center gap-2">
    <p>Date of issue</p>
    <div className="w-20 border-b border-black"></div>
  </div>

  {/* Signature Section */}
  <div className="flex flex-col items-center">
    <div className="w-32 border-b border-black"></div>
    <p className="text-sm">Signature</p>
  </div>
</div>

    </div>
  )
}  

export default PhotoIDCard