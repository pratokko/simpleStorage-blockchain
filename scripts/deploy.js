const { ethers } = require("hardhat")

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying contract please wait...")

    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`deployed contract to ${simpleStorage.address}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
