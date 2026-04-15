export default function FormError({ message }) {
  if (!message) return null;

  const messages = Array.isArray(message) ? message : [message];

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
      {messages.map((msg, i) => (
        <p key={i} className="text-red-600 text-sm text-center">
          {msg}
        </p>
      ))}
    </div>
  );
}