import { useState } from 'react'
import { useStore } from '../store/store'
import Layout from '../components/layout'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'

export default function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory, addToast } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deleteCategory_, setDeleteCategory_] = useState(null)
  const [categoryName, setCategoryName] = useState('')

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category)
      setCategoryName(category)
    } else {
      setEditingCategory(null)
      setCategoryName('')
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = categoryName.trim()
    
    if (!trimmedName) {
      addToast('Category name cannot be empty', 'error')
      return
    }

    // Check for duplicate category names (case-insensitive)
    if (!editingCategory && categories.some(cat => cat.toLowerCase() === trimmedName.toLowerCase())) {
      addToast('This category already exists', 'error')
      return
    }

    if (editingCategory) {
      updateCategory(editingCategory, trimmedName)
      addToast('Category updated successfully!', 'success')
    } else {
      addCategory(trimmedName)
      addToast('Category added successfully!', 'success')
    }
    setIsModalOpen(false)
  }

  const handleDelete = (category) => {
    deleteCategory(category)
    addToast('Category deleted successfully!', 'success')
    setDeleteCategory_(null)
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Categories</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your menu categories
            </p>
          </div>
          <button onClick={() => handleOpenModal()} className="btn btn-primary">
            <Plus size={20} /> Add Category
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <div key={category} className="card p-6 hover:shadow-soft-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-blue-600">{category}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteCategory_(category)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Click edit to rename or delete to remove
              </p>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="card p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No categories found</p>
            <button onClick={() => handleOpenModal()} className="btn btn-primary">
              <Plus size={20} /> Create First Category
            </button>
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          title={editingCategory ? 'Edit Category' : 'Add Category'}
          onClose={() => setIsModalOpen(false)}
          size="sm"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category Name *</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="input"
                placeholder="e.g., Burgers, Pizza, Salads"
                autoFocus
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingCategory ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={deleteCategory_ !== null}
          title="Delete Category"
          message={`Are you sure you want to delete the "${deleteCategory_}" category? This action cannot be undone.`}
          onConfirm={() => handleDelete(deleteCategory_)}
          onCancel={() => setDeleteCategory_(null)}
          confirmText="Delete"
        />
      </div>
    </Layout>
  )
}
