
export interface RecipeStep {
  id: string;
  name: string;
  temperature: number; // in Celsius
  pressure: number; // in mTorr
  duration: number; // in minutes
}

export interface Recipe {
  id: string;
  name:string;
  description: string;
  steps: RecipeStep[];
}

export interface WashInfo {
  iceAmount: number; // in kg
  washDuration: number; // in minutes
  sievesUsed: string[]; // e.g., ['120u', '73u', '25u']
  washCycles: number;
}

export interface Batch {
  id: string;
  name: string;
  quantity: number; // in grams
  recipe: Recipe;
  startTime: string;
  endTime: string;
  washInfo: WashInfo;
  trayType: string;
  notes: string;
  resultNotes?: string;
}

export enum ProcessState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  FINISHED = 'finished',
  ERROR = 'error',
}

export interface DryerStatus {
  isConnected: boolean;
  currentStepIndex: number;
  currentTemperature: number;
  currentPressure: number;
  elapsedTime: number; // in seconds
  processState: ProcessState;
  activeRecipe: Recipe | null;
}

export type AppScreen = 'dashboard' | 'recipes' | 'logbook' | 'settings' | 'guide' | 'terminal';

export type ConnectionType = 'mock' | 'serial';

export interface DeviceService {
  onStatusUpdate(callback: (status: DryerStatus) => void): void;
  onData(callback: (data: string) => void): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  startProcess(recipe: Recipe): void;
  pauseProcess(): void;
  resumeProcess(): void;
  stopProcess(): void;
  sendData(data: string): Promise<void>;
}

export type Language = 'en' | 'de' | 'es';
