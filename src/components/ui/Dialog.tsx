import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className="dialog" aria-labelledby={id} onCancel={e => { e.preventDefault(); onClose(); }}>
    <div className="dialog-header"><h2 id={id}>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Fechar janela"><X size={20} /></button></div>
    <div className="dialog-content">{children}</div>
  </dialog>;
}

