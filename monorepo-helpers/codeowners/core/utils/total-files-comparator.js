function totalFilesComparator({ totalFiles: files1 }, { totalFiles: files2 }) {
  return files2 - files1;
}

module.exports = totalFilesComparator;
