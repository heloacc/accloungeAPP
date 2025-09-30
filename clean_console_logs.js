const fs = require('fs');
const path = require('path');

// Function to remove console statements
function removeConsoleStatements(content) {
  return content
    .replace(/^\s*console\.(log|error|warn|info|debug)\([^)]*\);\s*$/gm, '')
    .replace(/\s*console\.(log|error|warn|info|debug)\([^)]*\);\s*/g, ' ')
    .replace(/console\.(log|error|warn|info|debug)\([^)]*\),?\s*/g, '')
    .replace(/^\s*console\.(log|error|warn|info|debug)\([^)]*\)\s*$/gm, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n'); // Remove excessive blank lines
}

// Files to clean
const filesToClean = [
  'src/components/AccountabilityGroups.tsx',
  'src/components/ActiveCircle.tsx',
  'src/components/FastAuth.tsx'
];

filesToClean.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = removeConsoleStatements(content);
    fs.writeFileSync(filePath, cleaned);
    console.log(`Cleaned: ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('Console statement cleanup complete!');