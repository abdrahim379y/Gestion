import React from 'react'
import { useStateContext } from "../context/ContextProvider.jsx";
const Home = () => {
  const {user}= useStateContext()
  return (
  

  <div class="relative py-12 sm:py-16 lg:py-20 lg:pb-36">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto grid max-w-lg grid-cols-1 gap-y-12 lg:max-w-full lg:grid-cols-2 lg:items-center lg:gap-x-8">
        <div>
          <div class="text-center lg:text-left">
            <h1 class="max-w-md text-4xl font-bold leading-snug sm:text-5xl sm:leading-snug">
                        Hello : <br class="block sm:hidden" />
                        <span class="rounded-xl bg-purple-600 px-2 pb-2 text-white">{user.name}</span>
                    </h1>
            <div class="mt-8 flex flex-col items-center justify-center sm:flex-row sm:space-x-4 lg:justify-start">
              
            </div>
          </div>
        </div>

        <div class="relative bg-violet-100 lg:bg-transparent">
          <div class="absolute right-0 bottom-0 hidden overflow-hidden lg:inset-y-0 lg:block">
            
          </div>
          <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://demo.themesberg.com/landwind/images/hero.png" alt="hero image"/>
        </div>
        </div>
      </div>
    </div>
  </div>


  )
}

export default Home

