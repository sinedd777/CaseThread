import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppName: () => ipcRenderer.invoke('get-app-name'),
  
  // Project management
  createProject: (projectData: any) => ipcRenderer.invoke('create-project', projectData),
  loadProject: (projectId: string) => ipcRenderer.invoke('load-project', projectId),
  saveProject: (projectId: string, projectData: any) => ipcRenderer.invoke('save-project', projectId, projectData),
  
  // Legal research
  searchCases: (query: string) => ipcRenderer.invoke('search-cases', query),
  validateCitation: (citation: string) => ipcRenderer.invoke('validate-citation', citation),
  
  // Template system
  getTemplates: () => ipcRenderer.invoke('get-templates'),
  generateDocument: (templateId: string, data: any) => ipcRenderer.invoke('generate-document', templateId, data),
  
  // Agent communication
  queryAgent: (agentType: string, query: string) => ipcRenderer.invoke('query-agent', agentType, query)
});

// Type definitions for the exposed API
declare global {
  interface Window {
    electronAPI: {
      getAppVersion: () => Promise<string>;
      getAppName: () => Promise<string>;
      createProject: (projectData: any) => Promise<any>;
      loadProject: (projectId: string) => Promise<any>;
      saveProject: (projectId: string, projectData: any) => Promise<void>;
      searchCases: (query: string) => Promise<any>;
      validateCitation: (citation: string) => Promise<any>;
      getTemplates: () => Promise<any>;
      generateDocument: (templateId: string, data: any) => Promise<any>;
      queryAgent: (agentType: string, query: string) => Promise<any>;
    }
  }
} 