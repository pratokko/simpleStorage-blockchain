const { ethers, run, network } = require("hardhat")

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying contract please wait...")

    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`deployed contract to ${simpleStorage.address}`)

    if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block transactions...")
        await simpleStorage.deployTransaction.wait(6)

        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`current value is ${currentValue}`)

    // update the current value

    const txResponse = await simpleStorage.store(7)
    await txResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`updated Value is ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
