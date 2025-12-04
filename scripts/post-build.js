import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';

// Function to copy directory recursively
function copyDir(src, dest) {
  // Create destination directory
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Check for both possible output directories
  const sourceDir = existsSync('.output/public') ? '.output/public' : null;
  const targetDir = 'dist';

  console.log('📦 Checking build output...');

  // If dist already exists (from Nuxt production build), no need to copy
  if (existsSync(targetDir) && !sourceDir) {
    console.log('✅ Build output already in dist folder (production build)!');
    process.exit(0);
  }

  // If .output/public exists, copy it to dist (development build)
  if (sourceDir) {
    console.log('📦 Copying build output to dist folder...');
    
    // Remove existing dist folder if it exists
    if (existsSync(targetDir)) {
      console.log('🗑️  Removing old dist folder...');
      rmSync(targetDir, { recursive: true, force: true });
    }

    copyDir(sourceDir, targetDir);
    console.log('✅ Successfully copied build to dist folder!');
  } else if (!existsSync(targetDir)) {
    console.error('❌ No build output found in .output/public or dist');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error processing files:', error);
  process.exit(1);
}
