
import React from 'react';
import { DryerStatus, Batch } from '../../types';
import ProcessMonitor from '../ProcessMonitor';
import Card from '../common/Card';
import Icon from '../common/Icon';

interface DashboardScreenProps {
  dryerStatus: DryerStatus;
  lastBatch: Batch | null;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ dryerStatus, lastBatch, onPause, onResume, onStop }) => {
  
  const WelcomeMessage = () => (
      <div className="bg-gray-800/50 border border-blue-500/30 rounded-lg p-6 text-center">
          <Icon path="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" className="mx-auto h-12 w-12 text-blue-400" />
          <h1 className="mt-4 text-2xl font-bold text-white">Welcome to NovaDry Connect</h1>
          <p className="mt-2 text-lg text-gray-300">Your hub for precision freeze-drying.</p>
          {!dryerStatus.isConnected && (
            <p className="mt-4 text-sm bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 rounded-md p-3">
                Please connect to your NovaLabs Freeze Dryer to begin.
            </p>
          )}
      </div>
  );

  return (
    <div className="space-y-6">
      <WelcomeMessage />
      
      <ProcessMonitor
        dryerStatus={dryerStatus}
        onPause={onPause}
        onResume={onResume}
        onStop={onStop}
      />
      
      {lastBatch && (
         <Card>
            <h3 className="text-xl font-semibold text-white mb-4">Last Batch Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                    <p className="text-gray-400">Name</p>
                    <p className="font-medium text-white">{lastBatch.name}</p>
                </div>
                <div>
                    <p className="text-gray-400">Quantity</p>
                    <p className="font-medium text-white">{lastBatch.quantity} g</p>
                </div>
                <div>
                    <p className="text-gray-400">Recipe</p>
                    <p className="font-medium text-white">{lastBatch.recipe.name}</p>
                </div>
                 <div>
                    <p className="text-gray-400">Completed On</p>
                    <p className="font-medium text-white">{new Date(lastBatch.endTime).toLocaleDateString()}</p>
                </div>
            </div>
         </Card>
      )}
    </div>
  );
};

export default DashboardScreen;