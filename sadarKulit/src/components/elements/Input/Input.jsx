export default function Input({ type, placeholder, name }) {
  return (
    <div>
      <input
        type={type}
        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        placeholder={placeholder}
        name={name}
        id={name}
      />
    </div>
  );
}