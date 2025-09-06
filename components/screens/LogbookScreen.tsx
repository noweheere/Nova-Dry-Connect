
import React from 'react';
import { Batch } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import Icon from '../common/Icon';

interface LogbookScreenProps {
  batches: Batch[];
}

const LogbookScreen: React.FC<LogbookScreenProps> = ({ batches }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Batch Logbook</h1>
        <Button>
          <Icon path="M12 4.5v15m7.5-7.5h-15" className="h-5 w-5" />
          <span>Add Manual Entry</span>
        </Button>
      </div>

      {batches.length === 0 ? (
        <Card className="text-center text-gray-400 py-12">
            <Icon path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-lg font-medium text-white">No Batches Logged</h3>
            <p className="mt-1 text-sm">Completed processes will appear here.</p>
        </Card>
      ) : (
        <Card>
          <ul className="divide-y divide-gray-700">
            {batches.map((batch) => (
              <li key={batch.id} className="py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                        <p className="text-lg font-bold text-white">{batch.name}</p>
                        <p className="text-sm text-gray-400">
                            Ran on {new Date(batch.startTime).toLocaleDateString()} with "{batch.recipe.name}"
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm w-full md:w-auto md:flex-shrink-0 md:max-w-2xl">
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                            <p className="text-gray-300 font-medium">Quantity</p>
                            <p className="text-white">{batch.quantity} g</p>
                        </div>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                            <p className="text-gray-300 font-medium">Sieves</p>
                            <p className="text-white truncate">{batch.washInfo.sievesUsed.join(', ')}</p>
                        </div>
                         <div className="bg-gray-700/50 p-3 rounded-lg">
                            <p className="text-gray-300 font-medium">Wash Cycles</p>
                            <p className="text-white">{batch.washInfo.washCycles}</p>
                        </div>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                            <p className="text-gray-300 font-medium">Tray Type</p>
                            <p className="text-white">{batch.trayType}</p>
                        </div>
                    </div>
                </div>
                 <div className="mt-4">
                     <p className="text-sm text-gray-300 font-medium">Notes:</p>
                     <p className="text-sm text-gray-400 italic bg-gray-900/50 p-2 rounded-md">{batch.notes || "No notes for this batch."}</p>
                 </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default LogbookScreen;