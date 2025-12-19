// Final deployment verification script
const fs = require('fs');
const path = require('path');

console.log('🔍 Final deployment verification...\n');

// Check 1: vercel.json configuration
console.log('1. Checking vercel.json...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('./vercel.json', 'utf8'));
  console.log('✅ vercel.json exists and is valid');
  
  // Check builds
  const backendBuild = vercelConfig.builds.find(b => b.src === 'backend/server.js');
  const frontendBuild = vercelConfig.builds.find(b => b.src === 'frontend/package.json');
  
  console.log(`   - Backend build: ${!!backendBuild}`);
  console.log(`   - Frontend build: ${!!frontendBuild}`);
  
  if (backendBuild) {
    console.log(`   - Backend uses: ${backendBuild.use}`);
  }
  
  if (frontendBuild) {
    console.log(`   - Frontend distDir: ${frontendBuild.config?.distDir}`);
  }
  
  // Check routes
  const apiRoute = vercelConfig.routes.find(r => r.src === '/api/(.*)');
  const assetRoute = vercelConfig.routes.find(r => r.src.includes('\\.(js|css|png|jpg'));
  const fallbackRoute = vercelConfig.routes.find(r => r.dest?.includes('index.html') && !r.src.includes('\\.'));
  
  console.log(`   - API route configured: ${!!apiRoute}`);
  console.log(`   - Asset route configured: ${!!assetRoute}`);
  console.log(`   - Fallback route configured: ${!!fallbackRoute}`);
  
} catch (err) {
  console.log('❌ vercel.json error:', err.message);
  process.exit(1);
}

// Check 2: Dist folder exists and has content
console.log('\n2. Checking deployment folders...');
const backendDistPath = path.join(__dirname, 'backend', 'dist');
const frontendDistPath = path.join(__dirname, 'frontend', 'dist');

if (fs.existsSync(backendDistPath)) {
  const files = fs.readdirSync(backendDistPath);
  console.log(`✅ Backend dist folder exists with ${files.length} items`);
  
  const hasIndexHtml = files.includes('index.html');
  const hasAssets = fs.existsSync(path.join(backendDistPath, 'assets'));
  
  console.log(`   - Has index.html: ${hasIndexHtml}`);
  console.log(`   - Has assets folder: ${hasAssets}`);
  
  if (!hasIndexHtml) {
    console.log('❌ Missing index.html in backend dist folder');
  }
} else {
  console.log('❌ Backend dist folder not found');
}

if (fs.existsSync(frontendDistPath)) {
  const files = fs.readdirSync(frontendDistPath);
  console.log(`✅ Frontend dist folder exists with ${files.length} items`);
} else {
  console.log('❌ Frontend dist folder not found');
}

// Check 3: Backend server configuration
console.log('\n3. Checking backend server configuration...');
const serverPath = path.join(__dirname, 'backend', 'server.js');
if (fs.existsSync(serverPath)) {
  const serverContent = fs.readFileSync(serverPath, 'utf8');
  const hasStaticServe = serverContent.includes('express.static');
  const hasProductionCheck = serverContent.includes("process.env.NODE_ENV === 'production'");
  const hasCatchAll = serverContent.includes("app.get('*'");
  
  console.log('✅ server.js exists');
  console.log(`   - Serves static files in production: ${hasStaticServe}`);
  console.log(`   - Has production environment check: ${hasProductionCheck}`);
  console.log(`   - Has catch-all route: ${hasCatchAll}`);
  
  if (!hasStaticServe || !hasProductionCheck || !hasCatchAll) {
    console.log('⚠️  Some configurations may need attention');
  }
} else {
  console.log('❌ server.js not found');
}

// Check 4: API service configuration
console.log('\n4. Checking API service configuration...');
const apiServicePath = path.join(__dirname, 'frontend', 'src', 'services', 'apiService.jsx');
if (fs.existsSync(apiServicePath)) {
  const apiContent = fs.readFileSync(apiServicePath, 'utf8');
  const usesRelativePaths = apiContent.includes('const API_BASE = "/api"');
  
  console.log('✅ apiService.jsx exists');
  console.log(`   - Uses relative API paths: ${usesRelativePaths}`);
  
  if (!usesRelativePaths) {
    console.log('❌ API service should use "/api" paths');
  }
} else {
  console.log('❌ apiService.jsx not found');
}

console.log('\n🎉 Verification complete!');
console.log('\n📝 To deploy to Vercel:');
console.log('   1. Commit all changes: git add . && git commit -m "Fix deployment structure"');
console.log('   2. Push to repository: git push origin main');
console.log('   3. Redeploy on Vercel');
console.log('   4. Set environment variables in Vercel dashboard');