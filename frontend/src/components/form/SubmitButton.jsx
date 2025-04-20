export const SubmitButton = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-3 rounded-full
                       font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-indigo-500 transition-colors hover-scale"
        {...props}
    >
      {children}
    </button>
  );
};
