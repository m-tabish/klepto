import React, { useState, useEffect } from 'react';
import type { InspectorMode, InspectorStatus, TechStack } from '../shared/types';
import { STACK_DISPLAY_NAMES } from '../shared/types';
import { MSG, type ExtensionMessage } from '../shared/messages';
import { ModeToggle } from './components/ModeToggle';

const INCLUDE_SCREENSHOT_STORAGE_KEY = 'includeScreenshot';

export function Popup() {
  const [mode, setMode] = useState<InspectorMode>('component');
  const [status, setStatus] = useState<InspectorStatus>('ready');
  const [stack, setStack] = useState<TechStack | null>(null);
  const [lastCopy, setLastCopy] = useState<{ tag: string; size: number } | null>(null);
  const [includeScreenshot, setIncludeScreenshot] = useState<boolean>(true);

  useEffect(() => {
    // Wipe stale slider preference (one-shot migration).
    chrome.storage.local.remove('captureContextLevel', () => {
      void chrome.runtime.lastError;
    });

    chrome.storage.local.get(INCLUDE_SCREENSHOT_STORAGE_KEY, (result) => {
      void chrome.runtime.lastError;
      const saved = result?.[INCLUDE_SCREENSHOT_STORAGE_KEY];
      if (typeof saved === 'boolean') {
        setIncludeScreenshot(saved);
      }
    });

    // Detect tech stack immediately on popup open
    chrome.runtime.sendMessage({ type: MSG.DETECT_STACK }, (response) => {
      void chrome.runtime.lastError;
      if (response?.stack) {
        setStack(response.stack as TechStack);
      }
    });

    const listener = (message: ExtensionMessage) => {
      console.log('[Klepto] Popup received message:', message.type);
      if (message.type === MSG.STATUS_UPDATE) {
        setStatus(message.status);
        if (message.stack) setStack(message.stack as TechStack);
      } else if (message.type === MSG.EXTRACTION_COMPLETE) {
        setStatus('copied');
        setLastCopy({ tag: message.meta.tag, size: message.meta.size });
        setStack(message.meta.stack as TechStack);
        setTimeout(() => setStatus('inspecting'), 2000);
      }
    };
    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  async function sendToActiveTab(msg: ExtensionMessage) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;
    try {
      await chrome.tabs.sendMessage(tab.id, msg);
    } catch {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['src/content/index.ts'],
      });
      await chrome.tabs.sendMessage(tab.id, msg);
    }
  }


  function handleStart() {
    console.log('[Klepto] User action: start, mode:', mode, 'includeScreenshot:', includeScreenshot);
    sendToActiveTab({ type: MSG.ACTIVATE_INSPECTOR, mode, includeScreenshot });
    setStatus('inspecting');
    window.close();
  }

  function handleStop() {
    console.log('[Klepto] User action: stop');
    sendToActiveTab({ type: MSG.DEACTIVATE_INSPECTOR });
    setStatus('ready');
  }

  function handleScreenshotToggle(next: boolean) {
    setIncludeScreenshot(next);
    chrome.storage.local.set({ [INCLUDE_SCREENSHOT_STORAGE_KEY]: next }, () => {
      void chrome.runtime.lastError;
    });
  }

  const isInspecting = status === 'inspecting';

  const statusConfig: Record<InspectorStatus, { text: string; color: string }> = {
    ready: { text: '$ ready', color: 'border border-Klepto-border bg-white/[0.03] text-Klepto-muted' },
    inspecting: { text: '$ inspecting...', color: 'border border-Klepto-primary/40 bg-Klepto-primary/10 text-Klepto-primary shadow-glow-primary' },
    copied: { text: '$ copied!', color: 'border border-[#5EBD3E]/40 bg-[#5EBD3E]/10 text-[#5EBD3E]' },
    error: { text: '$ error', color: 'border border-Klepto-error/40 bg-Klepto-error/10 text-Klepto-error' },
  };

  const { text: statusText, color: statusColor } = statusConfig[status];

  return (
    <div className="p-4 space-y-3.5 bg-Klepto-bg font-mono" style={{ minWidth: 320 }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={chrome.runtime.getURL('icons/icon-128.png')}
            alt="Klepto"
            className="w-5 h-5 object-contain"
          />
          <h1 className="text-sm font-semibold tracking-tight text-Klepto-text lowercase">klepto</h1>
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${statusColor}`}>
          {statusText}
        </span>
      </div>

      <div className="dashed-separator" />

      {/* Tech stack */}
      {stack && (
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-Klepto-dim">detected:</span>
          <span className="text-[10px] font-medium px-2 py-0.5 border border-dashed border-Klepto-accent/30 bg-Klepto-accent/10 text-Klepto-accent rounded-sm">
            {STACK_DISPLAY_NAMES[stack]}
          </span>
        </div>
      )}

      {/* Mode toggle */}
      <ModeToggle mode={mode} onChange={setMode} disabled={isInspecting} />

      {/* Screenshot toggle */}
      <label className="flex items-center justify-between gap-2 text-[11px] text-Klepto-muted cursor-pointer select-none">
        <span>capture screenshot</span>
        <input
          type="checkbox"
          checked={includeScreenshot}
          onChange={(e) => handleScreenshotToggle(e.target.checked)}
          disabled={isInspecting}
        />
      </label>

      {/* Instructions */}
      <p className="text-[11px] leading-relaxed text-Klepto-dim">
        {mode === 'component'
          ? 'hover over elements to highlight them. click to copy. use arrow keys to navigate.'
          : 'captures the full visible page content.'}
      </p>

      {/* Copy feedback */}
      {lastCopy && status === 'copied' && (
        <div className="text-[11px] text-[#5EBD3E] animate-fade-in font-medium">
          <span className="text-Klepto-dim">$</span> extracted &lt;{lastCopy.tag}&gt;. Use in-page buttons to copy
        </div>
      )}

      {/* Action button */}
      {isInspecting ? (
        <button
          onClick={handleStop}
          className="w-full py-2.5 px-4 text-xs font-medium border border-Klepto-error/40 bg-Klepto-error/10 text-Klepto-error hover:bg-Klepto-error/20 hover:border-Klepto-error/60 transition-all duration-150 rounded"
        >
          $ stop inspecting
        </button>
      ) : (
        <button
          onClick={handleStart}
          className="w-full py-2.5 px-4 text-xs font-medium border border-Klepto-border text-Klepto-text hover:shadow-glow-primary hover:border-Klepto-border-hover transition-all duration-200 rounded"
          style={{
            backgroundImage: 'radial-gradient(200px 80px at 16% 50%, rgba(255, 185, 0, 0.16), transparent 78%), linear-gradient(#1c1c20, #141416)',
          }}
        >
          <span className="text-Klepto-primary mr-1.5">$</span>
          start inspecting
        </button>
      )}

      {/* Footer */}
      <div className="dashed-separator" />
      <div className="text-center">
        <span className="text-[9px] text-Klepto-dim">
          v{chrome.runtime.getManifest().version}
        </span>
      </div>
    </div>
  );
}
