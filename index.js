const path = require('path');

const mirrorFolder = require('mirror-folder');

const src = path.resolve(__dirname, 'src');
const dst = path.resolve(__dirname, 'dst');

/*
{
  watch: false, // keep watching the src and mirror new entries, can also be a custom watch function
  dereference: false, // dereference any symlinks
  equals: fun, // optional function to determine if two entries are the same, see below
  ignore: null, // optional async function to ignore file paths on src or dest
  dryRun: false, // emit all events but don't write/del files,
  keepExisting: false, // whether to delete extra files in the destination that are not present in the source
  skipSpecial: true // skip any files that are not regular files,
  ensureParents: false // ensure that all parent directories exist before creating children.
}
*/

const options = {
  watch: true,
};

const progress = mirrorFolder(src, dst, options, function(err) {
  if (err) {
    throw err;
  }

  console.log('Folder was mirrored');
});

progress.on('put', function(src, dest) {
  console.log('put', src.name, '=>', dest.name);
});

progress.on('end', function() {
  console.log('end');
});

process.on('SIGINT', function() {
  console.log('SIGINT');
  progress.destroy();
});

process.on('exit', function() {
  console.log('exit');
  progress.destroy();
});
