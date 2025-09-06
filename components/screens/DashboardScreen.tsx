
import React from 'react';
import { DryerStatus, Batch } from '../../types';
import ProcessMonitor from '../ProcessMonitor';
import Card from '../common/Card';
import Icon from '../common/Icon';
import { useI18n } from '../../i18n';

interface DashboardScreenProps {
  dryerStatus: DryerStatus;
  lastBatch: Batch | null;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ dryerStatus, lastBatch, onPause, onResume, onStop }) => {
  const { t } = useI18n();

  const WelcomeMessage = () => (
      <div className="bg-gray-800/50 border border-blue-500/30 rounded-lg p-6 text-center">
          <Icon path="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" className="mx-auto h-12 w-12 text-blue-400" />
          <h1 className="mt-4 text-2xl font-bold text-white">{t('dashboard.welcomeTitle')}</h1>
          <p className="mt-2 text-lg text-gray-300">{t('dashboard.welcomeSubtitle')}</p>
          {!dryerStatus.isConnected && (
            <p className="mt-4 text-sm bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 rounded-md p-3">
                {t('dashboard.connectMessage')}
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
            <h3 className="text-xl font-semibold text-white mb-4">{t('dashboard.lastBatchTitle')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                    <p className="text-gray-400">{t('dashboard.name')}</p>
                    <p className="font-medium text-white">{lastBatch.name}</p>
                </div>
                <div>
                    <p className="text-gray-400">{t('dashboard.quantity')}</p>
                    <p className="font-medium text-white">{lastBatch.quantity} g</p>
                </div>
                <div>
                    <p className="text-gray-400">{t('dashboard.recipe')}</p>
                    <p className="font-medium text-white">{lastBatch.recipe.name}</p>
                </div>
                 <div>
                    <p className="text-gray-400">{t('dashboard.completedOn')}</p>
                    <p className="font-medium text-white">{new Date(lastBatch.endTime).toLocaleDateString()}</p>
                </div>
            </div>
         </Card>
      )}
    </div>
  );
};

export default DashboardScreen;
