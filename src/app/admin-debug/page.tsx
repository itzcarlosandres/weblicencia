import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'

export default async function AdminDebugPage() {
    const session = await getServerSession(authOptions)

    return (
        <div className="p-20 text-white bg-black min-h-screen">
            <h1 className="text-2xl mb-4">Debug Session</h1>
            <pre className="bg-white/5 p-4 rounded">
                {JSON.stringify(session, null, 2)}
            </pre>
            <div className="mt-8">
                <a href="/admin" className="p-4 bg-accent text-black font-bold rounded">
                    Forzar Ir a Admin
                </a>
            </div>
        </div>
    )
}
