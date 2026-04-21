import { testConnection } from './database/db';

async function main() {
    await testConnection();
}

main();