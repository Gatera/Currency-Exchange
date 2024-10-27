import React from 'react'

function Footer() {
  return (
    <footer className='bg-blue-600 text-white py-6 h-52'>
        <div className='container mx-auto text-center'>
          {/* Logo Image */}
            <img src="/media/RCE-Logo-white.png" alt="Rwanda Currency Exchange Logo" className='w-24 mx-auto mb-6 mt-2' />
        <p>&copy; 2024 RCE</p>
        </div>
    </footer>
  )
}

export default Footer