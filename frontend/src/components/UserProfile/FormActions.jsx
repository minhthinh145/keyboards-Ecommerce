export const FormActions = ({ isSubmitting, onCancel, onSubmit }) => {
  return (
    <div className="flex justify-end space-x-4 mt-6">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200"
        disabled={isSubmitting}
      >
        Hủy
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? "Đang lưu..." : "Lưu"}
      </button>
    </div>
  );
};

