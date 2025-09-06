
import React, { useState, useRef, useEffect } from 'react';
import { AppScreen, DryerStatus } from '../types';
import Icon from './common/Icon';
import Button from './common/Button';

interface HeaderProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  dryerStatus: DryerStatus;
  onConnect: () => void;
  onDisconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  dryerStatus,
  onConnect,
  onDisconnect,
}) => {
  const navItems: { screen: AppScreen; label: string; icon: string }[] = [
    { screen: 'dashboard', label: 'Dashboard', icon: 'M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z' },
    { screen: 'recipes', label: 'Recipes', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
    { screen: 'logbook', label: 'Logbook', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' },
    { screen: 'terminal', label: 'Terminal', icon: 'M6.4 13.4L5 12l1.4-1.4M8.6 10.6L10 12l-1.4 1.4m.2-6.8H18M4.5 3.75v16.5h15V3.75h-15z' },
    { screen: 'guide', label: 'Guide', icon: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z' },
    { screen: 'settings', label: 'Settings', icon: 'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.39.44 1.022.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.427.27 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.855-.142-1.205.108l-.737.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.093c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.15-.894z' },
  ];

  const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef]);
    
    const selectLanguage = (lang: string) => {
        console.log(`Language selected: ${lang}`); // Placeholder for actual logic
        setIsOpen(false);
    };

    return (
      <div className="relative" ref={wrapperRef}>
        <Button variant="secondary" onClick={() => setIsOpen(!isOpen)} className="px-3 py-1.5" aria-label="Change language" aria-haspopup="true" aria-expanded={isOpen}>
           <Icon path="M10.5 21a9 9 0 008.03-4.59M10.5 21a9 9 0 01-8.03-4.59m16.06 0H2.47m16.06 0A9 9 0 0010.5 3a9 9 0 00-8.03 12.41m16.06 0L10.5 21m-8.03-4.59L10.5 3m0 0v18" className="h-5 w-5" />
        </Button>
        {isOpen && (
           <div className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-20" role="menu">
             <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-blue-600 rounded-t-md" role="menuitem" onClick={(e) => { e.preventDefault(); selectLanguage("en");}}>English</a>
             <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-blue-600" role="menuitem" onClick={(e) => { e.preventDefault(); selectLanguage("de");}}>Deutsch</a>
             <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-blue-600 rounded-b-md" role="menuitem" onClick={(e) => { e.preventDefault(); selectLanguage("es");}}>Español</a>
           </div>
        )}
      </div>
    );
  };

  const ConnectionStatus = () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className={`h-3 w-3 rounded-full ${dryerStatus.isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
        <span className="text-sm font-medium">{dryerStatus.isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>
      {dryerStatus.isConnected ? (
        <Button variant="danger" onClick={onDisconnect} className="px-3 py-1 text-sm">Disconnect</Button>
      ) : (
        <Button variant="primary" onClick={onConnect} className="px-3 py-1 text-sm">Connect</Button>
      )}
    </div>
  );

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Icon path="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" className="h-8 w-8 text-blue-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">NovaDry Connect</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentScreen === item.screen
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon path={item.icon} className="h-5 w-5 mr-2" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <ConnectionStatus />
          </div>
        </div>
         <div className="md:hidden flex items-center justify-end p-2 space-x-4">
            <LanguageSwitcher />
            <ConnectionStatus />
         </div>
         <div className="md:hidden flex items-center justify-around p-2 border-t border-gray-700">
             {navItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`flex flex-col items-center p-1 text-xs font-medium rounded-md transition-colors w-16 ${
                  currentScreen === item.screen
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon path={item.icon} className="h-6 w-6 mb-1" />
                {item.label}
              </button>
            ))}
         </div>
      </div>
    </header>
  );
};

export default Header;
