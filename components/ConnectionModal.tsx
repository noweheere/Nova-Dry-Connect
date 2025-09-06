
import React from 'react';
import { ConnectionType } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import Icon from './common/Icon';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConnection: (type: ConnectionType) => void;
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({ isOpen, onClose, onSelectConnection }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <Card 
        className="w-full max-w-md border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Choose Connection Method</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
             <Icon path="M6 18L18 6M6 6l12 12" className="h-6 w-6" />
          </button>
        </div>
        
        <p className="text-gray-400 mb-6">Select how you want to connect to the NovaDry system.</p>

        <div className="space-y-4">
          <button
            onClick={() => onSelectConnection('serial')}
            className="w-full text-left p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-start space-x-4"
          >
            <Icon path="M10.5 6h9.75M10.5 12h9.75M10.5 18h9.75M3.75 6h.008v.008H3.75V6zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.008v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 6h.008v.008H3.75V18zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" className="h-8 w-8 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-white">Connect via Serial (RS-232)</h3>
              <p className="text-sm text-gray-300">Connect directly to your freeze dryer hardware using a USB-to-Serial adapter.</p>
            </div>
          </button>

          <button
            onClick={() => onSelectConnection('mock')}
            className="w-full text-left p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-start space-x-4"
          >
            <Icon path="M9.75 3.104v5.714a2.25 2.25 0 01-.5 1.586l-1.02 1.134a.75.75 0 01-1.06 0l-1.02-1.134a2.25 2.25 0 01-.5-1.586V3.104a2.25 2.25 0 014.5 0z" className="h-8 w-8 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-white">Use Demo Mode</h3>
              <p className="text-sm text-gray-300">Run a simulated process without any hardware. Ideal for testing and exploring the app.</p>
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ConnectionModal;
