
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
    "hardware": "Hardware",
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
  "hardware": {
    "title": "Hardware Integration Guide",
    "intro": {
      "title": "Listing Available Ports",
      "p1": "The Web Serial API allows web applications to communicate with serial devices. Before connecting, you can get a list of ports the user has previously granted access to.",
      "p2": "The following code snippet demonstrates how to retrieve and display information about already permitted serial ports.",
      "code": "async function listGrantedPorts() {\n  if ('serial' in navigator) {\n    const ports = await navigator.serial.getPorts();\n    console.log(`Found ${ports.length} permitted ports.`);\n    for (const port of ports) {\n      const info = port.getInfo();\n      console.log('Port Info:', info);\n      // info contains usbVendorId and usbProductId\n    }\n  } else {\n    console.error('Web Serial API not supported.');\n  }\n}\nlistGrantedPorts();"
    },
    "detection": {
      "title": "Automatic Device Detection (VID/PID)",
      "p1": "The most reliable way to identify a specific device is by its USB Vendor ID (VID) and Product ID (PID). You can ask the user to select a device that matches a specific VID/PID pair.",
      "p2": "This is the primary method used to differentiate between various types of serial adapters.",
      "code": "async function requestPortWithFilters(filters) {\n  try {\n    // Prompt user to select a port matching the filters.\n    const port = await navigator.serial.requestPort({ filters });\n    const info = port.getInfo();\n    console.log(`Vendor ID: ${info.usbVendorId}, Product ID: ${info.usbProductId}`);\n    return port;\n  } catch (error) {\n    console.error('No port selected or an error occurred:', error);\n  }\n}\n\n// Example: const filters = [{ usbVendorId: 0x1234, usbProductId: 0x5678 }];\n// requestPortWithFilters(filters);"
    },
    "ftdi": {
      "title": "FTDI Adapters",
      "p1": "FTDI (Future Technology Devices International) is a very common manufacturer of USB-to-Serial converter chips. Their official Vendor ID is 0x0403.",
      "codeTitle": "Scan for FTDI Devices",
      "code": "const ftdiFilters = [{ usbVendorId: 0x0403 }];\n\nasync function connectToFTDI() {\n  const port = await navigator.serial.requestPort({ filters: ftdiFilters });\n  if (!port) return;\n\n  await port.open({ baudRate: 9600 });\n  console.log('Connected to FTDI device!');\n  \n  // Example: Write data\n  const writer = port.writable.getWriter();\n  const data = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // 'Hello'\n  await writer.write(data);\n  writer.releaseLock();\n}\n\nconnectToFTDI();"
    },
    "generic": {
      "title": "Generic Adapters (CH340/CP210x)",
      "p1": "Many budget-friendly microcontrollers and adapters use chips like the WCH CH340 or Silicon Labs CP210x. They have their own distinct Vendor IDs.",
      "listTitle": "Common VIDs:",
      "vid1": "CH340/CH341: 0x1A86",
      "vid2": "CP210x: 0x10C4",
      "codeTitle": "Scan for Common Generic Adapters",
      "code": "const genericFilters = [\n  { usbVendorId: 0x1A86 }, // CH340\n  { usbVendorId: 0x10C4 }, // CP210x\n];\n\nasync function connectToGeneric() {\n  const port = await navigator.serial.requestPort({ filters: genericFilters });\n  if (!port) return;\n  // ... connection logic similar to FTDI ...\n  console.log('Connected to a generic serial adapter!');\n}\n\nconnectToGeneric();"
    },
    "stlink": {
      "title": "ST-Link Debuggers",
      "p1": "ST-Link programmers, used for STM32 microcontrollers, often include a Virtual COM Port (VCP) for serial communication. The Vendor ID for STMicroelectronics is 0x0483.",
      "listTitle": "Common PIDs:",
      "pid1": "ST-Link/V2: 0x3748",
      "pid2": "ST-Link/V2.1: 0x374B",
      "pid3": "ST-LINK-V3: 0x374F, 0x3752",
      "codeTitle": "Scan for ST-Link VCP",
      "code": "const stlinkFilters = [\n  { usbVendorId: 0x0483, usbProductId: 0x3748 },\n  { usbVendorId: 0x0483, usbProductId: 0x374B },\n  { usbVendorId: 0x0483, usbProductId: 0x374F },\n  { usbVendorId: 0x0483, usbProductId: 0x3752 },\n];\n\nasync function connectToSTLink() {\n  const port = await navigator.serial.requestPort({ filters: stlinkFilters });\n  if (!port) return;\n  console.log('Connected to ST-Link Virtual COM Port!');\n}\n\nconnectToSTLink();"
    },
    "buspirate": {
      "title": "Bus Pirate",
      "p1": "The Bus Pirate is a versatile hardware debugging tool that communicates over a serial console. It has a specific VID/PID and a text-based command interface.",
      "listTitle": "VID/PID:",
      "vidpid": "VID: 0x04D8, PID: 0xFB00 (v3/v4)",
      "codeTitle": "Communicate with Bus Pirate",
      "code": "const busPirateFilter = [{ usbVendorId: 0x04D8, usbProductId: 0xFB00 }];\n\nasync function talkToBusPirate() {\n  const port = await navigator.serial.requestPort({ filters: busPirateFilter });\n  if (!port) return;\n  await port.open({ baudRate: 115200 });\n\n  const writer = port.writable.getWriter();\n  const reader = port.readable.getReader();\n  const encoder = new TextEncoder();\n  const decoder = new TextDecoder();\n\n  // Enter raw bitbang mode\n  await writer.write(encoder.encode('\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n')); // Send 10 newlines to reset\n  await new Promise(r => setTimeout(r, 50)); // Wait for reset\n\n  // Send 'i' for info\n  await writer.write(encoder.encode('i\\n'));\n\n  // Read response\n  const { value } = await reader.read();\n  console.log(decoder.decode(value));\n\n  writer.releaseLock();\n  reader.releaseLock();\n}\n\ntalkToBusPirate();"
    },
    "flipper": {
      "title": "Flipper Zero",
      "p1": "The Flipper Zero provides a command-line interface (CLI) over its USB serial port, allowing for programmatic control and information retrieval.",
      "listTitle": "VID/PID:",
      "vidpid": "VID: 0x0483, PID: 0x5740",
      "codeTitle": "Get Flipper Zero Device Info",
      "code": "const flipperFilter = [{ usbVendorId: 0x0483, usbProductId: 0x5740 }];\n\nasync function getFlipperInfo() {\n  const port = await navigator.serial.requestPort({ filters: flipperFilter });\n  if (!port) return;\n  await port.open({ baudRate: 115200 });\n\n  const writer = port.writable.getWriter();\n  const reader = port.readable.getReader();\n  const encoder = new TextEncoder();\n  const decoder = new TextDecoder();\n\n  // Send 'device_info' command with carriage return\n  await writer.write(encoder.encode('device_info\\r'));\n  \n  // Read response until prompt '>' appears\n  let response = '';\n  while (!response.includes('>')) {\n    const { value, done } = await reader.read();\n    if (done) break;\n    response += decoder.decode(value, { stream: true });\n  }\n  console.log(response);\n  \n  writer.releaseLock();\n  reader.releaseLock();\n}\n\ngetFlipperInfo();"
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
    "hardware": "Hardware",
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
  "hardware": {
    "title": "Hardware-Integrationsanleitung",
    "intro": {
      "title": "Verfügbare Ports auflisten",
      "p1": "Die Web Serial API ermöglicht es Webanwendungen, mit seriellen Geräten zu kommunizieren. Vor dem Verbinden können Sie eine Liste der Ports abrufen, für die der Benutzer zuvor den Zugriff gewährt hat.",
      "p2": "Das folgende Code-Beispiel zeigt, wie man Informationen über bereits genehmigte serielle Ports abruft und anzeigt.",
      "code": "async function listGrantedPorts() {\n  if ('serial' in navigator) {\n    const ports = await navigator.serial.getPorts();\n    console.log(`Gefunden: ${ports.length} genehmigte Ports.`);\n    for (const port of ports) {\n      const info = port.getInfo();\n      console.log('Port-Info:', info);\n      // info enthält usbVendorId und usbProductId\n    }\n  } else {\n    console.error('Web Serial API nicht unterstützt.');\n  }\n}\nlistGrantedPorts();"
    },
    "detection": {
      "title": "Automatische Geräteerkennung (VID/PID)",
      "p1": "Der zuverlässigste Weg, ein bestimmtes Gerät zu identifizieren, ist über seine USB Vendor ID (VID) und Product ID (PID). Sie können den Benutzer bitten, ein Gerät auszuwählen, das einem bestimmten VID/PID-Paar entspricht.",
      "p2": "Dies ist die primäre Methode, um zwischen verschiedenen Arten von seriellen Adaptern zu unterscheiden.",
      "code": "async function requestPortWithFilters(filters) {\n  try {\n    // Benutzer auffordern, einen Port auszuwählen, der den Filtern entspricht.\n    const port = await navigator.serial.requestPort({ filters });\n    const info = port.getInfo();\n    console.log(`Vendor ID: ${info.usbVendorId}, Product ID: ${info.usbProductId}`);\n    return port;\n  } catch (error) {\n    console.error('Kein Port ausgewählt oder Fehler:', error);\n  }\n}\n\n// Beispiel: const filters = [{ usbVendorId: 0x1234, usbProductId: 0x5678 }];\n// requestPortWithFilters(filters);"
    },
    "ftdi": {
      "title": "FTDI-Adapter",
      "p1": "FTDI (Future Technology Devices International) ist ein sehr verbreiteter Hersteller von USB-zu-Seriell-Konverterchips. Ihre offizielle Vendor ID ist 0x0403.",
      "codeTitle": "Nach FTDI-Geräten suchen",
      "code": "const ftdiFilters = [{ usbVendorId: 0x0403 }];\n\nasync function connectToFTDI() {\n  const port = await navigator.serial.requestPort({ filters: ftdiFilters });\n  if (!port) return;\n\n  await port.open({ baudRate: 9600 });\n  console.log('Verbunden mit FTDI-Gerät!');\n  \n  // Beispiel: Daten schreiben\n  const writer = port.writable.getWriter();\n  const data = new Uint8Array([0x48, 0x61, 0x6c, 0x6c, 0x6f]); // 'Hallo'\n  await writer.write(data);\n  writer.releaseLock();\n}\n\nconnectToFTDI();"
    },
    "generic": {
      "title": "Generische Adapter (CH340/CP210x)",
      "p1": "Viele preisgünstige Mikrocontroller und Adapter verwenden Chips wie den WCH CH340 oder Silicon Labs CP210x. Sie haben ihre eigenen eindeutigen Vendor IDs.",
      "listTitle": "Häufige VIDs:",
      "vid1": "CH340/CH341: 0x1A86",
      "vid2": "CP210x: 0x10C4",
      "codeTitle": "Nach generischen Adaptern suchen",
      "code": "const genericFilters = [\n  { usbVendorId: 0x1A86 }, // CH340\n  { usbVendorId: 0x10C4 }, // CP210x\n];\n\nasync function connectToGeneric() {\n  const port = await navigator.serial.requestPort({ filters: genericFilters });\n  if (!port) return;\n  // ... Verbindungslogik ähnlich wie bei FTDI ...\n  console.log('Verbunden mit einem generischen seriellen Adapter!');\n}\n\nconnectToGeneric();"
    },
    "stlink": {
      "title": "ST-Link Debugger",
      "p1": "ST-Link-Programmierer, die für STM32-Mikrocontroller verwendet werden, enthalten oft einen virtuellen COM-Port (VCP) für die serielle Kommunikation. Die Vendor ID für STMicroelectronics ist 0x0483.",
      "listTitle": "Häufige PIDs:",
      "pid1": "ST-Link/V2: 0x3748",
      "pid2": "ST-Link/V2.1: 0x374B",
      "pid3": "ST-LINK-V3: 0x374F, 0x3752",
      "codeTitle": "Nach ST-Link VCP suchen",
      "code": "const stlinkFilters = [\n  { usbVendorId: 0x0483, usbProductId: 0x3748 },\n  { usbVendorId: 0x0483, usbProductId: 0x374B },\n  { usbVendorId: 0x0483, usbProductId: 0x374F },\n  { usbVendorId: 0x0483, usbProductId: 0x3752 },\n];\n\nasync function connectToSTLink() {\n  const port = await navigator.serial.requestPort({ filters: stlinkFilters });\n  if (!port) return;\n  console.log('Verbunden mit ST-Link Virtual COM Port!');\n}\n\nconnectToSTLink();"
    },
    "buspirate": {
      "title": "Bus Pirate",
      "p1": "Der Bus Pirate ist ein vielseitiges Hardware-Debugging-Tool, das über eine serielle Konsole kommuniziert. Er hat eine spezifische VID/PID und eine textbasierte Befehlsschnittstelle.",
      "listTitle": "VID/PID:",
      "vidpid": "VID: 0x04D8, PID: 0xFB00 (v3/v4)",
      "codeTitle": "Mit Bus Pirate kommunizieren",
      "code": "const busPirateFilter = [{ usbVendorId: 0x04D8, usbProductId: 0xFB00 }];\n\nasync function talkToBusPirate() {\n  const port = await navigator.serial.requestPort({ filters: busPirateFilter });\n  if (!port) return;\n  await port.open({ baudRate: 115200 });\n\n  const writer = port.writable.getWriter();\n  const reader = port.readable.getReader();\n  const encoder = new TextEncoder();\n  const decoder = new TextDecoder();\n\n  // In den Raw-Bitbang-Modus wechseln\n  await writer.write(encoder.encode('\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n')); // 10 Newlines zum Zurücksetzen senden\n  await new Promise(r => setTimeout(r, 50)); // Auf Reset warten\n\n  // 'i' für Info senden\n  await writer.write(encoder.encode('i\\n'));\n\n  // Antwort lesen\n  const { value } = await reader.read();\n  console.log(decoder.decode(value));\n\n  writer.releaseLock();\n  reader.releaseLock();\n}\n\ntalkToBusPirate();"
    },
    "flipper": {
      "title": "Flipper Zero",
      "p1": "Der Flipper Zero bietet eine Befehlszeilenschnittstelle (CLI) über seinen seriellen USB-Port, die eine programmatische Steuerung und Informationsabfrage ermöglicht.",
      "listTitle": "VID/PID:",
      "vidpid": "VID: 0x0483, PID: 0x5740",
      "codeTitle": "Flipper Zero Geräteinfo abrufen",
      "code": "const flipperFilter = [{ usbVendorId: 0x0483, usbProductId: 0x5740 }];\n\nasync function getFlipperInfo() {\n  const port = await navigator.serial.requestPort({ filters: flipperFilter });\n  if (!port) return;\n  await port.open({ baudRate: 115200 });\n\n  const writer = port.writable.getWriter();\n  const reader = port.readable.getReader();\n  const encoder = new TextEncoder();\n  const decoder = new TextDecoder();\n\n  // 'device_info'-Befehl mit Wagenrücklauf senden\n  await writer.write(encoder.encode('device_info\\r'));\n  \n  // Antwort lesen, bis der Prompt '>' erscheint\n  let response = '';\n  while (!response.includes('>')) {\n    const { value, done } = await reader.read();\n    if (done) break;\n    response += decoder.decode(value, { stream: true });\n  }\n  console.log(response);\n  \n  writer.releaseLock();\n  reader.releaseLock();\n}\n\ngetFlipperInfo();"
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
    "hardware": "Hardware",
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
  "hardware": {
    "title": "Guía de Integración de Hardware",
    "intro": {
      "title": "Listar Puertos Disponibles",
      "p1": "La API Web Serial permite que las aplicaciones web se comuniquen con dispositivos seriales. Antes de conectarse, puede obtener una lista de los puertos a los que el usuario ha otorgado acceso previamente.",
      "p2": "El siguiente fragmento de código demuestra cómo recuperar y mostrar información sobre los puertos seriales ya permitidos.",
      "code": "async function listGrantedPorts() {\n  if ('serial' in navigator) {\n    const ports = await navigator.serial.getPorts();\n    console.log(`Se encontraron ${ports.length} puertos permitidos.`);\n    for (const port of ports) {\n      const info = port.getInfo();\n      console.log('Info del puerto:', info);\n      // info contiene usbVendorId y usbProductId\n    }\n  } else {\n    console.error('La API Web Serial no es compatible.');\n  }\n}\nlistGrantedPorts();"
    },
    "detection": {
      "title": "Detección Automática de Dispositivos (VID/PID)",
      "p1": "La forma más confiable de identificar un dispositivo específico es mediante su ID de Vendedor (VID) y su ID de Producto (PID) de USB. Puede pedirle al usuario que seleccione un dispositivo que coincida con un par VID/PID específico.",
      "p2": "Este es el método principal utilizado para diferenciar entre varios tipos de adaptadores seriales.",
      "code": "async function requestPortWithFilters(filters) {\n  try {\n    // Solicitar al usuario que seleccione un puerto que coincida con los filtros.\n    const port = await navigator.serial.requestPort({ filters });\n    const info = port.getInfo();\n    console.log(`Vendor ID: ${info.usbVendorId}, Product ID: ${info.usbProductId}`);\n    return port;\n  } catch (error) {\n    console.error('No se seleccionó ningún puerto o ocurrió un error:', error);\n  }\n}\n\n// Ejemplo: const filters = [{ usbVendorId: 0x1234, usbProductId: 0x5678 }];\n// requestPortWithFilters(filters);"
    },
    "ftdi": {
      "title": "Adaptadores FTDI",
      "p1": "FTDI (Future Technology Devices International) es un fabricante muy común de chips convertidores de USB a Serial. Su ID de Vendedor oficial es 0x0403.",
      "codeTitle": "Buscar Dispositivos FTDI",
      "code": "const ftdiFilters = [{ usbVendorId: 0x0403 }];\n\nasync function connectToFTDI() {\n  const port = await navigator.serial.requestPort({ filters: ftdiFilters });\n  if (!port) return;\n\n  await port.open({ baudRate: 9600 });\n  console.log('¡Conectado a un dispositivo FTDI!');\n  \n  // Ejemplo: Escribir datos\n  const writer = port.writable.getWriter();\n  const data = new Uint8Array([0x48, 0x6f, 0x6c, 0x61]); // 'Hola'\n  await writer.write(data);\n  writer.releaseLock();\n}\n\nconnectToFTDI();"
    },
    "generic": {
      "title": "Adaptadores Genéricos (CH340/CP210x)",
      "p1": "Muchos microcontroladores y adaptadores económicos utilizan chips como el WCH CH340 o el Silicon Labs CP210x. Tienen sus propios ID de Vendedor distintos.",
      "listTitle": "VIDs Comunes:",
      "vid1": "CH340/CH341: 0x1A86",
      "vid2": "CP210x: 0x10C4",
      "codeTitle": "Buscar Adaptadores Genéricos Comunes",
      "code": "const genericFilters = [\n  { usbVendorId: 0x1A86 }, // CH340\n  { usbVendorId: 0x10C4 }, // CP210x\n];\n\nasync function connectToGeneric() {\n  const port = await navigator.serial.requestPort({ filters: genericFilters });\n  if (!port) return;\n  // ... lógica de conexión similar a FTDI ...\n  console.log('¡Conectado a un adaptador serial genérico!');\n}\n\nconnectToGeneric();"
    },
    "stlink": {
      "title": "Depuradores ST-Link",
      "p1": "Los programadores ST-Link, utilizados para microcontroladores STM32, a menudo incluyen un Puerto COM Virtual (VCP) para la comunicación serial. El ID de Vendedor para STMicroelectronics es 0x0483.",
      "listTitle": "PIDs Comunes:",
      "pid1": "ST-Link/V2: 0x3748",
      "pid2": "ST-Link/V2.1: 0x374B",
      "pid3": "ST-LINK-V3: 0x374F, 0x3752",
      "codeTitle": "Buscar ST-Link VCP",
      "code": "const stlinkFilters = [\n  { usbVendorId: 0x0483, usbProductId: 0x3748 },\n  { usbVendorId: 0x0483, usbProductId: 0x374B },\n  { usbVendorId: 0x0483, usbProductId: 0x374F },\n  { usbVendorId: 0x0483, usbProductId: 0x3752 },\n];\n\nasync function connectToSTLink() {\n  const port = await navigator.serial.requestPort({ filters: stlinkFilters });\n  if (!port) return;\n  console.log('¡Conectado al Puerto COM Virtual de ST-Link!');\n}\n\nconnectToSTLink();"
    },
    "buspirate": {
      "title": "Bus Pirate",
      "p1": "El Bus Pirate es una herramienta versátil de depuración de hardware que se comunica a través de una consola serial. Tiene un VID/PID específico y una interfaz de comandos basada en texto.",
      "listTitle": "VID/PID:",
      "vidpid": "VID: 0x04D8, PID: 0xFB00 (v3/v4)",
      "codeTitle": "Comunicarse con Bus Pirate",
      "code": "const busPirateFilter = [{ usbVendorId: 0x04D8, usbProductId: 0xFB00 }];\n\nasync function talkToBusPirate() {\n  const port = await navigator.serial.requestPort({ filters: busPirateFilter });\n  if (!port) return;\n  await port.open({ baudRate: 115200 });\n\n  const writer = port.writable.getWriter();\n  const reader = port.readable.getReader();\n  const encoder = new TextEncoder();\n  const decoder = new TextDecoder();\n\n  // Entrar en modo bitbang crudo\n  await writer.write(encoder.encode('\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n')); // Enviar 10 saltos de línea para reiniciar\n  await new Promise(r => setTimeout(r, 50)); // Esperar al reinicio\n\n  // Enviar 'i' para info\n  await writer.write(encoder.encode('i\\n'));\n\n  // Leer respuesta\n  const { value } = await reader.read();\n  console.log(decoder.decode(value));\n\n  writer.releaseLock();\n  reader.releaseLock();\n}\n\ntalkToBusPirate();"
    },
    "flipper": {
      "title": "Flipper Zero",
      "p1": "El Flipper Zero proporciona una interfaz de línea de comandos (CLI) a través de su puerto serial USB, permitiendo el control programático y la recuperación de información.",
      "listTitle": "VID/PID:",
      "vidpid": "VID: 0x0483, PID: 0x5740",
      "codeTitle": "Obtener Información del Dispositivo Flipper Zero",
      "code": "const flipperFilter = [{ usbVendorId: 0x0483, usbProductId: 0x5740 }];\n\nasync function getFlipperInfo() {\n  const port = await navigator.serial.requestPort({ filters: flipperFilter });\n  if (!port) return;\n  await port.open({ baudRate: 115200 });\n\n  const writer = port.writable.getWriter();\n  const reader = port.readable.getReader();\n  const encoder = new TextEncoder();\n  const decoder = new TextDecoder();\n\n  // Enviar comando 'device_info' con retorno de carro\n  await writer.write(encoder.encode('device_info\\r'));\n  \n  // Leer respuesta hasta que aparezca el prompt '>'\n  let response = '';\n  while (!response.includes('>')) {\n    const { value, done } = await reader.read();\n    if (done) break;\n    response += decoder.decode(value, { stream: true });\n  }\n  console.log(response);\n  \n  writer.releaseLock();\n  reader.releaseLock();\n}\n\ngetFlipperInfo();"
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
