import { Disclosure } from '@headlessui/react'



export default function NavbarTop() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative text-white text-2xl font-bold flex h-16 items-center justify-center">

          Welcome To Draw and Solve

        </div>
      </div>
    </Disclosure>
  )
}