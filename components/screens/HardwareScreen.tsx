
import React from 'react';
import Card from '../common/Card';
import { useI18n } from '../../i18n';
import Button from '../common/Button';
import Icon from '../common/Icon';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <pre className="bg-gray-900 rounded-lg p-4 mt-2 overflow-x-auto text-sm text-blue-300 font-mono">
    <code>{code.trim()}</code>
  </pre>
);

const WiringDiagram: React.FC<{ diagram: string }> = ({ diagram }) => (
    <pre className="bg-gray-900 rounded-lg p-4 mt-2 text-xs text-gray-400 font-mono">
        <code>{diagram.trim()}</code>
    </pre>
);

interface DeviceCardProps {
    id: string;
    onTestConnection: (filters: {usbVendorId: number, usbProductId?: number}[]) => void;
}

const FTDI_Card: React.FC<DeviceCardProps> = ({ id, onTestConnection }) => {
    const { t } = useI18n();
    const filters = [{ usbVendorId: 0x0403 }];
    return (
        <Card>
            <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t(`${id}.title`)}</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
                <p>{t(`${id}.p1`)}</p>
                
                <h3 className="text-md font-semibold text-white pt-2">{t('hardware.common.wiringTitle')}</h3>
                <WiringDiagram diagram={t('hardware.common.wiringDiagram')} />

                <h3 className="text-md font-semibold text-white pt-2">{t('hardware.common.driversTitle')}</h3>
                <ul className="list-disc pl-5 text-sm">
                    <li><a href="https://ftdichip.com/drivers/vcp-drivers/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Windows</a></li>
                    <li><a href="https://ftdichip.com/drivers/vcp-drivers/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">macOS</a></li>
                    <li><a href="https://ftdichip.com/drivers/vcp-drivers/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Linux</a></li>
                </ul>

                <h3 className="text-lg font-semibold text-white pt-2">{t(`${id}.codeTitle`)}</h3>
                <CodeBlock code={t(`${id}.code`)} />
                <Button onClick={() => onTestConnection(filters)} className="mt-2 w-full">
                    <Icon path="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 9.563C9 9.254 9.254 9 9.563 9h4.874c.309 0 .563.254.563.563v4.874c0 .309-.254.563-.563.563H9.563A.563.563 0 019 14.437V9.563z" className="h-5 w-5" />
                    {t('hardware.common.testButton')}
                </Button>
            </div>
        </Card>
    );
};

const Generic_Card: React.FC<DeviceCardProps> = ({ id, onTestConnection }) => {
    const { t } = useI18n();
    const filters = [{ usbVendorId: 0x1A86 }, { usbVendorId: 0x10C4 }];
    return (
        <Card>
            <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t(`${id}.title`)}</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
                <p>{t(`${id}.p1`)}</p>
                <p className="font-semibold">{t(`${id}.listTitle`)}</p>
                <ul className="list-disc pl-5 font-mono text-xs">
                    <li>{t(`${id}.vid1`)}</li>
                    <li>{t(`${id}.vid2`)}</li>
                </ul>

                 <h3 className="text-md font-semibold text-white pt-2">{t('hardware.common.driversTitle')}</h3>
                <ul className="list-disc pl-5 text-sm">
                    <li>CH340: <a href="http://www.wch-ic.com/download/CH341SER_EXE.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Windows</a>, (usually built-in for macOS/Linux)</li>
                    <li>CP210x: <a href="https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Windows/macOS/Linux</a></li>
                </ul>

                <h3 className="text-lg font-semibold text-white pt-2">{t(`${id}.codeTitle`)}</h3>
                <CodeBlock code={t(`${id}.code`)} />
                 <Button onClick={() => onTestConnection(filters)} className="mt-2 w-full">
                    <Icon path="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 9.563C9 9.254 9.254 9 9.563 9h4.874c.309 0 .563.254.563.563v4.874c0 .309-.254.563-.563.563H9.563A.563.563 0 019 14.437V9.563z" className="h-5 w-5" />
                    {t('hardware.common.testButton')}
                </Button>
            </div>
        </Card>
    );
};

const STLink_Card: React.FC<DeviceCardProps> = ({ id, onTestConnection }) => {
    const { t } = useI18n();
    const filters = [
        { usbVendorId: 0x0483, usbProductId: 0x3748 }, { usbVendorId: 0x0483, usbProductId: 0x374B },
        { usbVendorId: 0x0483, usbProductId: 0x374F }, { usbVendorId: 0x0483, usbProductId: 0x3752 },
    ];
    return (
        <Card>
            <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t(`${id}.title`)}</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
                <p>{t(`${id}.p1`)}</p>
                <p className="font-semibold">{t(`${id}.listTitle`)}</p>
                <ul className="list-disc pl-5 font-mono text-xs">
                    <li>{t(`${id}.pid1`)}</li>
                    <li>{t(`${id}.pid2`)}</li>
                    <li>{t(`${id}.pid3`)}</li>
                </ul>

                <h3 className="text-md font-semibold text-white pt-2">{t('hardware.common.driversTitle')}</h3>
                 <p className="text-sm">{t('hardware.stlink.driverInfo')}</p>
                <ul className="list-disc pl-5 text-sm">
                    <li><a href="https://www.st.com/en/development-tools/stsw-link009.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Windows Driver</a></li>
                    <li><a href="https://www.st.com/en/development-tools/stm32cubeprog.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">STM32CubeProgrammer (includes drivers)</a></li>
                </ul>

                <h3 className="text-lg font-semibold text-white pt-2">{t(`${id}.codeTitle`)}</h3>
                <CodeBlock code={t(`${id}.code`)} />
                <Button onClick={() => onTestConnection(filters)} className="mt-2 w-full">
                    <Icon path="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 9.563C9 9.254 9.254 9 9.563 9h4.874c.309 0 .563.254.563.563v4.874c0 .309-.254.563-.563.563H9.563A.563.563 0 019 14.437V9.563z" className="h-5 w-5" />
                    {t('hardware.common.testButton')}
                </Button>
            </div>
        </Card>
    );
};

const BusPirate_Card: React.FC<DeviceCardProps> = ({ id, onTestConnection }) => {
    const { t } = useI18n();
    const filters = [{ usbVendorId: 0x04D8, usbProductId: 0xFB00 }];
    return (
        <Card>
            <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t(`${id}.title`)}</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
                <p>{t(`${id}.p1`)}</p>
                <p className="font-semibold">{t(`${id}.listTitle`)}</p>
                <p className="font-mono text-xs">{t(`${id}.vidpid`)}</p>
                
                 <h3 className="text-md font-semibold text-white pt-2">{t('hardware.common.driversTitle')}</h3>
                <p className="text-sm">{t('hardware.buspirate.driverInfo')}</p>

                <h3 className="text-lg font-semibold text-white pt-2">{t(`${id}.codeTitle`)}</h3>
                <CodeBlock code={t(`${id}.code`)} />
                <Button onClick={() => onTestConnection(filters)} className="mt-2 w-full">
                    <Icon path="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 9.563C9 9.254 9.254 9 9.563 9h4.874c.309 0 .563.254.563.563v4.874c0 .309-.254.563-.563.563H9.563A.563.563 0 019 14.437V9.563z" className="h-5 w-5" />
                    {t('hardware.common.testButton')}
                </Button>
            </div>
        </Card>
    );
};

const Flipper_Card: React.FC<DeviceCardProps> = ({ id, onTestConnection }) => {
    const { t } = useI18n();
    const filters = [{ usbVendorId: 0x0483, usbProductId: 0x5740 }];
    return (
        <Card>
            <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t(`${id}.title`)}</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
                <p>{t(`${id}.p1`)}</p>
                <p className="font-semibold">{t(`${id}.listTitle`)}</p>
                <p className="font-mono text-xs">{t(`${id}.vidpid`)}</p>

                <h3 className="text-md font-semibold text-white pt-2">{t('hardware.common.driversTitle')}</h3>
                 <p className="text-sm">{t('hardware.flipper.driverInfo')}</p>

                <h3 className="text-lg font-semibold text-white pt-2">{t(`${id}.codeTitle`)}</h3>
                <CodeBlock code={t(`${id}.code`)} />
                <Button onClick={() => onTestConnection(filters)} className="mt-2 w-full">
                    <Icon path="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 9.563C9 9.254 9.254 9 9.563 9h4.874c.309 0 .563.254.563.563v4.874c0 .309-.254.563-.563.563H9.563A.563.563 0 019 14.437V9.563z" className="h-5 w-5" />
                    {t('hardware.common.testButton')}
                </Button>
            </div>
        </Card>
    );
};


const HardwareScreen: React.FC = () => {
    const { t } = useI18n();

    const handleTestConnection = async (filters: {usbVendorId: number, usbProductId?: number}[]) => {
        try {
            if (!('serial' in navigator)) {
                alert(t('hardware.common.apiNotSupported'));
                return;
            }
            const port = await (navigator as any).serial.requestPort({ filters });
            if (port) {
                alert(t('hardware.common.deviceFound'));
            }
        } catch (error) {
            const message = (error as Error).message;
            if (!message.includes('No port selected')) {
                alert(`${t('hardware.common.error')}: ${message}`);
            }
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert(t('hardware.common.copied'));
    };

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
                <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3 mb-4">{t('hardware.troubleshooting.title')}</h2>
                <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
                    <p>{t('hardware.troubleshooting.p1')}</p>
                    
                    <h3 className="text-md font-semibold text-white pt-2">{t('hardware.troubleshooting.deviceManager.title')}</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                        {(t('hardware.troubleshooting.deviceManager.steps', {}) as unknown as string[]).map((step, index) => (
                          <li key={index} dangerouslySetInnerHTML={{ __html: step }}></li>
                        ))}
                    </ol>
                    <div className="flex items-center gap-2 not-prose">
                        <input type="text" readOnly value="devmgmt.msc" className="bg-gray-700 border border-gray-600 rounded-md p-2 text-sm font-mono w-full md:w-auto" />
                        <Button variant="secondary" onClick={() => copyToClipboard('devmgmt.msc')}>
                             <Icon path="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75c0-.231-.035-.454-.1-.664M6.75 7.5H18a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18.75V9.75A2.25 2.25 0 016.75 7.5z" className="h-5 w-5" />
                            {t('hardware.common.copyCommand')}
                        </Button>
                    </div>

                    <h3 className="text-md font-semibold text-white pt-2">{t('hardware.troubleshooting.general.title')}</h3>
                     <ul className="list-disc pl-5 space-y-2">
                        {(t('hardware.troubleshooting.general.steps', {}) as unknown as string[]).map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                    </ul>

                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FTDI_Card id="hardware.ftdi" onTestConnection={handleTestConnection} />
                <Generic_Card id="hardware.generic" onTestConnection={handleTestConnection} />
                <STLink_Card id="hardware.stlink" onTestConnection={handleTestConnection} />
                <BusPirate_Card id="hardware.buspirate" onTestConnection={handleTestConnection} />
                <Flipper_Card id="hardware.flipper" onTestConnection={handleTestConnection} />
            </div>
        </div>
    );
};

export default HardwareScreen;
