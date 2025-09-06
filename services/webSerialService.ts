
import { DryerStatus, ProcessState, Recipe, DeviceService } from '../types';

// Fix: Add minimal type definition for SerialPort to satisfy TypeScript and resolve "Cannot find name 'SerialPort'".
// In a real project, you would use @types/w3c-web-serial or a global .d.ts file.
interface SerialPort {
  readonly readable: ReadableStream<Uint8Array> | null;
  readonly writable: WritableStream<Uint8Array> | null;
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
}

type StatusCallback = (status: DryerStatus) => void;
type DataCallback = (data: string) => void;

class WebSerialService implements DeviceService {
  private port: SerialPort | null = null;
  private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  // Fix: The writer for Web Serial API works with Uint8Array, not strings.
  private writer: WritableStreamDefaultWriter<Uint8Array> | null = null;
  
  private status: DryerStatus;
  private statusCallback: StatusCallback | null = null;
  private dataCallback: DataCallback | null = null;

  private keepReading = false;
  private textEncoder = new TextEncoder();
  private textDecoder = new TextDecoder();

  constructor() {
    this.status = {
      isConnected: false,
      currentStepIndex: -1,
      currentTemperature: 20,
      currentPressure: 760000,
      elapsedTime: 0,
      processState: ProcessState.IDLE,
      activeRecipe: null,
    };
  }

  onStatusUpdate(callback: StatusCallback) {
    this.statusCallback = callback;
  }
  
  onData(callback: DataCallback) {
    this.dataCallback = callback;
  }

  async connect(): Promise<void> {
    if (!("serial" in navigator)) {
      alert("Web Serial API not supported in this browser. Please use Chrome or Edge.");
      throw new Error("Web Serial API not supported.");
    }
    try {
      // Fix: Cast navigator to 'any' to access the Web Serial API and resolve "Property 'requestPort' does not exist on type 'unknown'".
      this.port = await (navigator as any).serial.requestPort();
      await this.port.open({ baudRate: 115200 }); // Common baud rate, adjust if needed

      this.writer = this.port.writable?.getWriter();
      
      this.status.isConnected = true;
      this.notifyStatus();
      this.dataCallback?.("\r\n--- Serial Port Connected ---\r\n");

      this.keepReading = true;
      this.readLoop();
    } catch (error) {
      console.error("Error connecting to serial port:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.dataCallback?.(`\r\n--- Connection Failed: ${errorMessage} ---\r\n`);
    }
  }

  async disconnect(): Promise<void> {
    this.keepReading = false;
    
    if (this.reader) {
      try {
        await this.reader.cancel();
      } catch (error) {
        console.warn("Error cancelling reader:", error);
      }
    }

    if (this.writer) {
       try {
        await this.writer.close();
      } catch (error) {
        console.warn("Error closing writer:", error);
      }
    }

    if (this.port) {
      try {
        await this.port.close();
      } catch (error) {
        console.warn("Error closing port:", error);
      }
    }

    this.port = null;
    this.status.isConnected = false;
    this.notifyStatus();
    this.dataCallback?.("\r\n--- Serial Port Disconnected ---\r\n");
  }
  
  private async readLoop(): Promise<void> {
    if (!this.port?.readable) return;

    while (this.port.readable && this.keepReading) {
        this.reader = this.port.readable.getReader();
        try {
            while (true) {
                const { value, done } = await this.reader.read();
                if (done) {
                    break;
                }
                const text = this.textDecoder.decode(value);
                this.dataCallback?.(text);
                this.parseIncomingData(text);
            }
        } catch (error) {
            console.error("Read loop error:", error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.dataCallback?.(`\r\n--- Read Error: ${errorMessage} ---\r\n`);
        } finally {
            this.reader.releaseLock();
        }
    }
  }
  
  private parseIncomingData(text: string) {
    // This is a placeholder for a real protocol.
    // Assumes device sends status updates as JSON strings on new lines.
    try {
        const lines = text.split(/[\r\n]+/).filter(line => line.trim().startsWith('{'));
        for (const line of lines) {
            const data = JSON.parse(line);
            if (data.type === 'status' && data.payload) {
                this.status = { ...this.status, ...data.payload, isConnected: true };
                this.notifyStatus();
            }
        }
    } catch (e) {
        // Not JSON, just raw data. Ignore for status updates.
    }
  }

  async sendData(data: string): Promise<void> {
    if (!this.writer) {
        console.warn("Writer not available. Cannot send data.");
        return;
    }
    try {
        // Fix: Use textEncoder to convert the string to Uint8Array before sending.
        await this.writer.write(this.textEncoder.encode(data));
    } catch (error) {
        console.error("Error writing to serial port:", error);
    }
  }
  
  private sendCommand(command: object): void {
      this.sendData(JSON.stringify(command) + '\n');
  }

  startProcess(recipe: Recipe): void {
    this.sendCommand({ command: 'start', recipe });
  }

  pauseProcess(): void {
    this.sendCommand({ command: 'pause' });
  }

  resumeProcess(): void {
    this.sendCommand({ command: 'resume' });
  }

  stopProcess(): void {
    this.sendCommand({ command: 'stop' });
  }

  private notifyStatus(): void {
    if (this.statusCallback) {
      this.statusCallback({ ...this.status });
    }
  }
}

export const webSerialService = new WebSerialService();