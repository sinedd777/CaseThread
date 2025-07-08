import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [appName, setAppName] = useState<string>('');
  const [appVersion, setAppVersion] = useState<string>('');

  useEffect(() => {
    // Get app information from the main process
    const loadAppInfo = async () => {
      try {
        const name = await window.electronAPI.getAppName();
        const version = await window.electronAPI.getAppVersion();
        setAppName(name);
        setAppVersion(version);
      } catch (error) {
        console.error('Error loading app info:', error);
      }
    };

    loadAppInfo();
  }, []);

  const handleCreateProject = async () => {
    try {
      const projectData = {
        title: 'New Legal Project',
        jurisdiction: 'Federal',
        issueType: 'Patent'
      };
      const result = await window.electronAPI.createProject(projectData);
      console.log('Project created:', result);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleSearchCases = async () => {
    try {
      const query = 'Fourth Amendment vehicle search';
      const results = await window.electronAPI.searchCases(query);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Error searching cases:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{appName}</h1>
        <p>Version: {appVersion}</p>
        <h2>CaseThread - Legal AI Research Platform</h2>
        <p>Multi-agent legal research and document generation system</p>
      </header>
      
      <main className="App-main">
        <div className="feature-section">
          <h3>Project Management</h3>
          <button onClick={handleCreateProject}>Create New Project</button>
        </div>
        
        <div className="feature-section">
          <h3>Legal Research</h3>
          <button onClick={handleSearchCases}>Search Case Law</button>
        </div>
        
        <div className="feature-section">
          <h3>Document Generation</h3>
          <button disabled>Generate Document (Coming Soon)</button>
        </div>
        
        <div className="feature-section">
          <h3>Citation Validation</h3>
          <button disabled>Validate Citations (Coming Soon)</button>
        </div>
      </main>
    </div>
  );
};

export default App; 