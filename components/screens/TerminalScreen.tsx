import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { DeviceService, DryerStatus } from '../../types';
import Card from '../common/Card';
import Icon from '../common/Icon';

interface TerminalScreenProps {
  deviceService: DeviceService | null;
  dryerStatus: DryerStatus;
}

const TerminalScreen: React.FC<TerminalScreenProps> = ({ deviceService, dryerStatus }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const term = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (terminalRef.current && !term.current) {
      const xterm = new Terminal({
        cursorBlink: true,
        convertEol: true,
        theme: {
          background: '#1f2937', // gray-800
          foreground: '#d1d5db', // gray-300
          cursor: '#60a5fa',     // blue-400
        },
        fontSize: 14,
        fontFamily: 'monospace',
      });
      
      fitAddon.current = new FitAddon();
      xterm.loadAddon(fitAddon.current);
      
      xterm.open(terminalRef.current);
      fitAddon.current.fit();
      
      xterm.writeln('Welcome to the NovaDry Terminal.');
      xterm.writeln('Raw device data will appear here when connected.');
      xterm.writeln('');

      term.current = xterm;
      
      // Handle data from terminal input
      term.current.onData(data => {
        deviceService?.sendData(data);
      });
    }

    const onResize = () => {
        fitAddon.current?.fit();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      // Don't dispose terminal on unmount to preserve history
    };
  }, [deviceService]);
  
  // Effect for handling incoming data from the service
  useEffect(() => {
    if (!deviceService || !term.current) return;
    
    const dataHandler = (data: string) => {
        term.current?.write(data);
    };
    
    deviceService.onData(dataHandler);
    
    return () => {
        // Cleanup: Ideally the service would have an `offData` method
    };
  }, [deviceService]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Device Terminal</h1>
      {!dryerStatus.isConnected && (
         <Card className="text-center text-gray-400">
            <Icon path="M6.4 13.4L5 12l1.4-1.4M8.6 10.6L10 12l-1.4 1.4m.2-6.8H18M4.5 3.75v16.5h15V3.75h-15z" className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-lg font-medium text-white">Terminal Offline</h3>
            <p className="mt-1 text-sm">Connect to a device to see live data.</p>
        </Card>
      )}
      <Card className="!p-0 overflow-hidden">
        <div ref={terminalRef} style={{ height: '500px' }} />
      </Card>
    </div>
  );
};

export default TerminalScreen;