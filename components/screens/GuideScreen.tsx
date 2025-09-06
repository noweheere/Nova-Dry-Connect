
import React from 'react';
import Card from '../common/Card';
import { TRAY_TYPES } from '../../constants';

const GuideScreen: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Guides & Information</h1>

      <Card>
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">Bubble Hash Preparation Guide</h2>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
          <p>Proper preparation is key to a successful freeze-dry. Follow these steps for optimal results:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Collect & Sieve:</strong> After washing, collect your hash from the different micron bags. Gently press out excess water.
            </li>
            <li>
              <strong>Microplane/Sieve:</strong> Freeze the collected hash patty solid. Once frozen, grate it into a fine powder using a microplane or push it through a stainless steel strainer. This dramatically increases surface area for even drying.
            </li>
            <li>
              <strong>Pre-freeze Trays:</strong> Place parchment paper on your freeze dryer trays and put them in a standard freezer to get them cold before loading the hash.
            </li>
            <li>
              <strong>Load Trays:</strong> Sprinkle the powdered hash evenly and thinly across the cold, parchment-lined trays. Avoid clumps and thick piles.
            </li>
            <li>
              <strong>Load into Dryer:</strong> Immediately transfer the loaded trays into the NovaLabs Freeze Dryer and begin your selected cycle.
            </li>
          </ol>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">Understanding Tray Types</h2>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
            <p>The type of tray you use can influence the drying process. Here are some common types:</p>
            <ul className="list-disc pl-5 space-y-2">
                {TRAY_TYPES.map(tray => <li key={tray}>{tray}</li>)}
            </ul>
            <p className="pt-2">For bubble hash, <strong>Standard Stainless Steel</strong> trays lined with parchment paper are the most common and effective choice. They provide excellent thermal conductivity.</p>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">Timer & Reminder</h2>
        <div className="text-gray-300">
          <p>Remember to set timers for your wash cycles to maintain consistency.</p>
          <p className="mt-2 text-sm text-gray-400">A dedicated timer feature will be added in a future update.</p>
        </div>
      </Card>
    </div>
  );
};

export default GuideScreen;