
import React from 'react';
import { PlusIcon } from '../icons';

interface DropZoneProps {
  index: number;
  onDrop: (index: number) => void;
  onAddPageInZone?: (index: number) => void;
  isDragOver: boolean;
  isDraggingActive: boolean;
  canShowAddButton: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ 
  index, 
  onDrop, 
  onAddPageInZone, 
  isDragOver, 
  isDraggingActive,
  canShowAddButton
}) => {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onDrop(index);
  };

  const handleAddClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onAddPageInZone && !isDraggingActive) {
      onAddPageInZone(index);
    }
  };

  let widthClass: string;
  if (isDragOver) {
    widthClass = 'w-12';
  } else if (canShowAddButton) {
    widthClass = 'w-16'; 
  } else {
    widthClass = 'w-4';
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative flex-shrink-0 flex items-center justify-center transition-all duration-150 ease-in-out
        ${widthClass} 
        ${isDragOver ? 'bg-blue-500/10' : ''} 
        h-10`}
      data-testid={`drop-zone-${index}`}
      aria-hidden={!isDragOver && (!canShowAddButton || (isDraggingActive && !isDragOver)) ? true : undefined}
    >
      {isDragOver && (
        <div className="absolute inset-y-0 left-1/2 w-1 bg-blue-500 transform -translate-x-1/2 rounded-full" aria-hidden="true"></div>
      )}

      {!isDragOver && canShowAddButton && onAddPageInZone && (
        <div className="flex items-center justify-center w-full" aria-hidden="true">
          <div className="w-3 h-px border-t border-dotted border-gray-400" />
          <button
            onClick={handleAddClick}
            className={`p-1 mx-1 rounded-full text-slate-500 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${isDraggingActive ? 'opacity-50 cursor-default bg-slate-100' : 'bg-white hover:text-blue-600 hover:bg-blue-100 shadow-sm hover:shadow-md'}`}
            aria-label={`Add new page at position ${index}`}
            disabled={isDraggingActive}
          >
            <PlusIcon className="w-4 h-4 text-black" />
          </button>
          <div className="w-3 h-px border-t border-dotted border-gray-400" />
        </div>
      )}
    </div>
  );
};

export default DropZone;
