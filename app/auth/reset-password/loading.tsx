export default function Loading() {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex space-x-3">
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-[0ms]"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-[150ms]"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-[300ms]"></span>
        </div>
      </div>
    );
  }
  