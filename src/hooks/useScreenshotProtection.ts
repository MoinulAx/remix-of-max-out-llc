import { useEffect } from 'react';

export const useScreenshotProtection = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent screenshot shortcuts
      if (
        (e.ctrlKey && e.shiftKey && e.key === 'S') || // Chrome DevTools
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // DevTools
        (e.ctrlKey && e.shiftKey && e.key === 'J') || // Console
        (e.ctrlKey && e.key === 's') || // Save page
        (e.ctrlKey && e.key === 'a') || // Select all
        (e.ctrlKey && e.key === 'p') || // Print
        (e.ctrlKey && e.key === 'c') || // Copy
        (e.ctrlKey && e.key === 'v') || // Paste
        (e.ctrlKey && e.key === 'u') || // View source
        e.key === 'F12' || // DevTools
        e.key === 'PrintScreen' || // Print screen
        (e.altKey && e.key === 'PrintScreen') // Alt + Print screen
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = () => {
      return false;
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);

    // Disable F12 and other dev tools
    const devToolsChecker = setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > 200 ||
        window.outerWidth - window.innerWidth > 200
      ) {
        document.body.style.display = 'none';
      } else {
        document.body.style.display = 'block';
      }
    }, 500);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      clearInterval(devToolsChecker);
    };
  }, []);
};