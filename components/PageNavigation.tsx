
import React from 'react';
import type { Page, ContextMenuState, PageIconType } from '../types';
import PageItem from './PageItem'; 
import DropZone from './DropZone';
import ContextMenu from './ContextMenu';
import { PlusIcon } from '../icons';

interface PageNavigationProps {
  pages: Page[];
  activePageId: string | null;
  contextMenuState: ContextMenuState | null;
  draggedPageId: string | null;
  dragOverDropZoneIndex: number | null;
  lastOpenedContextMenuButtonRef: React.RefObject<HTMLButtonElement | null>; 
  onSelectPage: (id: string) => void;
  onAddPage: (index: number) => void; 
  onDeletePage: (id: string) => void;
  onCopyPage: (id:string) => void; 
  onDuplicateActualPage: (id: string) => void;
  onRenamePage: (id: string, newName: string) => void; 
  onSetAsFirstPage: (id: string) => void; 
  onMovePage: (draggedId: string, targetIndex: number) => void;
  onDragStartPage: (id: string, event: React.DragEvent<HTMLDivElement>) => void;
  onDragEndPage: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOverDropZone: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeaveDropZone: () => void;
  onOpenContextMenu: (pageId: string, buttonRef: React.RefObject<HTMLButtonElement>, event: React.MouseEvent) => void;
  onCloseContextMenu: () => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  pages,
  activePageId,
  contextMenuState,
  draggedPageId,
  dragOverDropZoneIndex,
  lastOpenedContextMenuButtonRef,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onCopyPage,
  onDuplicateActualPage,
  onRenamePage,
  onSetAsFirstPage,
  onMovePage,
  onDragStartPage,
  onDragEndPage,
  onDragOverDropZone,
  onDragLeaveDropZone,
  onOpenContextMenu,
  onCloseContextMenu,
}) => {
  const handleDrop = (index: number) => {
    if (draggedPageId) {
      onMovePage(draggedPageId, index);
    }
  };

  const getPageIconType = (index: number, totalPages: number): PageIconType => {
    if (totalPages === 0) return 'document'; 
    if (index === 0) return 'info';
    if (index === totalPages - 1) return 'ending';
    return 'document';
  };

  return (
    <div className="w-full mx-auto">
      <div 
        className="flex items-center  bg-gray-100 p-2 shadow-md min-h-[68px] overflow-x-auto"
        role="toolbar"
        aria-label="Page navigation"
      >
        <DropZone
          index={0}
          onDrop={handleDrop}
          isDragOver={dragOverDropZoneIndex === 0 && draggedPageId !== null}
          isDraggingActive={draggedPageId !== null}
          canShowAddButton={false} 
        />
        {pages.map((page, index) => (
          <React.Fragment key={page.id}>
            <div 
              onDragOver={(e) => onDragOverDropZone(index, e)} 
              onDragLeave={onDragLeaveDropZone} 
              className="flex-shrink-0" // Ensure PageItem itself doesn't shrink
            >
              <PageItem
                page={page}
                iconType={getPageIconType(index, pages.length)}
                isActive={page.id === activePageId}
                isDragged={page.id === draggedPageId}
                onSelect={onSelectPage}
                onDragStart={onDragStartPage}
                onDragEnd={onDragEndPage}
                onOpenContextMenu={onOpenContextMenu}
              />
            </div>
            <DropZone
              index={index + 1}
              onDrop={handleDrop}
              onAddPageInZone={onAddPage} 
              isDragOver={dragOverDropZoneIndex === (index + 1) && draggedPageId !== null}
              isDraggingActive={draggedPageId !== null}
              canShowAddButton={index + 1 < pages.length} 
            />
          </React.Fragment>
        ))}
        {pages.length === 0 && (
          <DropZone
            index={0} 
            onDrop={handleDrop}
            onAddPageInZone={onAddPage}
            isDragOver={dragOverDropZoneIndex === 0 && draggedPageId !== null}
            isDraggingActive={draggedPageId !== null}
            canShowAddButton={true} 
          />
        )}
        <div className="w-6 h-px border-t border-dotted border-gray-400" />
         <button
            onClick={() => onAddPage(pages.length)} 
            className="flex items-center flex-shrink-0 ml-2 px-3 py-2 h-10 rounded-md text-sm hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 transition-colors border border-[#E1E1E1]"
            aria-label="Add new page to end"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add page
          </button>
      </div>

      {contextMenuState && (
        <ContextMenu
          pageId={contextMenuState.pageId}
          position={{ x: contextMenuState.x, y: contextMenuState.y }}
          onSetAsFirstPage={onSetAsFirstPage} 
          onRename={(id) => {
            const pageToRename = pages.find(p => p.id === id);
            const newName = prompt("Enter new page name:", pageToRename?.name || "");
            if (newName && newName.trim() !== "") onRenamePage(id, newName.trim());
          }}
          onCopy={onCopyPage} 
          onDuplicateActual={onDuplicateActualPage}
          onDelete={onDeletePage}
          onClose={onCloseContextMenu}
          triggerButtonRef={lastOpenedContextMenuButtonRef} 
        />
      )}
    </div>
  );
};

export default PageNavigation;
