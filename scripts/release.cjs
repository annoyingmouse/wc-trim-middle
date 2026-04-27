const { execSync } = require('child_process');

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

run('npm run build');
run('git add -A');

const dirty = execSync('git status --porcelain').toString().trim();
if (dirty) {
  run('git commit -m "chore: release artifacts"');
}
