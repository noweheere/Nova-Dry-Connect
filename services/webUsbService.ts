import { DryerStatus, ProcessState, Recipe, DeviceService } from '../types';

type StatusCallback = (status: DryerStatus) => void;

class MockDeviceService implements DeviceService {
  private status: DryerStatus;
  private statusCallback: StatusCallback | null = null;
  private intervalId: number | null = null;
  private totalDuration = 0;
  private stepStartTime = 0;

  constructor() {
    this.status = {
      isConnected: false,
      currentStepIndex: -1,
      currentTemperature: 20,
      currentPressure: 760000, // Atmospheric pressure in mTorr
      elapsedTime: 0,
      processState: ProcessState.IDLE,
      activeRecipe: null,
    };
  }

  onStatusUpdate(callback: StatusCallback) {
    this.statusCallback = callback;
  }

  onData(callback: (data: string) => void) {
    // No raw data in mock mode
  }

  connect(): Promise<void> {
    return new Promise((resolve) => {
      console.log("Starting Mock/Demo connection...");
      // Fix: Use window.setTimeout to be explicit about using the browser API.
      window.setTimeout(() => {
        this.status.isConnected = true;
        this.notifyStatus();
        console.log("Demo connection established.");
        resolve();
      }, 500);
    });
  }

  disconnect(): Promise<void> {
    return new Promise((resolve) => {
      this.stopProcess();
      this.status.isConnected = false;
      console.log("Demo connection closed.");
      this.notifyStatus();
      resolve();
    });
  }

  startProcess(recipe: Recipe): void {
    if (!this.status.isConnected || this.status.processState === ProcessState.RUNNING) {
      return;
    }
    console.log(`Starting mock process with recipe: ${recipe.name}`);
    this.status.activeRecipe = recipe;
    this.status.processState = ProcessState.RUNNING;
    this.status.currentStepIndex = 0;
    this.status.elapsedTime = 0;
    this.stepStartTime = 0;
    this.totalDuration = recipe.steps.reduce((sum, step) => sum + step.duration * 60, 0);

    // Fix: Use window.clearInterval to match window.setInterval.
    if (this.intervalId) window.clearInterval(this.intervalId);

    // Fix: Use window.setInterval to avoid type conflict with Node.js's setInterval which returns a Timeout object instead of a number.
    this.intervalId = window.setInterval(() => {
      this.updateSimulation();
    }, 1000);
  }

  pauseProcess(): void {
    if (this.status.processState === ProcessState.RUNNING) {
      this.status.processState = ProcessState.PAUSED;
      console.log("Mock process paused.");
      if (this.intervalId) {
        // Fix: Use window.clearInterval to match window.setInterval.
        window.clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.notifyStatus();
    }
  }

  resumeProcess(): void {
    if (this.status.processState === ProcessState.PAUSED) {
      this.status.processState = ProcessState.RUNNING;
      console.log("Mock process resumed.");
      // Fix: Use window.setInterval to avoid type conflict with Node.js's setInterval.
      this.intervalId = window.setInterval(() => {
        this.updateSimulation();
      }, 1000);
    }
  }
  
  stopProcess(): void {
    if (this.intervalId) {
      // Fix: Use window.clearInterval to match window.setInterval.
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.status.processState = ProcessState.IDLE;
    this.status.currentStepIndex = -1;
    this.status.activeRecipe = null;
    this.status.elapsedTime = 0;
    console.log("Mock process stopped.");
    this.notifyStatus();
  }

  async sendData(data: string): Promise<void> {
    console.log(`[MOCK] Sending data: ${data}`);
  }

  private updateSimulation(): void {
    if (!this.status.activeRecipe) return;

    this.status.elapsedTime++;
    const currentStep = this.status.activeRecipe.steps[this.status.currentStepIndex];
    
    this.status.currentTemperature = this.approachValue(this.status.currentTemperature, currentStep.temperature, 0.5);
    this.status.currentPressure = this.approachValue(this.status.currentPressure, currentStep.pressure, 5000);
    
    const stepElapsedTime = this.status.elapsedTime - this.stepStartTime;
    if (stepElapsedTime >= currentStep.duration * 60) {
      if (this.status.currentStepIndex < this.status.activeRecipe.steps.length - 1) {
        this.status.currentStepIndex++;
        this.stepStartTime = this.status.elapsedTime;
        console.log(`Moving to mock step: ${this.status.activeRecipe.steps[this.status.currentStepIndex].name}`);
      } else {
        this.finishProcess();
      }
    }
    this.notifyStatus();
  }

  private finishProcess(): void {
    // Fix: Use window.clearInterval to match window.setInterval.
    if (this.intervalId) window.clearInterval(this.intervalId);
    this.intervalId = null;
    this.status.processState = ProcessState.FINISHED;
    console.log("Mock process finished.");
    this.notifyStatus();
    // Fix: Use window.setTimeout to be explicit about using the browser API.
    window.setTimeout(() => {
        if(this.status.processState === ProcessState.FINISHED) {
            this.stopProcess();
        }
    }, 5000);
  }

  private approachValue(current: number, target: number, rate: number): number {
    const diff = target - current;
    if (Math.abs(diff) < rate) {
        return target;
    }
    return current + Math.sign(diff) * rate;
  }

  private notifyStatus(): void {
    if (this.statusCallback) {
      this.statusCallback({ ...this.status });
    }
  }
}

export const mockDeviceService = new MockDeviceService();
