import React, { useState, useCallback, useRef } from 'react';
import type { Page, ContextMenuState } from '../types'; 
import { INITIAL_PAGES } from '../icons'; 
import PageNavigation from './PageNavigation'; 

const App: React.FC = () => {
  const [pages, setPages] = useState<Page[]>(INITIAL_PAGES);
  const [activePageId, setActivePageId] = useState<string | null>(
    INITIAL_PAGES.length > 0 ? INITIAL_PAGES[0].id : null
  );
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState | null>(null);
  const [draggedPageId, setDraggedPageId] = useState<string | null>(null);
  const [dragOverDropZoneIndex, setDragOverDropZoneIndex] = useState<number | null>(null);
  
  const lastOpenedContextMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectPage = useCallback((id: string) => {
    setActivePageId(id);
    setContextMenuState(null); 
  }, []);

  const handleAddPage = useCallback((index: number) => {
    let newPageName = "New Page";
    let counter = 1; 
    const existingNames = new Set(pages.map(p => p.name));
    
    if (existingNames.has(newPageName)) {
        newPageName = `New Page ${pages.length + 1}`; 
    }

    while (existingNames.has(newPageName)) {
      counter++;
      newPageName = `New Page ${pages.length + counter}`;
    }
    if (existingNames.has(newPageName)) newPageName = `Page ${self.crypto.randomUUID().substring(0,4)}`;


    const newPage: Page = { id: self.crypto.randomUUID(), name: newPageName };
    setPages(currentPages => {
      const newPages = [...currentPages];
      newPages.splice(index, 0, newPage);
      return newPages;
    });
    setActivePageId(newPage.id);
    setContextMenuState(null);
  }, [pages]);

  const handleDeletePage = useCallback((id: string) => {
    setPages(currentPages => {
      const pageIndexToDelete = currentPages.findIndex(page => page.id === id);
      const newPages = currentPages.filter(page => page.id !== id);
      if (activePageId === id) {
        if (newPages.length > 0) {
          const newActiveIndex = Math.max(0, pageIndexToDelete -1);
          setActivePageId(newPages[newActiveIndex]?.id || newPages[0]?.id || null);
        } else {
          setActivePageId(null);
        }
      }
      return newPages;
    });
    setContextMenuState(null);
  }, [activePageId]);

  const handleCopyPage = useCallback((id: string) => { // Renamed from handleDuplicatePage for clarity
    setPages(currentPages => {
      const pageToCopy = currentPages.find(page => page.id === id);
      if (!pageToCopy) return currentPages;
      
      let newPageName = `${pageToCopy.name} (Copy)`;
      let counter = 1;
      const existingNames = new Set(currentPages.map(p => p.name));
      while(existingNames.has(newPageName)) {
        counter++;
        newPageName = `${pageToCopy.name} (Copy ${counter})`;
      }

      const newPage: Page = { 
        ...pageToCopy, 
        id: self.crypto.randomUUID(),
        name: newPageName
      };
      
      const index = currentPages.findIndex(page => page.id === id);
      const newPages = [...currentPages];
      newPages.splice(index + 1, 0, newPage);
      setActivePageId(newPage.id); 
      return newPages;
    });
    setContextMenuState(null);
  }, []);

  const handleDuplicatePageActual = useCallback((id: string) => {
    setPages(currentPages => {
      const pageToDuplicate = currentPages.find(page => page.id === id);
      if (!pageToDuplicate) return currentPages;
      
      let newPageName = `${pageToDuplicate.name} (Duplicate)`;
      let counter = 1;
      const existingNames = new Set(currentPages.map(p => p.name));
      while(existingNames.has(newPageName)) {
        counter++;
        newPageName = `${pageToDuplicate.name} (Duplicate ${counter})`;
      }

      const newPage: Page = { 
        ...pageToDuplicate, 
        id: self.crypto.randomUUID(),
        name: newPageName
      };
      
      const index = currentPages.findIndex(page => page.id === id);
      const newPages = [...currentPages];
      newPages.splice(index + 1, 0, newPage);
      setActivePageId(newPage.id); 
      return newPages;
    });
    setContextMenuState(null);
  }, []);

  const handleRenamePage = useCallback((id: string, newName: string) => {
    setPages(currentPages => 
      currentPages.map(page => 
        page.id === id ? { ...page, name: newName } : page
      )
    );
    setContextMenuState(null);
  }, []);

  const handleSetAsFirstPage = useCallback((id: string) => {
    setPages(currentPages => {
      const pageToMove = currentPages.find(p => p.id === id);
      if (!pageToMove) return currentPages;

      const otherPages = currentPages.filter(p => p.id !== id);
      const newPages = [pageToMove, ...otherPages];
      setActivePageId(id); 
      return newPages;
    });
    setContextMenuState(null);
  }, []);

  const handleDragStartPage = useCallback((id: string, event: React.DragEvent<HTMLDivElement>) => {
    setDraggedPageId(id);
  }, []);

  const handleDragEndPage = useCallback(() => {
    setDraggedPageId(null);
    setDragOverDropZoneIndex(null);
  }, []);

  const handleMovePage = useCallback((draggedId: string, targetDropZoneLineIndex: number) => {
    setPages(currentPages => {
      const sourcePageIndex = currentPages.findIndex(p => p.id === draggedId);
      if (sourcePageIndex === -1) return currentPages;
  
      const newPages = [...currentPages];
      const [itemToMove] = newPages.splice(sourcePageIndex, 1);
  
      let actualInsertionIndex = targetDropZoneLineIndex;
      if (sourcePageIndex < targetDropZoneLineIndex) {
        actualInsertionIndex--;
      }
      
      actualInsertionIndex = Math.max(0, Math.min(newPages.length, actualInsertionIndex));
  
      newPages.splice(actualInsertionIndex, 0, itemToMove);
      return newPages;
    });
  }, []); 


  const handleDragOverDropZone = useCallback((index: number, event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); 
    if (draggedPageId) { 
        setDragOverDropZoneIndex(index);
    }
  }, [draggedPageId]);

  const handleDragLeaveDropZone = useCallback(() => {
    // Intentionally sparse
  }, []);


  const handleOpenContextMenu = useCallback((pageId: string, buttonRef: React.RefObject<HTMLButtonElement>, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      let xPosition = rect.left;
      const menuWidth = 192; 
      if (xPosition + menuWidth > window.innerWidth) {
        xPosition = window.innerWidth - menuWidth - 10; 
      }

      setContextMenuState({
        pageId,
        x: xPosition, 
        y: rect.bottom + 8, 
      });
      lastOpenedContextMenuButtonRef.current = buttonRef.current;
    }
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenuState(null);
  }, []);
  
  return (
    <div className="flex flex-col items-center min-h-screen pt-10 px-4 bg-[#444444]">
      <PageNavigation
        pages={pages}
        activePageId={activePageId}
        contextMenuState={contextMenuState}
        draggedPageId={draggedPageId}
        dragOverDropZoneIndex={dragOverDropZoneIndex}
        lastOpenedContextMenuButtonRef={lastOpenedContextMenuButtonRef} 
        onSelectPage={handleSelectPage}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
        onCopyPage={handleCopyPage} // Changed from onDuplicatePage
        onDuplicateActualPage={handleDuplicatePageActual} // New prop
        onRenamePage={handleRenamePage}
        onSetAsFirstPage={handleSetAsFirstPage} 
        onMovePage={handleMovePage}
        onDragStartPage={handleDragStartPage}
        onDragEndPage={handleDragEndPage}
        onDragOverDropZone={handleDragOverDropZone}
        onDragLeaveDropZone={handleDragLeaveDropZone}
        onOpenContextMenu={handleOpenContextMenu}
        onCloseContextMenu={handleCloseContextMenu}
      />
    </div>
  );
};

export default App;