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
  const sourceDir = '.output/public';
  const targetDir = 'dist';

  console.log('📦 Copying build output to dist folder...');

  // Remove existing dist folder if it exists
  if (existsSync(targetDir)) {
    console.log('🗑️  Removing old dist folder...');
    rmSync(targetDir, { recursive: true, force: true });
  }

  // Copy .output/public to dist
  if (existsSync(sourceDir)) {
    copyDir(sourceDir, targetDir);
    console.log('✅ Successfully copied build to dist folder!');
  } else {
    console.error('❌ Source directory not found:', sourceDir);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error copying files:', error);
  process.exit(1);
}
