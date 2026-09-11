#!/bin/bash
# Stop hook: after Claude's turn, run the repo's typecheck + Biome check. Silent when clean.
# On failure it blocks the stop with the errors so Claude fixes them before handing over.
# Never fails the turn on its own problems: anything unexpected → exit 0.
set -o pipefail

input=$(cat)
# Already continuing because of this hook → don't loop.
active=$(printf '%s' "$input" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{console.log(JSON.parse(d).stop_hook_active?"true":"false")}catch{console.log("false")}})')
[ "$active" = "true" ] && exit 0

cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
[ -d node_modules ] || exit 0

# Only run when source files actually changed in this working tree.
changed=$( { git diff --name-only HEAD 2>/dev/null; git ls-files --others --exclude-standard 2>/dev/null; } \
	| grep -E '\.(ts|tsx|js|jsx|json|jsonc|css)$' | head -n 1)
[ -n "$changed" ] || exit 0

strip_ansi() { sed -E 's/\x1B\[[0-9;]*[A-Za-z]//g'; }
fail=0
report=""

# `set -o pipefail` makes the command substitution carry the exit code of the
# failing stage, not of `tail` — without it every check would look like it passed.
out=$(pnpm typecheck 2>&1 | strip_ansi | tail -n 60) || { fail=1; report+=$'\n## pnpm typecheck failed\n'"$out"$'\n'; }

out=$(pnpm exec biome check 2>&1 | strip_ansi | tail -n 60) || { fail=1; report+=$'\n## biome check failed (fix with: pnpm check:fix)\n'"$out"$'\n'; }

[ "$fail" -eq 0 ] && exit 0

node -e 'console.log(JSON.stringify({decision:"block",reason:"Verification ran typecheck + lint after your edits and it FAILED. Fix these before finishing — never disable, skip or bypass the checks:\n"+process.argv[1]}))' "$report"
exit 0
