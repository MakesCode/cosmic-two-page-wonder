import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <div>
    <h1 className='text-red-500'>Bienvenue sur l’admin (SSR)</h1>
    <div className="bg-blue-500">
      <h2 className='text-blue-500'>Bienvenue sur l’admin (SSR)</h2>
    </div>
    <div className="bg-green-500">
      <h2 className='text-green-500'>Bienvenue sur l’admin (SSR)</h2>
    </div>
    <div className="bg-yellow-500">
      <h2 className='text-yellow-500'>Bienvenue sur l’admin (SSR)</h2>
    </div>
    <div className="bg-purple-500">
      <h2 className='text-purple-500'>Bienvenue sur l’admin (SSR)</h2>
    </div>
    <div className="bg-pink-500">
      <h2 className='text-pink-500'>Bienvenue sur l’admin (SSR)</h2>
    </div>
    </div>,
})

