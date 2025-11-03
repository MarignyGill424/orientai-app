import { execSync } from 'child_process'

console.log('🛠️ Compilation du client...')
execSync('tsc -p src/client', { stdio: 'inherit' })

console.log('🛠️ Compilation du serveur...')
execSync('tsc -p src/server', { stdio: 'inherit' })

console.log('✅ Build terminé.')
