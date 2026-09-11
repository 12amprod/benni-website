#!/bin/bash
# PostToolUse: auto-fix formatting/lint/import-order on the file Claude just edited,
# so no turn is ever spent on pure formatting.
file=$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{process.stdout.write(JSON.parse(d).tool_input?.file_path??"")}catch{}})')
case "$file" in
	*routeTree.gen.ts)
		exit 0 ;;
	*.ts | *.tsx | *.js | *.jsx | *.json | *.jsonc | *.css)
		cd "$CLAUDE_PROJECT_DIR" && pnpm exec biome check --write "$file" >/dev/null 2>&1 || true ;;
esac
exit 0
