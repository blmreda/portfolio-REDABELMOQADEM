// Simple script to test the build process
const { exec } = require('child_process');
const path = require('path');

console.log('Testing build process...');

// Change to frontend directory and run build
const frontendDir = path.join(__dirname, 'frontend');
console.log(`Building frontend in ${frontendDir}...`);

exec('npm run build', { cwd: frontendDir }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Build failed: ${error}`);
    console.error(stderr);
    return;
  }
  
  console.log('Frontend build successful!');
  console.log(stdout);
  
  // Check if dist folder exists
  const fs = require('fs');
  const distPath = path.join(__dirname, 'backend', 'dist');
  
  if (fs.existsSync(distPath)) {
    console.log('✅ Dist folder created successfully');
    
    // List files in dist folder
    const files = fs.readdirSync(distPath);
    console.log('Files in dist folder:', files);
  } else {
    console.log('❌ Dist folder not found');
  }
});