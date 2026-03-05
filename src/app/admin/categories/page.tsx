import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, Grid } from 'lucide-react'
import { deleteCategory } from '../actions'
import { CategoryForm } from '@/components/admin/category-form'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
    const categories = await (prisma as any).category.findMany({
        orderBy: { order: 'asc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-accent">
                        <Grid className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Gestión de Contenido</span>
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Categorías</h1>
                </div>

                <CategoryForm>
                    <Button className="bg-accent text-black hover:bg-white font-black uppercase tracking-widest text-[10px] px-6 h-12 rounded-xl shadow-lg shadow-accent/20 transition-all">
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva Categoría
                    </Button>
                </CategoryForm>
            </div>

            <div className="grid gap-4">
                {categories.length === 0 ? (
                    <div className="py-20 text-center border border-dashed border-white/10 rounded-[2rem]">
                        <p className="text-white/20 text-xs font-black uppercase tracking-widest">No hay categorías configuradas</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat) => (
                            <div key={cat.id} className="group relative">
                                <div className="absolute inset-0 bg-accent/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] flex items-center justify-between group-hover:bg-white/[0.04] transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                                            <Grid className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-white uppercase tracking-tight">{cat.name}</h3>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest">Relacionada con {cat._count?.products || 0} productos</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <CategoryForm category={cat}>
                                            <Button size="icon" variant="ghost" className="text-white/20 hover:text-white hover:bg-white/5 rounded-xl">
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                        </CategoryForm>

                                        <form action={deleteCategory.bind(null, cat.id)}>
                                            <Button size="icon" variant="ghost" type="submit" className="text-white/10 hover:text-red-500 hover:bg-red-500/5 rounded-xl">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
