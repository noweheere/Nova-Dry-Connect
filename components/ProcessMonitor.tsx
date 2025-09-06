
import React from 'react';
import { DryerStatus, ProcessState } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Icon from './common/Icon';
import { useI18n } from '../i18n';

interface ProcessMonitorProps {
  dryerStatus: DryerStatus;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const ProcessMonitor: React.FC<ProcessMonitorProps> = ({ dryerStatus, onPause, onResume, onStop }) => {
  const { t } = useI18n();
  const { processState, activeRecipe, currentStepIndex, currentTemperature, currentPressure, elapsedTime } = dryerStatus;

  const isRunning = processState === ProcessState.RUNNING || processState === ProcessState.PAUSED;
  const currentStep = activeRecipe && currentStepIndex !== -1 ? activeRecipe.steps[currentStepIndex] : null;

  if (!isRunning) {
    return (
       <Card>
         <div className="text-center text-gray-400">
            <Icon path="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-lg font-medium text-white">{t('processMonitor.systemIdle')}</h3>
            <p className="mt-1 text-sm">{t('processMonitor.startFromRecipes')}</p>
        </div>
      </Card>
    );
  }

  const stepProgress = currentStep ? ((elapsedTime - (activeRecipe?.steps.slice(0, currentStepIndex).reduce((acc, s) => acc + s.duration * 60, 0) || 0)) / (currentStep.duration * 60)) * 100 : 0;

  return (
    <Card className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">{activeRecipe?.name}</h2>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${processState === ProcessState.RUNNING ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
          {processState.toUpperCase()}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">{t('processMonitor.temperature')}</p>
          <p className="text-3xl font-bold text-blue-400">{currentTemperature.toFixed(1)} °C</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">{t('processMonitor.pressure')}</p>
          <p className="text-3xl font-bold text-purple-400">{Math.round(currentPressure)} mTorr</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">{t('processMonitor.elapsedTime')}</p>
          <p className="text-3xl font-bold text-gray-200">{formatTime(elapsedTime)}</p>
        </div>
      </div>
      
      {/* Current Step Progress */}
      {currentStep && (
        <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
                <span className="text-white">{t('common.step')} {currentStepIndex + 1}/{activeRecipe?.steps.length}: {currentStep.name}</span>
                <span className="text-gray-400">{t('common.target')}: {currentStep.temperature}°C / {currentStep.pressure} mTorr</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.min(stepProgress, 100)}%` }}></div>
            </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-4 pt-4">
        {processState === ProcessState.RUNNING ? (
          <Button variant="secondary" onClick={onPause}>
            <Icon path="M15.75 5.25v13.5m-6-13.5v13.5" className="h-5 w-5"/>
            <span>{t('common.pause')}</span>
          </Button>
        ) : (
          <Button variant="primary" onClick={onResume}>
            <Icon path="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" className="h-5 w-5"/>
            <span>{t('common.resume')}</span>
          </Button>
        )}
        <Button variant="danger" onClick={onStop}>
            <Icon path="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="h-5 w-5"/>
            <span>{t('common.stop')}</span>
        </Button>
      </div>

    </Card>
  );
};

export default ProcessMonitor;
