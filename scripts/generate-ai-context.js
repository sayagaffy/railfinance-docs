const fs = require('fs');
const path = require('path');

/**
 * AI Context Generator
 * 
 * This script aggregates all Markdown documentation files (.md and .mdx)
 * from the docs/ directory into a single ai-context.txt file for external LLMs.
 */

// Configuration
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUTPUT_FILE = path.join(__dirname, '..', 'static', 'ai-context.txt');
const FILE_EXTENSIONS = ['.md', '.mdx'];

/**
 * Recursively find all files with specified extensions in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} extensions - File extensions to include
 * @returns {string[]} Array of absolute file paths
 */
function findFiles(dir, extensions) {
  let results = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively search subdirectories
        results = results.concat(findFiles(fullPath, extensions));
      } else if (entry.isFile()) {
        // Check if file has one of the target extensions
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
    throw error;
  }
  
  return results;
}

/**
 * Generate the aggregated AI context file
 */
function generateAIContext() {
  console.log('🚀 Starting AI Context Generator...\n');
  
  try {
    // Find all documentation files
    console.log(`📁 Scanning directory: ${DOCS_DIR}`);
    const files = findFiles(DOCS_DIR, FILE_EXTENSIONS);
    
    if (files.length === 0) {
      console.warn('⚠️  No documentation files found!');
      return;
    }
    
    console.log(`✅ Found ${files.length} documentation files\n`);
    
    // Aggregate file contents
    let aggregatedContent = '';
    let processedCount = 0;
    
    for (const filePath of files) {
      try {
        // Get relative path from docs directory for cleaner output
        const relativePath = path.relative(DOCS_DIR, filePath);
        
        // Read file content
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Add separator and content
        aggregatedContent += `\n\n${'='.repeat(80)}\n`;
        aggregatedContent += `FILE: ${relativePath}\n`;
        aggregatedContent += `${'='.repeat(80)}\n\n`;
        aggregatedContent += content;
        
        processedCount++;
        
        // Log progress every 10 files
        if (processedCount % 10 === 0) {
          console.log(`📄 Processed ${processedCount}/${files.length} files...`);
        }
      } catch (error) {
        console.error(`❌ Error processing file ${filePath}:`, error.message);
        // Continue processing other files
      }
    }
    
    // Write aggregated content to output file
    console.log(`\n💾 Writing aggregated content to: ${OUTPUT_FILE}`);
    fs.writeFileSync(OUTPUT_FILE, aggregatedContent.trim(), 'utf-8');
    
    // Calculate file size
    const stats = fs.statSync(OUTPUT_FILE);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    
    console.log('\n✨ AI Context generation completed successfully!');
    console.log(`📊 Statistics:`);
    console.log(`   - Files processed: ${processedCount}`);
    console.log(`   - Output file: ${OUTPUT_FILE}`);
    console.log(`   - File size: ${fileSizeKB} KB`);
    console.log('\n🌐 The ai-context.txt file will be publicly accessible at:');
    console.log('   [your-domain]/ai-context.txt\n');
    
  } catch (error) {
    console.error('\n❌ Fatal error during AI context generation:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the generator
generateAIContext();
