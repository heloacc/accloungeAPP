// Script to remove console.log statements
// This is a utility to help clean up console.log statements from the codebase

const filesToClean = [
  'src/App.tsx',
  'src/components/AccountabilityGroups.tsx',
  'src/components/ActiveCircle.tsx',
  'src/components/FastAuth.tsx'
];

// Function to remove console.log statements from file content
function removeConsoleLogs(content) {
  return content
    .replace(/\s*console\.log\([^)]*\);\s*/g, '')
    .replace(/\s*console\.log\([^)]*\)\s*/g, '')
    .replace(/^\s*console\.log\([^)]*\);\s*$/gm, '')
    .replace(/^\s*console\.log\([^)]*\)\s*$/gm, '');
}

console.log('Console log removal utility ready');