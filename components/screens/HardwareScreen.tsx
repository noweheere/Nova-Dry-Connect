
import React from 'react';
import Card from '../common/Card';
import { useI18n } from '../../i18n';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <pre className="bg-gray-900 rounded-lg p-4 mt-2 overflow-x-auto text-sm text-blue-300 font-mono">
    <code>{code.trim()}</code>
  </pre>
);

const HardwareScreen: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{t('hardware.title')}</h1>

      <Card>
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('hardware.intro.title')}</h2>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
          <p>{t('hardware.intro.p1')}</p>
          <p>{t('hardware.intro.p2')}</p>
          <CodeBlock code={t('hardware.intro.code')} />
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('hardware.detection.title')}</h2>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
          <p>{t('hardware.detection.p1')}</p>
          <p>{t('hardware.detection.p2')}</p>
          <CodeBlock code={t('hardware.detection.code')} />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('hardware.ftdi.title')}</h2>
          <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
            <p>{t('hardware.ftdi.p1')}</p>
            <h3 className="text-lg font-semibold text-white pt-2">{t('hardware.ftdi.codeTitle')}</h3>
            <CodeBlock code={t('hardware.ftdi.code')} />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('hardware.generic.title')}</h2>
          <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
            <p>{t('hardware.generic.p1')}</p>
            <p className="font-semibold">{t('hardware.generic.listTitle')}</p>
            <ul className="list-disc pl-5 font-mono text-xs">
              <li>{t('hardware.generic.vid1')}</li>
              <li>{t('hardware.generic.vid2')}</li>
            </ul>
            <h3 className="text-lg font-semibold text-white pt-2">{t('hardware.generic.codeTitle')}</h3>
            <CodeBlock code={t('hardware.generic.code')} />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('hardware.stlink.title')}</h2>
          <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
            <p>{t('hardware.stlink.p1')}</p>
            <p className="font-semibold">{t('hardware.stlink.listTitle')}</p>
            <ul className="list-disc pl-5 font-mono text-xs">
              <li>{t('hardware.stlink.pid1')}</li>
              <li>{t('hardware.stlink.pid2')}</li>
              <li>{t('hardware.stlink.pid3')}</li>
            </ul>
            <h3 className="text-lg font-semibold text-white pt-2">{t('hardware.stlink.codeTitle')}</h3>
            <CodeBlock code={t('hardware.stlink.code')} />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('hardware.buspirate.title')}</h2>
          <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
            <p>{t('hardware.buspirate.p1')}</p>
            <p className="font-semibold">{t('hardware.buspirate.listTitle')}</p>
            <p className="font-mono text-xs">{t('hardware.buspirate.vidpid')}</p>
            <h3 className="text-lg font-semibold text-white pt-2">{t('hardware.buspirate.codeTitle')}</h3>
            <CodeBlock code={t('hardware.buspirate.code')} />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('hardware.flipper.title')}</h2>
          <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
            <p>{t('hardware.flipper.p1')}</p>
            <p className="font-semibold">{t('hardware.flipper.listTitle')}</p>
            <p className="font-mono text-xs">{t('hardware.flipper.vidpid')}</p>
            <h3 className="text-lg font-semibold text-white pt-2">{t('hardware.flipper.codeTitle')}</h3>
            <CodeBlock code={t('hardware.flipper.code')} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HardwareScreen;
