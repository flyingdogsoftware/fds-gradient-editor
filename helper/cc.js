const { execSync } = require('child_process');

let name=process.argv[2]
console.log("Copy component "+name)
execSync('pushd ../'+name+'; npm run build; popd', {
    shell: "/bin/bash"
})
execSync('cp -r ../'+name+'/dist ./node_modules/@fds-components/'+name)
execSync('rm -r ./node_modules/@fds-components/'+name+'/dist/node_modules')
execSync('rm  ./node_modules/@fds-components/'+name+'/dist/index.html')
