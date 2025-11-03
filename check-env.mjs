import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Pour obtenir __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '.env');

// Lire le fichier brut
try {
  const raw = fs.readFileSync(envPath, 'utf8');
  console.log('📄 Contenu brut du .env :');
  console.log('--------------------------');
  console.log(raw);
  console.log('--------------------------');
} catch (err) {
  console.error('❌ Impossible de lire le fichier .env :', err.message);
}

// Charger avec dotenv
dotenv.config();

console.log('🔑 Variable GEMINI_API_KEY :', process.env.GEMINI_API_KEY || '❌ Non trouvée');
