/**
 * Google Apps Script for automating form submissions to GitHub
 * 
 * This script automatically processes Google Form submissions and commits them
 * to a GitHub repository as formatted markdown entries in IDEAS.md
 * 
 * Setup Instructions:
 * 1. Add this script to your Google Sheet (Extensions → Apps Script)
 * 2. Configure Script Properties with your GitHub details (see AUTOMATION_SETUP.md)
 * 3. Set up a trigger for "onFormSubmit" on form submit events
 * 
 * Required Script Properties:
 * - GITHUB_TOKEN: Your GitHub Personal Access Token
 * - GITHUB_OWNER: Repository owner (username or organization)
 * - GITHUB_REPO: Repository name
 * - GITHUB_BRANCH: Branch to commit to (usually 'main')
 * - GITHUB_FILE_PATH: Path to the file to update (default: 'IDEAS.md')
 */

/**
 * Main function that runs when a form is submitted
 * This is triggered automatically by the form submit event
 */
function onFormSubmit(e) {
  try {
    // Get the form response
    const response = e.response;
    const itemResponses = response.getItemResponses();
    
    // Extract form data
    const formData = extractFormData(itemResponses);
    
    // Validate that we have required fields
    if (!formData.title || !formData.concept) {
      Logger.log('Missing required fields - skipping submission');
      return;
    }
    
    // Format the data as markdown
    const markdown = formatAsMarkdown(formData);
    
    // Commit to GitHub
    const success = commitToGitHub(markdown, formData.title);
    
    if (success) {
      Logger.log('Successfully committed idea to GitHub: ' + formData.title);
    } else {
      Logger.log('Failed to commit to GitHub');
    }
    
  } catch (error) {
    Logger.log('Error in onFormSubmit: ' + error.toString());
    // Optionally send an email notification about the error
    // MailApp.sendEmail('your-email@example.com', 'Form Automation Error', error.toString());
  }
}

/**
 * Extract data from form responses
 * Maps form questions to data fields
 */
function extractFormData(itemResponses) {
  const data = {
    name: '',
    title: '',
    concept: '',
    comments: '',
    timestamp: new Date()
  };
  
  // Map form responses to our data structure
  // Note: Adjust these based on your actual form question text
  itemResponses.forEach(function(itemResponse) {
    const question = itemResponse.getItem().getTitle().toLowerCase();
    const answer = itemResponse.getResponse();
    
    if (question.includes('name') && question.includes('optional')) {
      data.name = answer;
    } else if (question.includes('idea title') || question.includes('title')) {
      data.title = answer;
    } else if (question.includes('core concept')) {
      data.concept = answer;
    } else if (question.includes('additional comments') || question.includes('comments')) {
      data.comments = answer;
    }
  });
  
  return data;
}

/**
 * Format form data as markdown for IDEAS.md
 */
function formatAsMarkdown(data) {
  let markdown = '\n---\n\n';
  
  // Required fields
  markdown += '- **Idea Name**: ' + data.title + '\n';
  markdown += '- **Core Concept**: ' + data.concept + '\n';  
  
  // Attribution
  const contributor = data.name || 'Anonymous';
  const date = Utilities.formatDate(data.timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  markdown += '- **Added by**: ' + contributor + ' - ' + date + '\n';
  
  // Additional comments
  if (data.comments) {
    markdown += '\n' + data.comments + '\n';
  }
  
  markdown += '\n';
  
  return markdown;
}

/**
 * Commit the new idea to GitHub repository
 */
function commitToGitHub(markdown, ideaTitle) {
  try {
    // Get script properties
    const properties = PropertiesService.getScriptProperties();
    const token = properties.getProperty('GITHUB_TOKEN');
    const owner = properties.getProperty('GITHUB_OWNER');
    const repo = properties.getProperty('GITHUB_REPO');
    const branch = properties.getProperty('GITHUB_BRANCH') || 'main';
    const filePath = properties.getProperty('GITHUB_FILE_PATH') || 'IDEAS.md';
    
    // Validate configuration
    if (!token || !owner || !repo) {
      Logger.log('Missing GitHub configuration in script properties');
      return false;
    }
    
    // Step 1: Get the current content of the target file
    const currentContent = getFileContent(owner, repo, filePath, branch, token);
    if (currentContent === null) {
      Logger.log('Failed to get current file content');
      return false;
    }
    
    // Step 2: Append new idea to the content
    const updatedContent = currentContent.content + markdown;
    
    // Step 3: Commit the updated content
    const commitMessage = 'Add idea from form: ' + ideaTitle;
    const success = updateFile(owner, repo, filePath, branch, updatedContent, commitMessage, currentContent.sha, token);
    
    return success;
    
  } catch (error) {
    Logger.log('Error in commitToGitHub: ' + error.toString());
    return false;
  }
}

/**
 * Get current file content from GitHub
 */
function getFileContent(owner, repo, path, branch, token) {
  try {
    const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path + '?ref=' + branch;
    
    const options = {
      'method': 'GET',
      'headers': {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'Google-Apps-Script',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      'muteHttpExceptions': true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 200) {
      const json = JSON.parse(response.getContentText());
      const content = Utilities.newBlob(Utilities.base64Decode(json.content)).getDataAsString();
      return {
        content: content,
        sha: json.sha
      };
    } else {
      Logger.log('Failed to get file content. Response code: ' + responseCode);
      Logger.log('Response: ' + response.getContentText());
      return null;
    }
    
  } catch (error) {
    Logger.log('Error in getFileContent: ' + error.toString());
    return null;
  }
}

/**
 * Update file content on GitHub
 */
function updateFile(owner, repo, path, branch, content, message, sha, token) {
  try {
    const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path;
    
    const payload = {
      'message': message,
      'content': Utilities.base64Encode(content),
      'sha': sha,
      'branch': branch
    };
    
    const options = {
      'method': 'PUT',
      'headers': {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'Google-Apps-Script',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      'payload': JSON.stringify(payload),
      'muteHttpExceptions': true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 200 || responseCode === 201) {
      Logger.log('Successfully updated file on GitHub');
      return true;
    } else {
      Logger.log('Failed to update file. Response code: ' + responseCode);
      Logger.log('Response: ' + response.getContentText());
      return false;
    }
    
  } catch (error) {
    Logger.log('Error in updateFile: ' + error.toString());
    return false;
  }
}

/**
 * Test function to verify configuration
 * Run this manually to check if your setup is correct
 */
function testConfiguration() {
  const properties = PropertiesService.getScriptProperties();
  
  Logger.log('Testing configuration...');
  Logger.log('GITHUB_OWNER: ' + (properties.getProperty('GITHUB_OWNER') ? 'Set ✓' : 'Missing ✗'));
  Logger.log('GITHUB_REPO: ' + (properties.getProperty('GITHUB_REPO') ? 'Set ✓' : 'Missing ✗'));
  Logger.log('GITHUB_BRANCH: ' + (properties.getProperty('GITHUB_BRANCH') || 'main (default)'));
  Logger.log('GITHUB_FILE_PATH: ' + (properties.getProperty('GITHUB_FILE_PATH') || 'IDEAS.md (default)'));
  Logger.log('GITHUB_TOKEN: ' + (properties.getProperty('GITHUB_TOKEN') ? 'Set ✓' : 'Missing ✗'));
  
  // Test GitHub API access
  const token = properties.getProperty('GITHUB_TOKEN');
  const owner = properties.getProperty('GITHUB_OWNER');
  const repo = properties.getProperty('GITHUB_REPO');
  const filePath = properties.getProperty('GITHUB_FILE_PATH') || 'IDEAS.md';
  
  if (token && owner && repo) {
    Logger.log('\nTesting GitHub API access...');
    const fileContent = getFileContent(owner, repo, filePath, properties.getProperty('GITHUB_BRANCH') || 'main', token);
    if (fileContent) {
      Logger.log('Successfully connected to GitHub! ✓');
      Logger.log('Current ' + filePath + ' length: ' + fileContent.content.length + ' characters');
    } else {
      Logger.log('Failed to connect to GitHub ✗');
    }
  } else {
    Logger.log('\nSkipping API test - missing configuration');
  }
}

/**
 * Test function to simulate a form submission
 * Run this manually to test the automation without submitting the actual form
 */
function testFormSubmission() {
  Logger.log('Testing form submission automation...');
  
  // Create test data
  const testData = {
    name: 'Test User',
    title: 'TEST IDEA - Please Delete',
    concept: 'This is a test submission to verify the automation is working correctly.',
    category: 'Technical Idea',
    details: 'This idea was created by the test function and should be deleted after verification.',
    genre: 'Test',
    inspiration: 'Testing the automation system',
    excitement: '5',
    comments: 'This is a test. Please delete this entry after confirming the automation works.',
    timestamp: new Date()
  };
  
  // Format and commit
  const markdown = formatAsMarkdown(testData);
  Logger.log('Generated markdown:');
  Logger.log(markdown);
  
  const success = commitToGitHub(markdown, testData.title);
  
  if (success) {
    Logger.log('\n✓ Test successful! Check your repository for the test idea.');
    Logger.log('Remember to delete the test entry from IDEAS.md');
  } else {
    Logger.log('\n✗ Test failed. Check the logs above for errors.');
  }
}
