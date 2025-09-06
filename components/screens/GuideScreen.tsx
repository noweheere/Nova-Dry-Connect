
import React from 'react';
import Card from '../common/Card';
import { TRAY_TYPES } from '../../constants';
import { useI18n } from '../../i18n';

const GuideScreen: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{t('guide.title')}</h1>

      <Card>
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('guide.prep.title')}</h2>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
          <p>{t('guide.prep.p1')}</p>
          <ol className="list-decimal pl-5 space-y-2">
            {(t('guide.prep.steps', {}) as unknown as string[]).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('guide.trays.title')}</h2>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
            <p>{t('guide.trays.p1')}</p>
            <ul className="list-disc pl-5 space-y-2">
                {TRAY_TYPES.map(tray => <li key={tray}>{tray}</li>)}
            </ul>
            <p className="pt-2" dangerouslySetInnerHTML={{ __html: t('guide.trays.p2') }} />
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('guide.timer.title')}</h2>
        <div className="text-gray-300">
          <p>{t('guide.timer.p1')}</p>
          <p className="mt-2 text-sm text-gray-400">{t('guide.timer.p2')}</p>
        </div>
      </Card>
    </div>
  );
};

export default GuideScreen;
