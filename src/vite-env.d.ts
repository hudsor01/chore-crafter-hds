
/// <reference types="vite/client" />

// Extend the Window interface to include our custom property
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt(): Promise<void>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

interface WindowEventMap {
  beforeinstallprompt: BeforeInstallPromptEvent;
}

interface Window {
  deferredPrompt: BeforeInstallPromptEvent | null;
}
