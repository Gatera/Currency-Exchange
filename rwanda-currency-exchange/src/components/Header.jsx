import React from 'react'

function Header() {
  return (
    <header className='bg-gray-200 py-4 shadow-lg font-montserrat'>
            <div className='container mx-auto flex justify-between items-center'>
              <img src="/media/RCE-Logo.png" alt="Rwanda Currency Exchange Logo" />
              <button className='block md:hidden'>
                <img src="../media/menu-icon.png" alt="Menu" className='w-6' />
              </button>
              <nav className='hidden md:flex font-bold'>
                <ul className='flex space-x-4 text-gray-700'>
                  <li>Home</li>
                </ul>
              </nav>
            </div>
    </header>
  )
}

export default Header