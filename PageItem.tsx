import React, { useRef } from 'react';
import type { Page, PageIconType } from './types'; 
import { EllipsisVerticalIcon, InformationCircleIcon, DocumentIcon, CheckCircleIcon } from './icons'; 

interface PageItemProps {
  page: Page;
  iconType: PageIconType; 
  isActive: boolean;
  isDragged: boolean;
  onSelect: (id: string) => void;
  onDragStart: (id: string, event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  onOpenContextMenu: (pageId: string, buttonRef: React.RefObject<HTMLButtonElement>, event: React.MouseEvent) => void;
}

const PageItem: React.FC<PageItemProps> = ({
  page,
  iconType,
  isActive,
  isDragged,
  onSelect,
  onDragStart,
  onDragEnd,
  onOpenContextMenu,
}) => {
  const contextMenuButtonRef = useRef<HTMLButtonElement>(null);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', page.id);
    onDragStart(page.id, event);
  };

  let IconComponent;
  switch (iconType) {
    case 'info':
      IconComponent = InformationCircleIcon;
      break;
    case 'ending':
      IconComponent = CheckCircleIcon;
      break;
    case 'document':
    default:
      IconComponent = DocumentIcon;
      break;
  }

  // Base classes for the PageItem container
  const baseItemClasses = "flex items-center px-3 py-2 h-10 rounded-md cursor-grab transition-all duration-150 ease-in-out group flex-shrink-0 border";
  
  // Classes for active state
  const activeItemClasses = "bg-white text-slate-800 shadow-sm border-[#2F72E2]";
  
  // Classes for inactive state (using arbitrary values for hex with alpha)
  const inactiveItemClasses = "bg-[#9DA4B226] text-slate-600 hover:bg-[#9DA4B259] hover:text-slate-700 border-transparent";
  
  // Classes for when the item is being dragged
  const draggedItemClasses = "opacity-50 scale-95 shadow-lg";

  // Base classes for the icon
  const baseIconClasses = "w-5 h-5 mr-2";
  const activeIconClasses = "text-yellow-500"; 
  const inactiveIconClasses = "text-slate-500 group-hover:text-slate-600";

  // Base classes for the ellipsis button
  const baseEllipsisClasses = "ml-2 p-1 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100";
  const activeEllipsisClasses = "text-slate-500 hover:bg-slate-200";
  const inactiveEllipsisClasses = "text-slate-400 hover:bg-slate-300/40 group-hover:text-slate-600";

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className={`
        ${baseItemClasses}
        ${isActive ? activeItemClasses : inactiveItemClasses}
        ${isDragged ? draggedItemClasses : 'opacity-100'}
      `}
      onClick={() => onSelect(page.id)}
      data-testid={`page-item-${page.id}`}
      role="button"
      aria-pressed={isActive}
      tabIndex={0} 
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(page.id); }}
    >
      <IconComponent 
        className={`
          ${baseIconClasses}
          ${isActive ? activeIconClasses : inactiveIconClasses}
        `}
      />
      <span className="font-medium text-sm truncate select-none">{page.name}</span>
      <button
        ref={contextMenuButtonRef}
        data-context-menu-trigger="true"
        onClick={(e) => {
          e.stopPropagation(); 
          if (contextMenuButtonRef.current) { 
             onOpenContextMenu(page.id, contextMenuButtonRef, e);
          }
        }}
        className={`
          ${baseEllipsisClasses}
          ${isActive ? activeEllipsisClasses : inactiveEllipsisClasses}
        `}
        aria-label={`Options for ${page.name}`}
      >
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PageItem;
