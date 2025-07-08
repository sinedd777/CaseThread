import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for communication with renderer
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-app-name', () => {
  return app.getName();
});

// Project management IPC handlers
ipcMain.handle('create-project', async (event, projectData) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to create project:', error);
    throw error;
  }
});

ipcMain.handle('load-project', async (event, projectId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8080/projects/${projectId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Project not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to load project:', error);
    throw error;
  }
});

ipcMain.handle('save-project', async (event, projectId, projectData) => {
  try {
    const response = await fetch(`http://127.0.0.1:8080/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to save project:', error);
    throw error;
  }
});

// Legal research IPC handlers
ipcMain.handle('search-cases', async (event, query) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/search/cases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to search cases:', error);
    throw error;
  }
});

ipcMain.handle('validate-citation', async (event, citation) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/citations/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ citation }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to validate citation:', error);
    throw error;
  }
});

// Template system IPC handlers
ipcMain.handle('get-templates', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8080/templates');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to get templates:', error);
    throw error;
  }
});

ipcMain.handle('generate-document', async (event, templateId, data) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/templates/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template_id: templateId,
        variables: data,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to generate document:', error);
    throw error;
  }
});

// Agent communication IPC handlers
ipcMain.handle('query-agent', async (event, agentType, query) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/agents/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_type: agentType,
        query: query,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to query agent:', error);
    throw error;
  }
}); 