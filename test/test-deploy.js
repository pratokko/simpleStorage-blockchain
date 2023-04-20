const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), "0")
    })
    it("should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(expectedValue, currentValue.toString())
    })
    it("should add a person with the given name and favorite number", async function() {
        // Call the addPerson function with sample inputs
        await simpleStorage.addPerson("Alice", 42);
    
        // Get the stored favorite number for Alice
        const aliceFavoriteNumber = await simpleStorage.NameToFavoriteNumber("Alice");
    
        // Assert that the favorite number was stored correctly
        expect(aliceFavoriteNumber).to.equal(42);
        
      });
})
