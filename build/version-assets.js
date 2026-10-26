#!/usr/bin/env node
/**
 * build/version-assets.js
 *
 * Repodaki tüm HTML dosyalarındaki yerel CSS ve JS adreslerine
 * dosya içeriğinin SHA-1 özetinin ilk 8 karakterini sürüm parametresi (?v=<hash>) olarak ekler / günceller.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const IGNORE_DIRS = new Set(['node_modules', '.git', 'qa', 'scratch_audit', '__pycache__', 'build']);

function getFileHash8(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Referenced asset not found: ${filePath}`);
  }
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 8);
}

function findHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry) || entry.startsWith('.')) continue;
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (entry.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

export function updateAssetVersions() {
  const htmlFiles = findHtmlFiles(ROOT_DIR);
  const assetHashMap = new Map(); // physicalPath -> 8-char SHA1

  let totalUpdatedFiles = 0;
  let totalReplacedLinks = 0;

  for (const htmlPath of htmlFiles) {
    const originalContent = fs.readFileSync(htmlPath, 'utf8');
    const htmlDir = path.dirname(htmlPath);

    let fileChanged = false;

    // Replace in <link ... href="..." ...>
    let updatedContent = originalContent.replace(
      /(<link\b[^>]*?\bhref=)(["'])([^"']+)\2([^>]*>)/gi,
      (fullMatch, prefix, quote, rawUrl, suffix) => {
        const cleanUrl = rawUrl.split('?')[0].split('#')[0];
        if (!cleanUrl.endsWith('.css') && !cleanUrl.endsWith('.js')) {
          return fullMatch;
        }
        if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('//')) {
          return fullMatch;
        }

        const physicalPath = cleanUrl.startsWith('/')
          ? path.join(ROOT_DIR, cleanUrl)
          : path.resolve(htmlDir, cleanUrl);

        if (!assetHashMap.has(physicalPath)) {
          assetHashMap.set(physicalPath, getFileHash8(physicalPath));
        }

        const hash = assetHashMap.get(physicalPath);
        const newUrl = `${cleanUrl}?v=${hash}`;
        if (newUrl !== rawUrl) {
          totalReplacedLinks++;
          fileChanged = true;
        }
        return `${prefix}${quote}${newUrl}${quote}${suffix}`;
      }
    );

    // Replace in <script ... src="..." ...>
    updatedContent = updatedContent.replace(
      /(<script\b[^>]*?\bsrc=)(["'])([^"']+)\2([^>]*>)/gi,
      (fullMatch, prefix, quote, rawUrl, suffix) => {
        const cleanUrl = rawUrl.split('?')[0].split('#')[0];
        if (!cleanUrl.endsWith('.css') && !cleanUrl.endsWith('.js')) {
          return fullMatch;
        }
        if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('//')) {
          return fullMatch;
        }

        const physicalPath = cleanUrl.startsWith('/')
          ? path.join(ROOT_DIR, cleanUrl)
          : path.resolve(htmlDir, cleanUrl);

        if (!assetHashMap.has(physicalPath)) {
          assetHashMap.set(physicalPath, getFileHash8(physicalPath));
        }

        const hash = assetHashMap.get(physicalPath);
        const newUrl = `${cleanUrl}?v=${hash}`;
        if (newUrl !== rawUrl) {
          totalReplacedLinks++;
          fileChanged = true;
        }
        return `${prefix}${quote}${newUrl}${quote}${suffix}`;
      }
    );

    if (fileChanged && updatedContent !== originalContent) {
      fs.writeFileSync(htmlPath, updatedContent, 'utf8');
      totalUpdatedFiles++;
    }
  }

  console.log(`[version-assets] Scanned ${htmlFiles.length} HTML files.`);
  console.log(`[version-assets] Resolved ${assetHashMap.size} unique local CSS/JS assets:`);
  for (const [p, h] of assetHashMap.entries()) {
    console.log(`  ${path.relative(ROOT_DIR, p).replace(/\\/g, '/')}: ${h}`);
  }
  console.log(`[version-assets] Updated ${totalUpdatedFiles} files with ${totalReplacedLinks} asset version tags.`);
  return { htmlFilesCount: htmlFiles.length, assetCount: assetHashMap.size, updatedFilesCount: totalUpdatedFiles, replacedLinksCount: totalReplacedLinks };
}

// Run if called directly
const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectRun) {
  try {
    updateAssetVersions();
  } catch (err) {
    console.error('[version-assets] Error:', err.message);
    process.exit(1);
  }
}
