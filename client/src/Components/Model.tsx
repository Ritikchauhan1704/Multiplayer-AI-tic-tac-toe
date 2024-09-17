interface ModalProps {
  message: string;
  onRestart: () => void;
}
export function Modal({message, onRestart}: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">{message}</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={onRestart}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}
