import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Language } from '../types';

// By embedding the translations directly into the code, we avoid issues with
// the experimental JSON module imports (import...assert) which caused the
// "Unexpected identifier 'assert'" error in some browsers. This is a more
// robust and widely compatible approach.
const en = {
  "common": {
    "edit": "Edit",
    "start": "Start",
    "pause": "Pause",
    "resume": "Resume",
    "stop": "Stop",
    "save": "Save",
    "reset": "Reset to Defaults",
    "step": "Step",
    "target": "Target"
  },
  "nav": {
    "dashboard": "Dashboard",
    "recipes": "Recipes",
    "logbook": "Logbook",
    "terminal": "Terminal",
    "guide": "Guide",
    "settings": "Settings"
  },
  "header": {
    "title": "NovaDry Connect",
    "connected": "Connected",
    "disconnected": "Disconnected",
    "connect": "Connect",
    "disconnect": "Disconnect"
  },
  "connectionModal": {
    "title": "Choose Connection Method",
    "description": "Select how you want to connect to the NovaDry system.",
    "serialTitle": "Connect via Serial (RS-232)",
    "serialDescription": "Connect directly to your freeze dryer hardware using a USB-to-Serial adapter.",
    "demoTitle": "Use Demo Mode",
    "demoDescription": "Run a simulated process without any hardware. Ideal for testing and exploring the app."
  },
  "dashboard": {
    "welcomeTitle": "Welcome to NovaDry Connect",
    "welcomeSubtitle": "Your hub for precision freeze-drying.",
    "connectMessage": "Please connect to your NovaLabs Freeze Dryer to begin.",
    "lastBatchTitle": "Last Batch Summary",
    "name": "Name",
    "quantity": "Quantity",
    "recipe": "Recipe",
    "completedOn": "Completed On"
  },
  "processMonitor": {
    "systemIdle": "System Idle",
    "startFromRecipes": "Start a new batch from the Recipes screen.",
    "temperature": "Temperature",
    "pressure": "Pressure",
    "elapsedTime": "Elapsed Time"
  },
  "recipes": {
    "title": "Recipes",
    "newRecipe": "New Recipe",
    "disconnectedWarningTitle": "Device Disconnected",
    "disconnectedWarningBody": "Please connect to the dryer to start a process.",
    "startProcessTooltip": "Connect dryer to start"
  },
  "logbook": {
    "title": "Batch Logbook",
    "addManualEntry": "Add Manual Entry",
    "noBatchesTitle": "No Batches Logged",
    "noBatchesBody": "Completed processes will appear here.",
    "ranOn": "Ran on",
    "with": "with",
    "quantity": "Quantity",
    "sieves": "Sieves",
    "washCycles": "Wash Cycles",
    "trayType": "Tray Type",
    "notes": "Notes",
    "noNotes": "No notes for this batch."
  },
  "settings": {
    "title": "Settings",
    "header": "Default Parameters",
    "description": "These values are used as a baseline for new recipes, based on standard Harvest Right settings. Adjust them to fit your needs.",
    "freezeTemp": "Default Freeze Temp (°C)",
    "dryTemp": "Default Final Dry Temp (°C)",
    "pressure": "Default Vacuum Pressure (mTorr)",
    "extraDryTime": "Default Extra Dry Time (minutes)"
  },
  "guide": {
    "title": "Guides & Information",
    "prep": {
      "title": "Bubble Hash Preparation Guide",
      "p1": "Proper preparation is key to a successful freeze-dry. Follow these steps for optimal results:",
      "steps": [
        "Collect & Sieve: After washing, collect your hash from the different micron bags. Gently press out excess water.",
        "Microplane/Sieve: Freeze the collected hash patty solid. Once frozen, grate it into a fine powder using a microplane or push it through a stainless steel strainer. This dramatically increases surface area for even drying.",
        "Pre-freeze Trays: Place parchment paper on your freeze dryer trays and put them in a standard freezer to get them cold before loading the hash.",
        "Load Trays: Sprinkle the powdered hash evenly and thinly across the cold, parchment-lined trays. Avoid clumps and thick piles.",
        "Load into Dryer: Immediately transfer the loaded trays into the NovaLabs Freeze Dryer and begin your selected cycle."
      ]
    },
    "trays": {
      "title": "Understanding Tray Types",
      "p1": "The type of tray you use can influence the drying process. Here are some common types:",
      "p2": "For bubble hash, <strong>Standard Stainless Steel</strong> trays lined with parchment paper are the most common and effective choice. They provide excellent thermal conductivity."
    },
    "timer": {
      "title": "Timer & Reminder",
      "p1": "Remember to set timers for your wash cycles to maintain consistency.",
      "p2": "A dedicated timer feature will be added in a future update."
    }
  },
  "terminal": {
    "title": "Device Terminal",
    "offlineTitle": "Terminal Offline",
    "offlineBody": "Connect to a device to see live data.",
    "welcome1": "Welcome to the NovaDry Terminal.",
    "welcome2": "Raw device data will appear here when connected."
  },
  "app": {
    "connectFirstWarning": "Please connect to the dryer first or wait for the current process to finish."
  }
};
const de = {
  "common": {
    "edit": "Bearbeiten",
    "start": "Starten",
    "pause": "Pause",
    "resume": "Fortsetzen",
    "stop": "Stopp",
    "save": "Speichern",
    "reset": "Auf Standard zurücksetzen",
    "step": "Schritt",
    "target": "Ziel"
  },
  "nav": {
    "dashboard": "Dashboard",
    "recipes": "Rezepte",
    "logbook": "Logbuch",
    "terminal": "Terminal",
    "guide": "Anleitung",
    "settings": "Einstellungen"
  },
  "header": {
    "title": "NovaDry Connect",
    "connected": "Verbunden",
    "disconnected": "Getrennt",
    "connect": "Verbinden",
    "disconnect": "Trennen"
  },
  "connectionModal": {
    "title": "Verbindungsmethode wählen",
    "description": "Wählen Sie, wie Sie sich mit dem NovaDry-System verbinden möchten.",
    "serialTitle": "Über Seriell (RS-232) verbinden",
    "serialDescription": "Verbinden Sie sich direkt über einen USB-zu-Seriell-Adapter mit Ihrer Gefriertrockner-Hardware.",
    "demoTitle": "Demo-Modus verwenden",
    "demoDescription": "Führen Sie einen simulierten Prozess ohne Hardware durch. Ideal zum Testen und Erkunden der App."
  },
  "dashboard": {
    "welcomeTitle": "Willkommen bei NovaDry Connect",
    "welcomeSubtitle": "Ihr Zentrum für präzises Gefriertrocknen.",
    "connectMessage": "Bitte verbinden Sie sich mit Ihrem NovaLabs Gefriertrockner, um zu beginnen.",
    "lastBatchTitle": "Zusammenfassung der letzten Charge",
    "name": "Name",
    "quantity": "Menge",
    "recipe": "Rezept",
    "completedOn": "Abgeschlossen am"
  },
  "processMonitor": {
    "systemIdle": "System im Leerlauf",
    "startFromRecipes": "Starten Sie eine neue Charge vom Rezeptbildschirm.",
    "temperature": "Temperatur",
    "pressure": "Druck",
    "elapsedTime": "Verstrichene Zeit"
  },
  "recipes": {
    "title": "Rezepte",
    "newRecipe": "Neues Rezept",
    "disconnectedWarningTitle": "Gerät getrennt",
    "disconnectedWarningBody": "Bitte verbinden Sie sich mit dem Trockner, um einen Prozess zu starten.",
    "startProcessTooltip": "Trockner zum Starten verbinden"
  },
  "logbook": {
    "title": "Chargen-Logbuch",
    "addManualEntry": "Manuellen Eintrag hinzufügen",
    "noBatchesTitle": "Keine Chargen protokolliert",
    "noBatchesBody": "Abgeschlossene Prozesse werden hier angezeigt.",
    "ranOn": "Lief am",
    "with": "mit",
    "quantity": "Menge",
    "sieves": "Siebe",
    "washCycles": "Waschzyklen",
    "trayType": "Tablett-Typ",
    "notes": "Notizen",
    "noNotes": "Keine Notizen für diese Charge."
  },
  "settings": {
    "title": "Einstellungen",
    "header": "Standardparameter",
    "description": "Diese Werte werden als Basis für neue Rezepte verwendet, basierend auf Standardeinstellungen von Harvest Right. Passen Sie sie an Ihre Bedürfnisse an.",
    "freezeTemp": "Standard-Gefriertemperatur (°C)",
    "dryTemp": "Standard-Endtrocknungstemperatur (°C)",
    "pressure": "Standard-Vakuumdruck (mTorr)",
    "extraDryTime": "Standard-Zusatz-Trocknungszeit (Minuten)"
  },
  "guide": {
    "title": "Anleitungen & Informationen",
    "prep": {
      "title": "Anleitung zur Bubble-Hash-Vorbereitung",
      "p1": "Die richtige Vorbereitung ist der Schlüssel zu einem erfolgreichen Gefriertrocknen. Befolgen Sie diese Schritte für optimale Ergebnisse:",
      "steps": [
        "Sammeln & Sieben: Sammeln Sie nach dem Waschen Ihr Hasch aus den verschiedenen Mikron-Beuteln. Drücken Sie überschüssiges Wasser vorsichtig aus.",
        "Microplane/Sieben: Frieren Sie den gesammelten Hasch-Patty fest ein. Sobald er gefroren ist, reiben Sie ihn mit einer Microplane zu einem feinen Pulver oder drücken Sie ihn durch ein Edelstahlsieb. Dies erhöht die Oberfläche für eine gleichmäßige Trocknung dramatisch.",
        "Tabletts vorfrieren: Legen Sie Pergamentpapier auf Ihre Gefriertrockner-Tabletts und legen Sie sie in einen Standard-Gefrierschrank, um sie vor dem Beladen mit dem Hasch abzukühlen.",
        "Tabletts beladen: Streuen Sie das pulverisierte Hasch gleichmäßig und dünn auf die kalten, mit Pergament ausgelegten Tabletts. Vermeiden Sie Klumpen und dicke Haufen.",
        "In den Trockner laden: Übertragen Sie die beladenen Tabletts sofort in den NovaLabs Gefriertrockner und starten Sie den ausgewählten Zyklus."
      ]
    },
    "trays": {
      "title": "Tablett-Typen verstehen",
      "p1": "Die Art des von Ihnen verwendeten Tabletts kann den Trocknungsprozess beeinflussen. Hier sind einige gängige Typen:",
      "p2": "Für Bubble Hash sind <strong>Standard-Edelstahl</strong>-Tabletts mit Pergamentpapier die häufigste und effektivste Wahl. Sie bieten eine ausgezeichnete Wärmeleitfähigkeit."
    },
    "timer": {
      "title": "Timer & Erinnerung",
      "p1": "Denken Sie daran, Timer für Ihre Waschzyklen einzustellen, um die Konsistenz zu gewährleisten.",
      "p2": "Eine dedizierte Timer-Funktion wird in einem zukünftigen Update hinzugefügt."
    }
  },
  "terminal": {
    "title": "Geräte-Terminal",
    "offlineTitle": "Terminal Offline",
    "offlineBody": "Verbinden Sie sich mit einem Gerät, um Live-Daten zu sehen.",
    "welcome1": "Willkommen im NovaDry Terminal.",
    "welcome2": "Rohdaten des Geräts werden hier angezeigt, wenn verbunden."
  },
  "app": {
    "connectFirstWarning": "Bitte verbinden Sie sich zuerst mit dem Trockner oder warten Sie, bis der aktuelle Prozess abgeschlossen ist."
  }
};
const es = {
  "common": {
    "edit": "Editar",
    "start": "Iniciar",
    "pause": "Pausar",
    "resume": "Reanudar",
    "stop": "Detener",
    "save": "Guardar",
    "reset": "Restablecer a valores predeterminados",
    "step": "Paso",
    "target": "Objetivo"
  },
  "nav": {
    "dashboard": "Dashboard",
    "recipes": "Recetas",
    "logbook": "Bitácora",
    "terminal": "Terminal",
    "guide": "Guía",
    "settings": "Ajustes"
  },
  "header": {
    "title": "NovaDry Connect",
    "connected": "Conectado",
    "disconnected": "Desconectado",
    "connect": "Conectar",
    "disconnect": "Desconectar"
  },
  "connectionModal": {
    "title": "Elija el método de conexión",
    "description": "Seleccione cómo desea conectarse al sistema NovaDry.",
    "serialTitle": "Conectar vía Serial (RS-232)",
    "serialDescription": "Conéctese directamente al hardware de su liofilizador mediante un adaptador de USB a Serial.",
    "demoTitle": "Usar Modo Demo",
    "demoDescription": "Ejecute un proceso simulado sin hardware. Ideal para probar y explorar la aplicación."
  },
  "dashboard": {
    "welcomeTitle": "Bienvenido a NovaDry Connect",
    "welcomeSubtitle": "Su centro para la liofilización de precisión.",
    "connectMessage": "Por favor, conéctese a su liofilizador NovaLabs para comenzar.",
    "lastBatchTitle": "Resumen del último lote",
    "name": "Nombre",
    "quantity": "Cantidad",
    "recipe": "Receta",
    "completedOn": "Completado el"
  },
  "processMonitor": {
    "systemIdle": "Sistema inactivo",
    "startFromRecipes": "Inicie un nuevo lote desde la pantalla de Recetas.",
    "temperature": "Temperatura",
    "pressure": "Presión",
    "elapsedTime": "Tiempo transcurrido"
  },
  "recipes": {
    "title": "Recetas",
    "newRecipe": "Nueva Receta",
    "disconnectedWarningTitle": "Dispositivo desconectado",
    "disconnectedWarningBody": "Por favor, conéctese al secador para iniciar un proceso.",
    "startProcessTooltip": "Conecte el secador para iniciar"
  },
  "logbook": {
    "title": "Bitácora de Lotes",
    "addManualEntry": "Añadir entrada manual",
    "noBatchesTitle": "No hay lotes registrados",
    "noBatchesBody": "Los procesos completados aparecerán aquí.",
    "ranOn": "Ejecutado el",
    "with": "con",
    "quantity": "Cantidad",
    "sieves": "Tamices",
    "washCycles": "Ciclos de lavado",
    "trayType": "Tipo de bandeja",
    "notes": "Notas",
    "noNotes": "No hay notas para este lote."
  },
  "settings": {
    "title": "Ajustes",
    "header": "Parámetros predeterminados",
    "description": "Estos valores se utilizan como base para nuevas recetas, basados en la configuración estándar de Harvest Right. Ajústelos a sus necesidades.",
    "freezeTemp": "Temp. de congelación predeterminada (°C)",
    "dryTemp": "Temp. de secado final predeterminada (°C)",
    "pressure": "Presión de vacío predeterminada (mTorr)",
    "extraDryTime": "Tiempo de secado extra predeterminado (minutos)"
  },
  "guide": {
    "title": "Guías e Información",
    "prep": {
      "title": "Guía de preparación de Bubble Hash",
      "p1": "La preparación adecuada es clave para una liofilización exitosa. Siga estos pasos para obtener resultados óptimos:",
      "steps": [
        "Recolectar y tamizar: Después de lavar, recolecte su hachís de las diferentes bolsas de micras. Presione suavemente para eliminar el exceso de agua.",
        "Microplane/Tamiz: Congele la pastilla de hachís recolectada hasta que esté sólida. Una vez congelada, rállela hasta obtener un polvo fino usando un microplane o pásela por un colador de acero inoxidable. Esto aumenta drásticamente la superficie para un secado uniforme.",
        "Pre-congelar bandejas: Coloque papel pergamino en las bandejas de su liofilizador y póngalas en un congelador estándar para que se enfríen antes de cargar el hachís.",
        "Cargar bandejas: Espolvoree el hachís en polvo de manera uniforme y delgada sobre las bandejas frías forradas con pergamino. Evite grumos y montones gruesos.",
        "Cargar en el secador: Transfiera inmediatamente las bandejas cargadas al liofilizador NovaLabs y comience el ciclo seleccionado."
      ]
    },
    "trays": {
      "title": "Entendiendo los tipos de bandejas",
      "p1": "El tipo de bandeja que utilice puede influir en el proceso de secado. Aquí hay algunos tipos comunes:",
      "p2": "Para el bubble hash, las bandejas de <strong>acero inoxidable estándar</strong> forradas con papel pergamino son la opción más común y efectiva. Proporcionan una excelente conductividad térmica."
    },
    "timer": {
      "title": "Temporizador y Recordatorio",
      "p1": "Recuerde configurar temporizadores para sus ciclos de lavado para mantener la consistencia.",
      "p2": "Se agregará una función de temporizador dedicada en una actualización futura."
    }
  },
  "terminal": {
    "title": "Terminal del Dispositivo",
    "offlineTitle": "Terminal fuera de línea",
    "offlineBody": "Conéctese a un dispositivo para ver datos en vivo.",
    "welcome1": "Bienvenido a la Terminal de NovaDry.",
    "welcome2": "Los datos brutos del dispositivo aparecerán aquí cuando esté conectado."
  },
  "app": {
    "connectFirstWarning": "Por favor, conéctese primero al secador o espere a que finalice el proceso actual."
  }
};

const translations = { en, de, es };

type I18nContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);
  
  const t = useCallback((key: string, options?: { [key: string]: string | number }): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
    }
    
    if (typeof result === 'string' && options) {
      return result.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
        return options[varName] !== undefined ? String(options[varName]) : `{{${varName}}}`;
      });
    }

    return result || key;
  }, [language]);


  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
