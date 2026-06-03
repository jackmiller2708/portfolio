import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const astroAssetDir = path.join(distDir, "_astro");
const ogDir = path.join(root, "public", "og");
const maxClientBytesPerRoute = 45 * 1024;
const maxSignatureMapBytes = 800 * 1024;
const maxOgBytesTotal = 150 * 1024;
const maxSingleAssetBytes = 100 * 1024;

const listFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
};

const fileSize = async (filePath) => (await fs.stat(filePath)).size;

const exists = async (dir) =>
  fs
    .access(dir)
    .then(() => true)
    .catch(() => false);

const issues = [];

if (!(await exists(distDir))) {
  throw new Error("Missing dist directory. Run npm run build before npm run verify:budget.");
}

const clientFiles = ((await exists(astroAssetDir)) ? await listFiles(astroAssetDir) : []).filter(
  (file) => file.endsWith(".js")
);
const signatureMapFiles = clientFiles.filter((file) => path.basename(file).startsWith("three."));
const baseClientFiles = clientFiles.filter((file) => !signatureMapFiles.includes(file));
const clientSizes = await Promise.all(baseClientFiles.map(fileSize));
const clientTotal = clientSizes.reduce((total, size) => total + size, 0);
const signatureMapSizes = await Promise.all(signatureMapFiles.map(fileSize));
const signatureMapTotal = signatureMapSizes.reduce((total, size) => total + size, 0);

if (clientTotal > maxClientBytesPerRoute) {
  issues.push(`all routes: client JS ${clientTotal} > ${maxClientBytesPerRoute}`);
}

if (signatureMapTotal > maxSignatureMapBytes) {
  issues.push(`signature map JS ${signatureMapTotal} > ${maxSignatureMapBytes}`);
}

for (const [index, size] of clientSizes.entries()) {
  if (size > maxSingleAssetBytes) {
    issues.push(`${baseClientFiles[index]}: asset ${size} > ${maxSingleAssetBytes}`);
  }
}

const ogFiles = ((await exists(ogDir)) ? await listFiles(ogDir) : []).filter((file) =>
  file.endsWith(".svg")
);
const ogSizes = await Promise.all(ogFiles.map(fileSize));
const ogTotal = ogSizes.reduce((total, size) => total + size, 0);

if (ogTotal > maxOgBytesTotal) {
  issues.push(`OG assets ${ogTotal} > ${maxOgBytesTotal}`);
}

for (const [index, size] of ogSizes.entries()) {
  if (size > maxSingleAssetBytes) {
    issues.push(`${ogFiles[index]}: asset ${size} > ${maxSingleAssetBytes}`);
  }
}

if (issues.length > 0) {
  console.error(`Asset budget verification found ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Asset budget passed.`);
  console.log(`Base client JS: ${clientTotal} bytes across ${baseClientFiles.length} file(s).`);
  console.log(
    `Signature map JS: ${signatureMapTotal} bytes across ${signatureMapFiles.length} lazy file(s).`
  );
  console.log(`OG assets: ${ogTotal} bytes across ${ogFiles.length} file(s).`);
}
