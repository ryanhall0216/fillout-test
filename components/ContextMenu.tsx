
import React, { useRef, useEffect } from 'react';
import { PencilIcon, DocumentDuplicateIcon, TrashIcon, FlagIcon, CopyIcon } from '../icons'; // Added FlagIcon

interface ContextMenuProps {
  pageId: string;
  position: { x: number; y: number };
  onSetAsFirstPage: (pageId: string) => void;
  onRename: (pageId: string) => void;
  onCopy: (pageId: string) => void; // Prop for "Copy" item
  onDuplicateActual: (pageId: string) => void; // New prop for "Duplicate" item
  onDelete: (pageId: string) => void;
  onClose: () => void;
  triggerButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  pageId,
  position,
  onSetAsFirstPage,
  onRename,
  onCopy,
  onDuplicateActual,
  onDelete,
  onClose,
  triggerButtonRef,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerButtonRef.current && 
        !triggerButtonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose, triggerButtonRef]);

  const handleAction = (action: () => void) => {
    action();
    onClose(); 
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white shadow-xl rounded-md pt-0 w-48 border border-slate-200 text-black"
      style={{ top: position.y, left: position.x }}
      data-testid={`context-menu-${pageId}`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={`page-item-${pageId}-options-button`} 
    >
      <div className="px-4 py-2 mb-1 border-b border-slate-200 bg-[#FAFBFC]">
        <h3 className="text-sm font-semibold text-slate-800">Settings</h3>
      </div>
      <button
        onClick={() => handleAction(() => onSetAsFirstPage(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
      >
        <FlagIcon className="w-4 h-4 mr-2 text-blue-600" /> Set as first page
      </button>
      <button
        onClick={() => handleAction(() => onRename(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem"
      >
        <PencilIcon /> Rename
      </button>
      <button
        onClick={() => handleAction(() => onCopy(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem"
      >
        <CopyIcon /> Copy
      </button>
      <button
        onClick={() => handleAction(() => onDuplicateActual(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem"
      >
        <DocumentDuplicateIcon /> Duplicate
      </button>
      <div className="flex justify-center my-1">
        <hr className="w-[90%] border-t border-slate-300" />
      </div>
      <button
        onClick={() => handleAction(() => onDelete(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center transition-colors"
        role="menuitem"
      >
        <TrashIcon /> Delete
      </button>
    </div>
  );
};

export default ContextMenu;
