import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

test('renders Atomic Focus in a separate side-project section', () => {
  const build = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(build.status, 0, build.stderr || build.stdout);
  assert.equal(existsSync('dist/index.html'), true);
  assert.equal(existsSync('dist/work/index.html'), true);

  for (const page of ['dist/index.html', 'dist/work/index.html']) {
    const html = readFileSync(page, 'utf8');
    assert.match(html, /Side projects/);
    assert.match(html, /Atomic Focus/);
    assert.match(html, /https:\/\/atomicfocus\.space/);
  }
});
