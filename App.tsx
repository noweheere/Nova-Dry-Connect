
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import DashboardScreen from './components/screens/DashboardScreen';
import RecipesScreen from './components/screens/RecipesScreen';
import LogbookScreen from './components/screens/LogbookScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import GuideScreen from './components/screens/GuideScreen';
import TerminalScreen from './components/screens/TerminalScreen';
import ConnectionModal from './components/ConnectionModal';
import { AppScreen, Batch, DryerStatus, ProcessState, Recipe, ConnectionType, DeviceService } from './types';
import { mockDeviceService } from './services/webUsbService';
import { webSerialService } from './services/webSerialService';
import { DEFAULT_RECIPES } from './constants';
import { useI18n } from './i18n';

const App: React.FC = () => {
  const { t } = useI18n();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard');
  const [recipes, setRecipes] = useState<Recipe[]>(DEFAULT_RECIPES);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const deviceService = useRef<DeviceService | null>(null);

  const [dryerStatus, setDryerStatus] = useState<DryerStatus>({
    isConnected: false,
    currentStepIndex: -1,
    currentTemperature: 20,
    currentPressure: 760000,
    elapsedTime: 0,
    processState: ProcessState.IDLE,
    activeRecipe: null,
  });

  useEffect(() => {
      // This effect logs a batch when a process finishes
      if(dryerStatus.processState === ProcessState.FINISHED && dryerStatus.activeRecipe) {
         // Check if a batch for this run hasn't been created already
         const alreadyLogged = batches.some(b => 
            new Date(b.endTime).getTime() > Date.now() - 10000
         );

         if (!alreadyLogged) {
            const newBatch: Batch = {
                id: `batch_${Date.now()}`,
                name: `${dryerStatus.activeRecipe.name} Run`,
                quantity: Math.round(Math.random() * 20 + 5), // Random quantity
                recipe: dryerStatus.activeRecipe,
                startTime: new Date(Date.now() - dryerStatus.elapsedTime * 1000).toISOString(),
                endTime: new Date().toISOString(),
                washInfo: {
                    iceAmount: 5,
                    washDuration: 10,
                    sievesUsed: ['120u', '73u', '25u'],
                    washCycles: 3
                },
                trayType: "Standard Stainless Steel",
                notes: "Grinded with microplane, spread thin."
            };
            setBatches(prev => [newBatch, ...prev]);
            setCurrentScreen('logbook');
         }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dryerStatus.processState]);

  const setupService = useCallback((service: DeviceService) => {
    deviceService.current = service;
    service.onStatusUpdate(setDryerStatus);
    service.connect().catch(err => {
        console.error("Failed to connect service", err);
        // Reset to disconnected state on failure
        setDryerStatus(prev => ({...prev, isConnected: false}));
    });
  }, []);

  const handleSelectConnection = useCallback((type: ConnectionType) => {
    setIsConnectionModalOpen(false);
    if (type === 'serial') {
      setupService(webSerialService);
    } else if (type === 'mock') {
      setupService(mockDeviceService);
    }
  }, [setupService]);

  const handleConnect = useCallback(() => {
    setIsConnectionModalOpen(true);
  }, []);

  const handleDisconnect = useCallback(() => {
    deviceService.current?.disconnect();
  }, []);
  
  const handleStartProcess = useCallback((recipe: Recipe) => {
    if (dryerStatus.isConnected && dryerStatus.processState === ProcessState.IDLE) {
      deviceService.current?.startProcess(recipe);
      setCurrentScreen('dashboard');
    } else {
        alert(t('app.connectFirstWarning'));
    }
  }, [dryerStatus.isConnected, dryerStatus.processState, t]);

  const handlePauseProcess = useCallback(() => deviceService.current?.pauseProcess(), []);
  const handleResumeProcess = useCallback(() => deviceService.current?.resumeProcess(), []);
  const handleStopProcess = useCallback(() => deviceService.current?.stopProcess(), []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen dryerStatus={dryerStatus} lastBatch={batches[0] || null} onPause={handlePauseProcess} onResume={handleResumeProcess} onStop={handleStopProcess} />;
      case 'recipes':
        return <RecipesScreen recipes={recipes} onStartProcess={handleStartProcess} dryerStatus={dryerStatus} />;
      case 'logbook':
        return <LogbookScreen batches={batches} />;
      case 'terminal':
        return <TerminalScreen deviceService={deviceService.current} dryerStatus={dryerStatus} />;
      case 'settings':
        return <SettingsScreen />;
      case 'guide':
        return <GuideScreen />;
      default:
        return <DashboardScreen dryerStatus={dryerStatus} lastBatch={batches[0] || null} onPause={handlePauseProcess} onResume={handleResumeProcess} onStop={handleStopProcess} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        dryerStatus={dryerStatus}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderScreen()}
      </main>
      <ConnectionModal
        isOpen={isConnectionModalOpen}
        onClose={() => setIsConnectionModalOpen(false)}
        onSelectConnection={handleSelectConnection}
      />
    </div>
  );
};

export default App;
