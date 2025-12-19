// Test script to verify frontend build
const { exec } = require('child_process');
const path = require('path');

console.log('Testing frontend build...');

// Change to frontend directory and run build
const frontendDir = path.join(__dirname, 'frontend');

exec('npm run build', { cwd: frontendDir }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Build failed: ${error.message}`);
    console.error(`stderr: ${stderr}`);
    return;
  }
  
  console.log('Frontend build completed successfully!');
  console.log(stdout);
  
  // Check if dist folder exists
  const fs = require('fs');
  const distPath = path.join(__dirname, 'backend', 'dist');
  
  if (fs.existsSync(distPath)) {
    console.log('✅ Dist folder created successfully');
    
    // Count files in dist folder
    const files = fs.readdirSync(distPath);
    console.log(`📁 Found ${files.length} files in dist folder`);
    
    // Show some key files
    const keyFiles = files.filter(file => 
      file === 'index.html' || 
      file.endsWith('.js') || 
      file.endsWith('.css')
    );
    console.log('🔑 Key files:', keyFiles);
  } else {
    console.log('❌ Dist folder not found');
  }
});