export const EmailComponent = ({ email }) => {
  <div className="mb-4">
    <input
      type="email"
      value={email}
      readOnly
      className="w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-700 cursor-not-allowed"
      placeholder="Email"
    />
  </div>;
};
