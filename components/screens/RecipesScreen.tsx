
import React from 'react';
import { Recipe, DryerStatus, ProcessState } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import Icon from '../common/Icon';

interface RecipesScreenProps {
  recipes: Recipe[];
  onStartProcess: (recipe: Recipe) => void;
  dryerStatus: DryerStatus;
}

const RecipesScreen: React.FC<RecipesScreenProps> = ({ recipes, onStartProcess, dryerStatus }) => {

  const canStartProcess = dryerStatus.isConnected && dryerStatus.processState === ProcessState.IDLE;

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
         <h1 className="text-3xl font-bold text-white">Recipes</h1>
         <Button>
            <Icon path="M12 4.5v15m7.5-7.5h-15" className="h-5 w-5" />
            <span>New Recipe</span>
         </Button>
       </div>

       {!dryerStatus.isConnected && (
            <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg" role="alert">
                <p className="font-bold">Device Disconnected</p>
                <p className="text-sm">Please connect to the dryer to start a process.</p>
            </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{recipe.name}</h2>
              <p className="text-gray-400 mt-1 text-sm">{recipe.description}</p>
              <div className="mt-4 border-t border-gray-700 pt-4 space-y-2">
                {recipe.steps.map((step, index) => (
                  <div key={step.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">
                      Step {index + 1}: {step.name}
                    </span>
                    <div className="text-right text-gray-400">
                      <div>{step.temperature}°C / {step.pressure} mTorr</div>
                      <div className="text-xs">{step.duration} min</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Button 
                variant="secondary"
                className="w-full mr-2"
              >
                <Icon path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" className="h-5 w-5"/>
                <span>Edit</span>
              </Button>
              <Button
                onClick={() => onStartProcess(recipe)}
                disabled={!canStartProcess}
                className="w-full ml-2"
                title={!canStartProcess ? 'Connect dryer to start' : ''}
              >
                <Icon path="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" className="h-5 w-5"/>
                <span>Start</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecipesScreen;
