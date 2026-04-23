class OwnerToPackages {
  constructor(ownerName) {
    this.owner = ownerName;
    this.packages = new Set();
  }

  addPackage(packageName) {
    this.packages.add(packageName);
  }
}

module.exports = OwnerToPackages;
