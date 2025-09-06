
import { Recipe, RecipeStep } from './types';

export const DEFAULT_RECIPES: Recipe[] = [
  {
    id: 'rec_default_1',
    name: "Standard Bubble Hash Cycle",
    description: "A balanced cycle for most bubble hash, based on Harvest Right standards.",
    steps: [
      { id: 'step1', name: 'Freezing', temperature: -30, pressure: 500, duration: 120 },
      { id: 'step2', name: 'Initial Dry', temperature: -10, pressure: 500, duration: 360 },
      { id: 'step3', name: 'Main Dry', temperature: 4, pressure: 500, duration: 480 },
      { id: 'step4', name: 'Final Dry', temperature: 15, pressure: 500, duration: 240 },
    ],
  },
  {
    id: 'rec_default_2',
    name: "Cold & Low Temp Cycle",
    description: "Preserves terpenes with a colder, longer drying process.",
    steps: [
      { id: 'step1', name: 'Deep Freeze', temperature: -35, pressure: 500, duration: 180 },
      { id: 'step2', name: 'Sub-Zero Dry', temperature: -15, pressure: 400, duration: 480 },
      { id: 'step3', name: 'Cold Dry', temperature: 0, pressure: 400, duration: 600 },
      { id: 'step4', name: 'Ramp to Finish', temperature: 10, pressure: 600, duration: 120 },
    ],
  },
];

export const DEFAULT_SETTINGS = {
  freezeTemp: -30,
  dryTemp: 4,
  mTorr: 500,
  extraDryTime: 120, // minutes
};

export const TRAY_TYPES = [
  "Standard Stainless Steel",
  "Silicone Lined",
  "Perforated",
  "Small Batch Tray"
];