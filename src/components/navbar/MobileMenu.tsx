
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { MobileNavLinks } from './NavLinks';
import { MobileAuthSection } from './AuthSection';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  user: any;
  signOut: () => void;
}

const MobileMenuButton = memo(({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => (
  <div className="md:hidden">
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="p-2 hover:bg-slate-100 transition-colors duration-200"
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  </div>
));

MobileMenuButton.displayName = 'MobileMenuButton';

const MobileMenuContent = memo(({ user, signOut, onClose }: { user: any; signOut: () => void; onClose: () => void }) => (
  <div className="md:hidden mt-4 pb-4 border-t border-slate-200 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
    <MobileNavLinks user={user} onLinkClick={onClose} />
    <MobileAuthSection user={user} signOut={signOut} onClose={onClose} />
  </div>
));

MobileMenuContent.displayName = 'MobileMenuContent';

const MobileMenu = memo(({ isOpen, onToggle, user, signOut }: MobileMenuProps) => {
  return (
    <>
      <MobileMenuButton isOpen={isOpen} onToggle={onToggle} />
      {isOpen && (
        <MobileMenuContent 
          user={user} 
          signOut={signOut} 
          onClose={() => onToggle()} 
        />
      )}
    </>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
