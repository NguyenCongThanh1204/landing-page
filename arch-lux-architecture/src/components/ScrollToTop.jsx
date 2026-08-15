import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    const previousPath = previousPathRef.current;
    const currentPath = pathname;

    if (previousPath && previousPath !== currentPath) {
      sessionStorage.setItem(`scroll:${previousPath}`, String(window.scrollY || 0));
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    }

    previousPathRef.current = currentPath;
  }, [pathname]);

  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(`scroll:${pathname}`, String(window.scrollY || 0));
    };

    saveScroll();
    window.addEventListener('scroll', saveScroll, { passive: true });

    return () => {
      saveScroll();
      window.removeEventListener('scroll', saveScroll);
    };
  }, [pathname]);

  useEffect(() => {
    let running = false;

    const toggleVisibility = () => {
      if (!running) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 300;
          setIsVisible((prev) => {
            if (prev !== shouldShow) return shouldShow;
            return prev;
          });
          running = false;
        });
        running = true;
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 bg-[#0F172A] text-white border border-white/20 rounded-full shadow-2xl hover:bg-[#EB323A] hover:border-[#EB323A] transition-all duration-300 group focus:outline-none cursor-pointer"
        >
          <ArrowUp
            size={20}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}