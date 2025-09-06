
import React, { useState } from 'react';
import { DEFAULT_SETTINGS } from '../../constants';
import Card from '../common/Card';
import Button from '../common/Button';
import { useI18n } from '../../i18n';

interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const { t } = useI18n();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{t('settings.title')}</h1>

      <Card>
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('settings.header')}</h2>
        <p className="text-sm text-gray-400 mb-6">{t('settings.description')}</p>
        
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label htmlFor="freezeTemp" className="font-medium text-gray-300">{t('settings.freezeTemp')}</label>
                <input
                    type="number"
                    id="freezeTemp"
                    name="freezeTemp"
                    value={settings.freezeTemp}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label htmlFor="dryTemp" className="font-medium text-gray-300">{t('settings.dryTemp')}</label>
                <input
                    type="number"
                    id="dryTemp"
                    name="dryTemp"
                    value={settings.dryTemp}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label htmlFor="mTorr" className="font-medium text-gray-300">{t('settings.pressure')}</label>
                <input
                    type="number"
                    id="mTorr"
                    name="mTorr"
                    value={settings.mTorr}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label htmlFor="extraDryTime" className="font-medium text-gray-300">{t('settings.extraDryTime')}</label>
                <input
                    type="number"
                    id="extraDryTime"
                    name="extraDryTime"
                    value={settings.extraDryTime}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setSettings(DEFAULT_SETTINGS)}>{t('common.reset')}</Button>
            <Button variant="primary">{t('common.save')}</Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsScreen;
