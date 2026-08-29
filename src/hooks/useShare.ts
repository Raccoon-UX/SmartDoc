import { useState } from 'react';
import { useToast } from '../components/ui/Toast';

export interface ShareOptions {
  title: string;
  text: string;
  url?: string;
}

export function useShare() {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  const share = async ({ title, text, url = window.location.href }: ShareOptions) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        showToast({
          type: 'success',
          title: 'Shared successfully',
          description: 'Document requirements link has been shared.',
        });
        return;
      } catch (err: any) {
        // Ignore user cancel
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setIsCopied(true);
      showToast({
        type: 'success',
        title: 'Link Copied to Clipboard!',
        description: 'You can now paste and share this requirements page.',
      });

      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      showToast({
        type: 'error',
        title: 'Could not copy link',
        description: 'Please copy the URL directly from your browser bar.',
      });
    }
  };

  return { share, isCopied };
}
