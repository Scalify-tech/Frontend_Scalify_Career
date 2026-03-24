export default function Toast({ toast }) {
  const { show, message, type } = toast;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[1100] bg-s2 border border-border rounded-r px-[18px] py-[13px] text-[13px] font-medium shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out pointer-events-none
        ${show ? 'translate-x-0 translate-y-0 opacity-100' : 'translate-x-4 translate-y-2 opacity-0'}
        ${type === 'ok' ? 'border-l-[3px] border-l-green-500' : ''}
        ${type === 'err' ? 'border-l-[3px] border-l-red-500' : ''}
      `}
    >
      {message}
    </div>
  );
}
